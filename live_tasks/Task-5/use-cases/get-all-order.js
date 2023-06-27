// const axios = require('axios')
// const fetch = require('node-fetch');
// const status_id = '1';

// async function getOrder (){
//     const response = await 
// axios.get(`https://api.bigcommerce.com/stores/s6gmg11nc3/v2/orders`,{

//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     'X-Auth-Token': '157uq04wrdnzx92fvt0pyxwlokwc7mm'
//   },
//   params: {
//     status_id
//   }
// })
// console.log(response.data);
// return response;
// };

// getOrder();

/////////////////////////////////////////////////////

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

    const order = response.data;
    res.json(order);
    // console.log("orders",order[0]);
      for(let i = 0;i < order.length ; i++){
      const orderId = order[i].id;
      const orderCreatedTime = order[i].date_created;
      const trackingId = (order[i].consignments.resource).split('/');
      const productIds = (order[i].products.resource).split('/');
      
      console.log('Order ID :', orderId);
      console.log('Order Created Time:', orderCreatedTime);
      console.log('Tracking ID:', trackingId[2]);
      console.log('Product ID(s):', productIds[2]);

      const csvWriter = createCsvWriter({
        path: 'orders.csv',
        header: [
          { id: 'orderId', title: 'orderId' },
          { id: 'orderCreatedTime', title: 'orderCreatedTime' },
          { id: 'trackingId', title: 'trackingId' },
          { id: 'Product ID(s)', title: 'ProductId' },
        ]
      });
      
      // Write the orders to the CSV file
      csvWriter.writeRecords([{
        orderId: orderId,
        orderCreatedTime: orderCreatedTime,
        trackingId: trackingId[2],
        'Product ID(s)': productIds[2]
      }])
        .then(() => console.log('CSV file has been created successfully.'))
        .catch(err => console.error('Error creating CSV file:', err));
      }
    

      

  } catch (error) {
    console.error('Error retrieving orders:', error.response.data);
    res.status(500).json({ error: 'Error retrieving orders' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
