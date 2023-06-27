module.exports = function makeGetgetAllTestDealsUseCase({
    createActivityType
}) {
    return async function getAllTestDeals() {
        console.log("Inside for get all deals data");

        try {
            const url1 = `https://test.salesmate.io/apis/deal/v4/search?rows=25&from=0`;

            const accessToken1 = 'd9b54660-0b4c-11ee-aa23-63200a1878a0-5d727f70-7d13-4ba3-90d6-1de106fcbaa1';

            const requestBody = {

                "displayingFields": [
                    "deal.title",
                    "deal.primaryContact.name",
                    "deal.primaryContact.id",
                    "deal.primaryContact.photo",
                    "deal.primaryCompany.name",
                    "deal.primaryCompany.id",
                    "deal.primaryCompany.photo",
                    "deal.dealValue",
                    "deal.stage",
                    "deal.status",
                    "deal.owner.name",
                    "deal.owner.photo",
                    "deal.owner.id",
                    "deal.lastActivityAt",
                    "deal.tags",
                    "deal.closedDate",
                    "deal.pipeline",
                    "deal.currency",
                    "deal.lostReason",
                    "deal.description",
                    "deal.id"
                ],
                "filterQuery": {
                    "group": {
                        "operator": "AND",
                        "rules": [
                            {
                                "moduleName": "Deal",
                                "field": {
                                    "fieldName": "deal.isDeleted",
                                    "displayName": "Show Deleted",
                                    "type": "Boolean"
                                },
                                "data": "false",
                                "eventType": "Boolean"
                            }
                        ]
                    }
                },
                "sort": [],
                "pipeline": "",
                "moduleId": 4,
                "reportType": "get_data",
                "getRecordsCount": true


            };

            const response = await fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accesstoken': accessToken1,
                    "x-linkname": 'test.salesmate.io'
                },
                body: JSON.stringify(requestBody)
            });

            const responseData = await response.json();
            const allData = responseData.Data.data;

            for (let i = 0; i < allData.length; i++) {
                // console.log('alldata',allData[i]);
                await createssDeal(allData[i]);
            }
        }

        catch (err) {
            console.log("Error in fetching data", err);
        }

    }
}

async function createssDeal(body) {
    try{
        const url2 = `https://sumit.salesmate.io/apis/deal/v4`;
    const accessToken2 = '80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9';


    const reqbody = {
        title: body.title,
        pipeline: body.pipeline,
        // primaryConatct: body.primaryContact.id,
        owner: 19,
        status: body.status,
        dealValue:body.dealValue,
        stage:body.stage,
        
        tags:body.tags,
        currency:body.currency,
        };
    
    console.log('requestBody',reqbody);
    // return;

    const response = await fetch(url2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accesstoken': accessToken2,
            "x-linkname": 'sumit.salesmate.io'
        },
        body: JSON.stringify(reqbody)
    });

    const responseData = await response.json();
    console.log('POST Request Response:', responseData);
    }
    catch(err){
      console.log("here is error",err);
    }
}