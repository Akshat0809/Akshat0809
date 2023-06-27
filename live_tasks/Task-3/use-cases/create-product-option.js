module.exports = function makeCreateProductOption({
    getAllCategories
}) {
    return async function createProducts(obj, customField) {
        console.info(`Inside create product use case`);

        try {

            let id = [];
            let b;
            let ans = [];
            let c;
            let d;
            if (obj['Category']) {
                let array = obj["Category"].split(";");

                for (let i = 0; i < array.length; i++) {
                    let categoryArray = array[i].split("|");
                    for (let i = 0; i < categoryArray.length; i++) {

                        const categoryPathAndName = categoryArray[i].split(",");

                        let categoryPath;
                        c = '1-1/2in. Offset Pivot';
                        d = '3/4in. Offset Pivot';
                        if (categoryPathAndName[1].includes(c) || categoryPathAndName[1].includes(d)) {
                            categoryPath = [categoryPathAndName[1]];
                        }
                        else {
                            categoryPath = categoryPathAndName[1].split('/');
                        }

                        let onlyName = categoryPath[0].split(":");

                        let nameArrays;
                        if (onlyName[1].includes(c)) {

                            const filteredArray = onlyName[1].split('/').map((item) => item.trim());
                            filteredArray[1] = filteredArray[2].replace('', '1-1/');
                            nameArrays = filteredArray.filter((item, index) => index !== 2);
                        }
                        else if (onlyName[1].includes(d)) {

                            const filteredArray = onlyName[1].split('/').map((item) => item.trim());
                            filteredArray[1] = filteredArray[2].replace('', '3/');
                            nameArrays = filteredArray.filter((item, index) => index !== 2);
                        }
                        else {
                            nameArrays = onlyName[1].split("/");
                        }

                        // console.log("nameArrays", nameArrays);

                        let [, ...a] = categoryPath;
                        b = [...nameArrays, ...a];
                    }

                    for (let j = 0; j < b.length; j++) {
                        ans.push(b[j]);
                    }
                }
                const allCategoriesName = ans.map((str) => str.replace(/\s+/g, " ").trim());
                // console.log('allCategoriesName',allCategoriesName);

                let allCategories = await getAllCategories();
                let categoryidofbottom= [];
                let parentidofbottom= [];
                let categoryidofoffset1;
                let parentidofoffset1;
                let categoryidofoffset2;
                let parentidofoffset2;

                for(let i = 0;i < allCategoriesName.length ;i++){

                    for(data of allCategories.data){


                        if(data['name'] === 'Bottom'){
                            categoryidofbottom.push(data['category_id']);
                            parentidofbottom.push(data['parent_id']);
                            parentidofbottom = [...new Set(parentidofbottom)];
                            categoryidofbottom = [...new Set(categoryidofbottom)];
                            }


                        if(allCategoriesName[i] === data['name']){
                            if(allCategoriesName[i] !== 'Bottom'){
                            id.push(data.category_id);
                            }
                            if(allCategoriesName[2] === 'Bottom'){
                            for(let i = 0;i < parentidofbottom.length ; i++ ){
                                if(id[1] === parentidofbottom[i])
                                {
                                    id.push(categoryidofbottom[i]);
                                    break;
                                }
                                
                            }
                        }
                        }
                    }
                    
                }
                
                
                id = [...new Set(id)]
                console.log('id',id);
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
                categories: id,
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
            console.log("Error creating product",err);
            return err;
        }

    }
}