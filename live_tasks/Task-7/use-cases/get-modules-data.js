module.exports = function makeGetDataModulesDataUseCase({

}) {
    return async function getModulesData(id) {

        try {

            const accessToken = "80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9";

            const apiUrl = `https://sumit.salesmate.io/apis/v1/modules/${id}/fields`;
            
            let customField = [];

            const response = await fetch(apiUrl, {
                headers: {
                    "accesstoken": accessToken
                }
            });

            // if (!response.ok) {
            //     throw new Error("Request failed with status code: " + response.status);
            // }

            let dataOfModules = await response.json();
            dataOfModules = dataOfModules.Data;
            // console.log('dataOfModules', dataOfModules[0].Fields);

            // for(let i = 0; i < dataOfModules[0].Fields.length; i++){

            //     if(dataOfModules[0].Fields[i].isRemovable === true){
            //         customField.push(dataOfModules[0].Fields[i].displayName)
            //     }
            // }

            
            // return customField;
            return (dataOfModules[0].Fields);

        } catch (error) {
            console.error(error);
        }
    };
};