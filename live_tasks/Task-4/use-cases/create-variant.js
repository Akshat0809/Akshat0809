module.exports = function makeCreateVariant({

}) {
    return async function createVariants(getoptionsdata, product_id, obj) {
        try{
            console.info("Inside create variant use case");
        let displayName;

        for(let i =0;i<obj.length; i++){
            const body = {
                sku : obj[i].SKU,
                product_id: product_id,
                option_values : []
                }
    
        for(let j = 0;j<getoptionsdata.length;j++){
            displayName = 'Attribute_'+getoptionsdata[j]['display_name'];
            
            for(let k = 0 ; k < getoptionsdata[j]['option_values'].length;k++){

                if(obj[i][displayName] == getoptionsdata[j]['option_values'][k]['label']){

                   let obj ={
                        id: getoptionsdata[j]['option_values'][k]['id'],
                        option_id: getoptionsdata[j]['id']
                    }
                    body.option_values.push(obj);

                }
            }
        }



        const fetch = require('node-fetch');

        let url = `https://api.bigcommerce.com/stores/fex8vaorav/v3/catalog/products/${product_id}/variants`;
        
        let options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': 'mtv0gmm8dgttwfac4sb9snps067aiea'
          },
          body: JSON.stringify(body)
        };
        
            const response = await fetch(url, options);
            const json = await response.json();
            console.info("Variant Created");
        }
        }
        catch(e){
            console.log("error"+e);
        }

    }
}
