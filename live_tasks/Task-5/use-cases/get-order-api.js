const axios = require('axios');

// Set up your BigCommerce API credentials
const storeHash = 's6gmg11nc3';
const accessToken = '157uq04wrdnzx92fvt0pyxwlokwc7mm';

// Set the order status for which you want to retrieve the products
const orderStatus = '1';

// Make the API request to retrieve orders with the specified status
axios.get(`https://api.bigcommerce.com/stores/${storeHash}/v3/orders`, {
  headers: {
    'X-Auth-Token': accessToken,
    'Content-Type': 'application/json',
  },
  params: {
    status_id: orderStatus,
  },
})
  .then(response => {
    // Retrieve the orders with the specified status
    const orders = response.data;

    // Process each order to retrieve the products
    orders.forEach(order => {
      const orderId = order.id;
      const products = order.line_items;

      // Process the product information as per your requirements
      console.log(`Products in order ${orderId}:`);
      products.forEach(product => {
        console.log(`- ${product.name} (ID: ${product.product_id}) - Quantity: ${product.quantity}`);
      });
    });
  })
  .catch(error => {
    console.error('Error retrieving orders:', error.response.data);
  });