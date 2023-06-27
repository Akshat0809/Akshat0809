module.exports = function makeGetDataModules2DataUseCase({

}) {
    return async function getModulesData2(id) {
        console.info("Inside use case of test data")
        try {

            const accessToken = "305f2f10-05c3-11ee-8e67-6d6669354778-399c1c1c-8324-4e8a-9ded-bcfdddda39c7";

            const apiUrl = `https://test.salesmate.io/apis/v1/modules/${id}/fields`;
            
            let customField = [];
            let type = [];

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
            // console.log('dataOfModules', dataOfModules[0].Fields);

            // for(let i = 0; i < dataOfModules[0].Fields.length; i++){

            //     if(dataOfModules[0].Fields[i].isRemovable === true){
            //         customField.push(dataOfModules[0].Fields[i].displayName)
            //         type.push(dataOfModules[0].Fields[i].type);
            //     }
            // }


            return (dataOfModules[0].Fields);

        } catch (error) {
            console.error(error);
        }
    };
};