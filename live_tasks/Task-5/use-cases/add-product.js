const { file } = require("googleapis/build/src/apis/file");

module.exports = function makeAddproductUseCase({
    addProductoption,
    createproducte,
    Createcustomfield,
    createcsv,
    createProduct,
    createProducts,
    addCategory
}) {
    return async function addproduct(res, file_id) {
        console.log("Inside use case of add product");
        const keys = Object.keys(res);
        console.log('keys',keys);
        for (let i = 0; i < keys.length; i++) {
            
            const productName = [];
            let productId;
            let created;
            let customField;

            if (keys[i] === 'ABH 0117.50B') {
                console.log("Key is ABH 0117.50B", res[keys[i]].length);
                console.log("inside if case",res[keys[0]]);
                for (let obj of res[keys[i]]) {

                    if (!productName.includes(obj["Product Name"])) {
                        productName.push(obj["Product Name"]);
                        console.log('obj product name', obj["Product Name"]);

                        if (obj["Category"]) {
                            const addCategoryResult = await addCategory(obj);

                        }
                        customField = await Createcustomfield(obj);
                        productId = await createProduct(obj, customField);
                        console.log("productId", productId);

                        if (productId > 0) {
                            created = 1;
                            let error = 'null'
                            await createproducte(productId, created, obj, error, file_id);
                        }
                        else {
                            created = 0;
                            let error = 'null';
                            await createproducte(productId, created, obj[0], error, file_id);
                        }
                    }
                }
            }

            else {
                // if(keys[i]  === 'VON 050014'){

                console.log("key is", keys[i]);
                const obj = res[keys[i]];
               

                if (obj["Category"]) {
                    const addCategoryResult = await addCategory(obj);

                }
                let customField = await Createcustomfield(obj[0])
                productId = await createProducts({ obj: obj[0] }, customField);
                let option_create = await addProductoption(productId, res[keys[i]]);
                if (option_create != 1) {
                    console.log("There is an error", option_create, typeof (option_create));
                }
                else {
                    console.log("There is no error", option_create, typeof (option_create));
                }

                if (productId > 0 && option_create == 1) {
                    created = 1;
                    let error = "NULL"
                    await createproducte(productId, created, obj[0], error, file_id)
                }

                else if (productId > 0 || option_create != 1) {
                    created = 0;
                    let productId = 0;
                    let error = "There is an error creating Options"
                    await createproducte(productId, created, obj[0], error, file_id);
                }

                else {
                    created = 0;
                    let productId = 0;
                    let error = "There is an error in creating product";
                    await createproducte(productId, created, obj[0], error, file_id);
                }
            }
        }

        await createcsv();
    }
}
