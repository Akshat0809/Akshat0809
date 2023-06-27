module.exports = function makeGetDataFromTestUseCase({
    templateBody
}) {
    return async function testData(id,variable) {
    // console.log("Inside to get test body data",id,variable)

        try {

            const apiUrl = `https://test.salesmate.io/apis/v1/modules/${id}/fields`;
            const accessToken = "305f2f10-05c3-11ee-8e67-6d6669354778-399c1c1c-8324-4e8a-9ded-bcfdddda39c7";

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
                if(testData[i].fieldName === variable){
                    ans = testData[i].displayName;
                }
            }
            return ans;


        } catch (error) {
            console.error(error);
        }
    };
};
