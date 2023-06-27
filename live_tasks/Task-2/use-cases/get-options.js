module.exports = function makegetoptionsUseCase({

}){
    return async function getoptions(product_id) {
        console.info(`Inside get options data use case`,product_id);

        const fetch = require('node-fetch');

let url = `https://api.bigcommerce.com/stores/fex8vaorav/v3/catalog/products/${product_id}/options`;

let options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Auth-Token': 'mtv0gmm8dgttwfac4sb9snps067aiea'
  }
};

        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    }
}