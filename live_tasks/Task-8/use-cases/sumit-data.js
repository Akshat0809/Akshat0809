module.exports = function makeGetDataFromSumitUseCase({
    templateBody
}) {
    return async function sumitData(id,variable) {
    // console.log("Inside to get test body data",id,variable)

        try {

            const apiUrl = `https://sumit.salesmate.io/apis/v1/modules/${id}/fields`;
            const accessToken = "80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9";

            const response = await fetch(apiUrl, {
                headers: {
                    "accesstoken": accessToken
                }
            });

            if (!response.ok) {
                throw new Error("Request failed with status code: " + response.status);
            }

            let testData = await response.json();
            testData = testData.Data[0].Fields;
            let ans;


            for(let i=0;i<testData.length;i++){
                if(testData[i].displayName === variable){
                    ans = testData[i].fieldName;
                }
            }

            return ans;


        } catch (error) {
            console.error(error);
        }
    };
};
