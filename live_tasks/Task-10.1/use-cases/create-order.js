const fetch = require('node-fetch');

let url = 'https://api.bigcommerce.com/stores/9mj5518wiz/v2/orders';

let options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Auth-Token': ' '
  },
  body: '{"status_id":0,"customer_id":1,"billing_address":{"first_name":"Jane","last_name":"Doe","street_1":"123 Main Street","city":"Austin","state":"Texas","zip":78751,"country":"United States","country_iso2":"US","email":"janedoe@example.com"},"products":[{"product_id":"118,","quantity":"1,","variant_id":93}]}'
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));