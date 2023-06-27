module.exports = function makeGetDataFromTemplateUseCase({
    createOrder,
    checkOrderid,
    createCsvFile
}) {
    return async function getTemplateData() {
        try {

            const axios = require('axios');
            const accessToken = '16t1jgx6gyllvyiy9sb0xd5ma19fddb';
            const apiUrl = `https://api.bigcommerce.com/stores/9mj5518wiz/v2/orders`;
            const limit = 250; // Adjust the limit per page as needed
            let page = 1;
            let allOrders = [];
            while (true) {
                const response = await axios.get(apiUrl, {
                    headers: {
                        'X-Auth-Token': accessToken,
                    },
                    params: {
                        limit,
                        page,
                    },
                });

                const { data } = response;
                const orders = data && data.length ? data : [];
                allOrders = allOrders.concat(orders);

                if (orders.length < limit) {
                    break;
                }

                page++;
            }
            console.log(allOrders[0]);
            return;
            let id = await checkOrderid();

            let orderNewId = allOrders[allOrders.length - 1].id;

            if (orderNewId > id) {

                console.log('New order Arrived', orderNewId);

                await createOrder(orderNewId);

                let i = allOrders.length - 1;
                // console.log(allOrders[i]);


                let apiurls = allOrders[i].products.url;
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
                    await createCsvFile(allOrders[i], productDetails[j])
                }

            }
            else {
                console.log('No new order');
            }
        } catch (error) {
            console.error(error);
        }

        setInterval(getTemplateData,20000);
    };

};
