const express = require('express');
const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const moment = require('moment');

const app = express();
const port = 3000;

const storeHash = 's6gmg11nc3';
const accessToken = '157uq04wrdnzx92fvt0pyxwlokwc7mm';

app.get('/api/orders', async (req, res) => {
  const statusId = req.query.status_id;
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  try {
    const formattedStartDate = moment(startDate, 'YYYYMMDD').format('YYYY-MM-DD');
    const formattedEndDate = moment(endDate, 'YYYYMMDD').format('YYYY-MM-DD');
    console.log('formattedStartDate', typeof formattedStartDate);

    const response = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v2/orders`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
      params: {
        status_id: statusId,
        min_date_created: formattedStartDate + 'T00:00:00Z',
        max_date_created: formattedEndDate + 'T23:59:59Z',
      },
    });

    const orders = response.data;
    res.json(orders);
    // console.log('orders', orders[0]);

    const records = [];

    for (const order of orders) {
      const productsUrl = order.products.url;

      try {
        const productsResponse = await axios.get(productsUrl, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': accessToken,
          },
          params: {
            include: 'custom_fields',
          },
        });

        const products = productsResponse.data;
        console.log('products', products, products.length);

        let trackingId = '';
        let shipmentId = '';
        let CarrierName = '';

        if (statusId === '2' || statusId === '3' || statusId === '10') {
          const shipmentsResponse = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v2/orders/${order.id}/shipments`, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Auth-Token': accessToken,
            },
          });

          const shipments = shipmentsResponse.data;
          if (shipments.length > 0) {
            trackingId = shipments[0].tracking_number;
            shipmentId = shipments[0].id;
            CarrierName = shipments[0].CarrierName;
          } else {
            console.log('No tracking information available for order ID:', order.id);
          }
        }

        for (const product of products) {
          const merchantId = product.sku;
          const title = product.name;
          const brand = product.brand;

          records.push({
            orderId: order.id,
            orderCreatedTime: moment(order.date_created).format('ddd, DD MMM YYYY HH:mm:ss Z'),
            productIds: product.id,
            CarrierName: CarrierName,
            productCountry: 'US',
            productLanguage: 'en',
            merchantId: merchantId,
            Title: title,
            trackingId: trackingId,
            shipmentId: shipmentId,
            Brand: brand,

          });
        }
      } catch (error) {
        console.error('Error retrieving products:', error.response.data);
      }
    }

    const csvWriter = createCsvWriter({
      path: 'orders.csv',
      header: [
        { id: 'orderId', title: 'orderId' },
        { id: 'orderCreatedTime', title: 'orderCreatedTime' },
        { id: 'productIds', title: 'productIds' },
        { id: 'CarrierName', title: 'CarrierName' },
        { id: 'productCountry', title: 'productCountry' },
        { id: 'productLanguage', title: 'product Language' },
        { id: 'merchantId', title: 'Merchant Id' },
        { id: 'Title', title: 'Title' },
        { id: 'Brand', title: 'Brand' },
        { id: 'trackingId', title: 'trackingId' },
        { id: 'shipmentId', title: 'shipmentId' },
      ],
    });

    await csvWriter.writeRecords(records);
    console.log('CSV file has been created successfully.');
  } catch (error) {
    console.error('Error retrieving orders:', error.response.data);
    res.status(500).json({ error: 'Error retrieving orders' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
