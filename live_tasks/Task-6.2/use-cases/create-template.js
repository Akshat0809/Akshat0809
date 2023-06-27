// const querystring = require('querystring');

// module.exports = function makeCreateTemplateUseCase() {
//   return async function createTemplate(variables2, name, subject) {
//     try {
//       console.log("inside create template", variables2);
//       const axios = require('axios');

//       const url = 'https://sumit.salesmate.io/apis/v1/emailTemplates/?includeArchived=true';
//       const accessToken = '80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9';
      
//       const requestBody = querystring.stringify({
//         name: name,
//         subject: subject,
//         folderId: 6,
//         body: JSON.stringify(variables2),
//       });
      
//       // return;
//       const response = await axios.post(url, requestBody, {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'accesstoken': accessToken
//         }
//       });

//       const responseData = response.data;
//       console.log('POST Request Response:', responseData);
//     } catch (err) {
//       console.log("error", err);
//     }
//   }
// }


//////////////////////////////////////////////////////////////////////////////////

module.exports = function makeCreateTemplateUseCase() {
    return async function createTemplate(variables2, name) {
      try {
        console.log("inside create template");
        const axios = require('axios');
  
        const url = 'https://sumit.salesmate.io/apis/v1/emailTemplates/?includeArchived=true';

        const accessToken = '80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9';
  
        const requestBody = {
          name: name,
          subject: "This is updated",
          folderId: 12,
          body: JSON.stringify(variables2)
        };
        console.log(requestBody);
  
        const response = await axios.post(url, requestBody, {
          headers: {
            'Content-Type': 'application/json',
            'accesstoken': accessToken
          }
        });
  
        const responseData = response.data;
        console.log('POST Request Response:', responseData);
      } catch (err) {
        console.log("error", err);
      }
    }
  }
  