module.exports = function makeGetgetcheckActivityTypeUseCase({
    createActivityType
}) {
    return async function checkActivityType(body) {
        console.log("Inside for check Activity Type");

        try {
            const url1 = `https://sumit.salesmate.io/apis/v1/activityTypes/`;
            const accessToken1 = '80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9';
            const response = await fetch(url1, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accesstoken': accessToken1,
                    "x-linkname": 'sumit.salesmate.io'
                }
            });
            const responseData = await response.json();
            const sumitActivitesType = responseData.Data.values;

            const url2 = `https://test.salesmate.io/apis/v1/activityTypes/`;
            const accessToken2 = 'd9b54660-0b4c-11ee-aa23-63200a1878a0-5d727f70-7d13-4ba3-90d6-1de106fcbaa1';
            const responses = await fetch(url2, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accesstoken': accessToken2,
                    "x-linkname": 'test.salesmate.io'
                }
            });
            const responsesData = await responses.json();
            const testActivitesTypes = responsesData.Data.values;

            for (let i = 0; i < testActivitesTypes.length; i++) {
                let flag = 0;
                for (let j = 0; j < sumitActivitesType.length; j++) {
                    if (testActivitesTypes[i].name === sumitActivitesType[j].name) {
                        flag++;
                    }
                }
                if (flag === 0) {
                    await createActivityType(testActivitesTypes[i]);
                }
            }
        }

        catch (err) {
            console.log("error in updating", err);
        }

    }
}