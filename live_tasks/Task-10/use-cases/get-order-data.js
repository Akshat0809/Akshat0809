module.exports = function makeGetDataFromTemplateUseCase({
    createCsvFile
}) {
    return async function getTemplateData() {
        try {

            const apiUrl = "https://api.bigcommerce.com/stores/9mj5518wiz/v2/orders";

            let options = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': '16t1jgx6gyllvyiy9sb0xd5ma19fddb'
                }
            };
            
            const response = await fetch(apiUrl, options);
            const orderData = await response.json();

            for (let i = 0; i < orderData.length; i++) {
                let apiurls = orderData[i].products.url;
                console.log(apiurls);
                let options = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'X-Auth-Token': '16t1jgx6gyllvyiy9sb0xd5ma19fddb'
                    }
                };
                const response = await fetch(apiurls, options);
                const productDetails = await response.json();

                for (let j = 0; j < productDetails.length; j++) {
                    await createCsvFile(orderData[i], productDetails[j])
                }

            }

        } catch (error) {
            console.error(error);
        }
    };
};
