module.exports = function makeproductoption({
    createVariants,
    getoptions

}) {
    return async function addProductoption(product_id, obj) {
        var arr = [];
        for (let i of obj) {
            let total_variants = i.Variants;
            let Variants;
            Variants = (total_variants).split(';');
            for (let j of Variants) {
                arr.push(j);
            }
            arr = [...new Set(arr)];
        }

        const variableObj = {};
        arr.forEach(value => {
            variableObj[value] = [];

            obj.forEach(obj1 => {
                if (!variableObj[value].includes(obj1[value])) {
                    variableObj[value].push(obj1[value]);
                }
            });
        });

        let variantsOfArr = [];
        for (let i = 0; i < arr.length; i++) {
            arr.forEach(part => {
                const value = part.split('_')[1];
                if (!variantsOfArr.includes(value)) {
                    variantsOfArr.push(value);
                }
            });
        }

        const myarr = await createOption();

        async function createOption() {
            let option_id = [];

            const fetch = require('node-fetch');

            let url = `https://api.bigcommerce.com/stores/fex8vaorav/v3/catalog/products/${product_id}/options`;
          
            const option = [];
            for (const key in variableObj) {
                const values = variableObj[key];
                const obj = {
                    label:values
                };
                const newobj = obj.label.map(item => ({ label: item.replace(' lbs',' lbs') }));
                option.push(newobj);
            }

            for (i = 0; i < variantsOfArr.length; i++) {

                let body = {
                    product_id: product_id,
                    display_name: variantsOfArr[i],
                    type: "radio_buttons",
                    option_values: option[i]
                }
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
                const values = json['data']['id'];
                console.log('options created');
                option_id.push(values);
            }
            return option_id;
        }

        const getoptionsdata = await getoptions(product_id);
        await createVariants(getoptionsdata.data,product_id, obj);
    }
}



