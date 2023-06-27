module.exports = function makeGetDataFromTestDealsUseCase({
    getTestData,
    checkActivityType
}) {
    return async function getTestDealsData() {
        console.log("Welcome to deals");
        try {

            const url = `https://test.salesmate.io/apis/v3/apps/dealPipeline`;
            const accessToken = 'd9b54660-0b4c-11ee-aa23-63200a1878a0-5d727f70-7d13-4ba3-90d6-1de106fcbaa1'

            const headers = {
                "accept": 'application/json, text/plain, */*',
                "accesstoken": accessToken,
                'content-type': 'application/json',
                'x-linkname': 'test.salesmate.io'
            };

            const options = {
                method: 'GET',
                headers: headers
            };

            const response = await fetch(url, options);
            const data = await response.json();
            let pipe = data.Data
            // console.log('pipe',pipe);

            for(let i=0;i<pipe.length;i++){
                // console.log('name of pipeline',pipe[i].pipeline);
                await createPipeline(pipe[i])
                // console.log('stage',pipe[i].stages);
                for(let j = 0;j<pipe[i].stages.length;j++){
                    // console.log('stages name',pipe[i].stages[j]);
                    await createStage(pipe[i].pipeline,pipe[i].stages[j]);
                }
            }

            async function createPipeline(body){
            const url = `https://sumit.salesmate.io/apis/core/v1/deal-pipelines`;
            const accessToken = '80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9'

            const headers = {
                "accept": 'application/json, text/plain, */*',
                "accesstoken": accessToken,
                'content-type': 'application/json',
                'x-linkname': 'sumit.salesmate.io'
            };
            const requestBody = {
                pipeline:body.pipeline,
                isWinProbabilityEnabledManually:body.isWinProbabilityEnabledManually
            };
            console.log('requestBody',requestBody);
            // return;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accesstoken': accessToken,
                    "x-linkname": 'sumit.salesmate.io'
                },
                body: JSON.stringify(requestBody)
            });


            const responseData = await response.json();
            console.log('POST Request Response:', responseData);
            }

            async function createStage(name,body){
                const url = `https://sumit.salesmate.io/apis/core/v1/deal-pipelines/${name}/stages`;
                const accessToken = '80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9'
    
                const headers = {
                    "accept": 'application/json, text/plain, */*',
                    "accesstoken": accessToken,
                    'content-type': 'application/json',
                    'x-linkname': 'sumit.salesmate.io'
                };
                const requestBody = {
                    rottenPeriod: body.rottenPeriod,  
                    stage: body.stage,
                    winProbability: body.winProbability
                };
                console.log('requestBody',requestBody);
                // return;
    
                const response =await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'accesstoken': accessToken,
                        "x-linkname": 'sumit.salesmate.io'
                    },
                    body: JSON.stringify(requestBody)
                });
    
    
                const responseData = await response.json();
                console.log('POST Request Response:', responseData);
                }

            

        } catch (error) {
            console.error(error);
        }
    };
};
