const querystring = require('querystring');
const axios = require('axios');

module.exports = function makeCreateCustomFieldUseCase({

}) {
    return async function createCustomField(id,name,type,fieldOptions,groupId) {
       console.log("inside create",id);
        try {

            const accessToken = "80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9";

            const url = `https://sumit.salesmate.io/apis/v1/modules/${id}/fields`;
            
            const requestBody = querystring.stringify({
                groupId:groupId,
                displayName:name,
                type:type,
                fieldOptions:fieldOptions
              });
              console.log("requestBody",requestBody);
            //   return;
              const response = await axios.post(url, requestBody, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'accesstoken': accessToken
                }
              });
        
              const responseData = response.data;
              console.log('POST Request Response');

        } catch (error) {
            console.error(error);
        }
    };
};