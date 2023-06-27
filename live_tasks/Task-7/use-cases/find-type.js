module.exports = function makefindTypeDataUseCase({

}) {
    return async function findType(id,name) {
        console.info("Inside use case of test data",id)
        try {

            const accessToken = "305f2f10-05c3-11ee-8e67-6d6669354778-399c1c1c-8324-4e8a-9ded-bcfdddda39c7";

            const apiUrl = `https://test.salesmate.io/apis/v1/modules/${id}/fields`;
            

            const response = await fetch(apiUrl, {
                headers: {
                    "accesstoken": accessToken
                }
            });

            if (!response.ok) {
                throw new Error("Request failed with status code: " + response.status);
            }

            let dataOfModules = await response.json();
            dataOfModules = dataOfModules.Data;
            let ans;
            // console.log('dataOfModules', dataOfModules[0].Fields);

            for(let i = 0; i < dataOfModules[0].Fields.length; i++){

                if(dataOfModules[0].Fields[i].displayName === name){
                    ans = dataOfModules[0].Fields[i];
                }
            }

            return ans;

        } catch (error) {
            console.error(error);
        }
    };
};