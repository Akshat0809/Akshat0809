module.exports = function makeAddproductUseCase({
    addProductoption,
    createproducte,
    Createcustomfield
}) {
    return async function addproduct(res) {
        console.log("Inside use case of add product");
        const keys = Object.keys(res);
        
        for (let i = 0; i < keys.length; i++) {

            const productName = [];
            let product_id;
            let created;
            let custom_field;

            if(keys[i] === 'x'){
                console.log("Key is x",res[keys[i]].length);
                for(let obj of res[keys[i]]){
                 
                    if(!productName.includes(obj["Product Name"])) {
                    productName.push(obj["Product Name"]);
                    // custom_field =  await Createcustomfield(obj);
                    product_id = await createProduct(obj,custom_field);

                   
                    // if(product_id > 0){
                    // created = 1;
                    // await createproducte(product_id,created,obj)
                    // }
                    // else{
                    // created = 0;
                    // await createproducte(product_id.error,created,obj)
                    // }
                }
                }
            }
            else {

                console.log("key is", keys[i]);
                const obj = res[keys[i]];
                // let custom_field = await Createcustomfield(obj[0])
                // console.log('in add product use case',custom_field);
                product_id = await createProducts({ obj: obj[0] },custom_field);
                console.log("product id in",keys[i],product_id);
                // await addProductoption(product_id, res[keys[i]]);

                // if(product_id > 0){
                //     created = 1;
                //     await createproducte(product_id,created,obj[0])
                //     }
                //     else{
                //     created = 0;
                //     await createproducte(product_id.error,created,obj[0])
                //     }
            }
        }

        async function createProduct(obj,custom_field) {
            // console.log("-----", obj['Product Name'])

            let body = {
                brand_name: obj.Manufacturer,
                name: obj['Product Name'],
                type: "physical",
                sku: obj.SKU,
                description: obj.Description,
                weight: obj.Weight,
                price: obj.SellingPriceAnonymous,
                cost_price: obj.Cost,
                is_visible: true,
                inventory_level: obj.Inventory,
                custom_fields: custom_field,
                images: [{
                    is_thumbnail: true,
                    image_url: obj['Product Image']
                }]
            }


            let url = 'https://api.bigcommerce.com/stores/shqw2cf6oi/v3/catalog/products';

            let options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'k6c5erk1ocrglsg3bsxpa30xuki91lx'
                },
                body: JSON.stringify(body)
            };
            console.log("__",body);
            const response = await fetch(url, options);
            const json = await response.json();
            console.log('-0-0-0',json);
            return (json['data']['id']);
        }

        async function createProducts({ obj },custom_field) {
            let body = {
                brand_name: obj.Manufacturer,
                name: obj['Product Name'],
                type: "physical",
                sku: obj['Primary SKU'],
                description: obj.Description,
                weight: obj.Weight,
                price: obj.SellingPriceAnonymous,
                cost_price: obj.Cost,
                is_visible: true,
                inventory_level: obj.Inventory,
                custom_fields: custom_field,
                images: [{
                    is_thumbnail: true,
                    image_url: obj['Product Image']
                }]
            }

            let url = 'https://api.bigcommerce.com/stores/shqw2cf6oi/v3/catalog/products';

            let options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'k6c5erk1ocrglsg3bsxpa30xuki91lx'
                },
                body: JSON.stringify(body)
            };

            const response = await fetch(url, options);
            const json = await response.json();
            // console.log("data of product",json);
            console.log("Prodcut id", json['data']['id']);
            return (json['data']['id']);
        }
    }
}
