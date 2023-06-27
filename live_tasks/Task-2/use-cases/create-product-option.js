module.exports = function makeCreateProductOption({
    getAllCategories
}) {
    return async function createProducts({ obj }, customField) {
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
                        const categoryPathAndName = categoryArray[i].split(",");
                        const categoryPath = categoryPathAndName[1].split("/");
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
            };



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
                categories: allCategoriesId,
                inventory_level: obj.Inventory,
                custom_fields: customField,
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
            // console.log("bodyyyyyyy",body);
            const response = await fetch(url, options);
            const json = await response.json();
            console.log("Product Created");
            return (json['data']['id']);
        }

        catch (err) {
            console.log("Error creating product");
            return err;
        }

    }
}