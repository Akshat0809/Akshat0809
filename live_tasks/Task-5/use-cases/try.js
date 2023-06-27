const express = require('express');
const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

const storeHash = 's6gmg11nc3';
const accessToken = '157uq04wrdnzx92fvt0pyxwlokwc7mm';


app.get('/api/orders/:status_id', async (req, res) => {
  const statusId = req.params.status_id;

  try {
    const response = await axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v2/orders`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
      params: {
        status_id: statusId,
      },
    });

    const orders = response.data;
    res.json(orders);

    const csvWriter = createCsvWriter({
      path: 'orders.csv',
      header: [
        { id: 'orderId', title: 'orderId' },
        { id: 'orderCreatedTime', title: 'orderCreatedTime' },
        { id: 'trackingId', title: 'trackingId' },
        { id: 'productIds', title: 'productIds' },
      ],
    });

    const records = [];
    for (let i = 0; i < orders.length; i++) {
      const orderId = orders[i].id;
      const orderCreatedTime = orders[i].date_created;
      const trackingId = orders[i].consignments.resource.split('/').pop();
      const productIds = orders[i].products.resource.split('/').pop();

      console.log('Order ID:', orderId);
      console.log('Order Created Time:', orderCreatedTime);
      console.log('Tracking ID:', trackingId);
      console.log('Product ID(s):', productIds);

      records.push({
        orderId: orderId,
        orderCreatedTime: orderCreatedTime,
        trackingId: trackingId,
        productIds: productIds,
      });
    }

    // Write the orders to the CSV file
    csvWriter.writeRecords(records)
      .then(() => console.log('CSV file has been created successfully.'))
      .catch(err => console.error('Error creating CSV file:', err));

  } catch (error) {
    console.error('Error retrieving orders:', error.response.data);
    res.status(500).json({ error: 'Error retrieving orders' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
