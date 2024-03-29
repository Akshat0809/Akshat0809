module.exports = function makeCreateProduct({
    getAllCategories

}) {
    return async function createProduct(obj, custom_field) {
        console.info(`Inside create product use case`);

        try {

            let allCategoriesId = [];
            let b;
            let ans = [];

            if (obj['Category']) {
                let array = obj["Category"].split(";");

                for (let i = 0; i < array.length; i++) {
                    let categoryArray = array[i].split("|");
                    for (let i = 0; i < categoryArray.length; i++) {

                        let PathAndName = categoryArray[i].split(",");

                        if(PathAndName[1] === ' Fiber & Coaxial Extensions'){
                            console.log("inside");
                            PathAndName = [
                                PathAndName.slice(0, 2).join(','),
                                PathAndName.slice(2).join(',')
                              ];
                        }
                        
                        if(PathAndName[1] === ' Covers'){
                            console.log("inside");
                            PathAndName = [
                                PathAndName.slice(0, 3).join(','),
                                PathAndName.slice(3).join(',')
                              ];
                        }
        
                        if(PathAndName[1] === ' Encoders'){
                            console.log("inside");
                            PathAndName = [
                                PathAndName.slice(0, 2).join(','),
                                PathAndName.slice(2).join(',')
                              ];
                        }

                        

                        const categoryPath = PathAndName[1].split("/");
                        

                        let onlyName = categoryPath[0].split(":");
                        

                        let nameArray = onlyName[1].split("/");
                        

                        let [, ...a] = categoryPath;
                        b = [...nameArray, ...a];
                    }

                    for (let j = 0; j < b.length; j++) {
                        ans.push(b[j]);
                    }
                }
                const allCategoriesName = ans.map((str) => str.replace(/\s+/g, " ").trim());

                let allCategories = await getAllCategories();
                for (data of allCategories.data) {
                    if (allCategoriesName.includes(data.name)) {
                        allCategoriesId.push(data.category_id);
                    }
                }
                console.log('allCategoriesId',allCategoriesId);
            };


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
                categories: allCategoriesId,
                custom_fields: custom_field,
                // images: [{
                //     is_thumbnail: true,
                //     image_url: obj['Product Image']
                // }]
            }


            let url = 'https://api.bigcommerce.com/stores/fex8vaorav/v3/catalog/products';

            let options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': 'mtv0gmm8dgttwfac4sb9snps067aiea'
                },
                body: JSON.stringify(body)
            };
            // console.log("bodyyyyyyyyyyy",body);

            const response = await fetch(url, options);
            const json = await response.json();
            console.log("Product created");

            return (json['data']['id']);
        }

        catch (err) {
            console.log("Error creating product");
            return err;
        }

    }
}