module.exports = function makeGetcreateActivityTypeUseCase({

}) {
    return async function createActivityType(data) {
        console.log("Inside for Creating Activity Type");

        try {
            const url2 = `https://sumit.salesmate.io/apis/core/v1/activity-types`;
            const accessToken2 = '80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9';


            const requestBody = {
                name: data.name,
                icon: data.icon,
                isActive: data.isActive,
                countAsCommunication: data.countAsCommunication,
                sortOrder: data.sortOrder,
            };
            console.log('requestBody', requestBody);

            const response = await fetch(url2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accesstoken': accessToken2,
                    "x-linkname": 'sumit.salesmate.io'
                },
                body: JSON.stringify(requestBody)
            });


            const responseData = await response.json();
            console.log('POST Request Response:', responseData);
        }

        catch (err) {
            console.log("error in fetch types", err);
        }

    }
}