// const axios = require('axios');

// const accessToken = 'f69392f0-0516-11ee-906c-039cf6e6ca22-776493a2-2068-4925-a66d-e95f0f8e3f13';
// const secret_key = '9c33bae1-b9d2-11ed-8056-0d118e2d3ff7';
// const session_key = '425f9601-0505-11ee-9e8d-ef498b44d854';

// const url = 'https://mysalesmate.salesmate.io/apis/sm-web-anl/v1/track';

// const requestBody = {
//   name:'Test-3'
// };

// axios.post(url, requestBody, {
//   headers: {
//     "accessToken" : accessToken,
//     "secretkey": secret_key,
//     "sessionkey":session_key
//   }
// })
//   .then(response => {
//     console.log('Response:', response.data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });


/////////////////////////////////////////////////////////
const axios = require('axios');

const accessToken = 'f69392f0-0516-11ee-906c-039cf6e6ca22-776493a2-2068-4925-a66d-e95f0f8e3f13';
const secretKey = '9c33bae1-b9d2-11ed-8056-0d118e2d3ff7';
const sessionKey = '425f9601-0505-11ee-9e8d-ef498b44d854';

const url = 'https://mysalesmate.salesmate.io/apis/sm-web-anl/v1/track';

const requestBody = {
  name: 'Test-3'
};

axios.post(url, requestBody, {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Secret-Key': secretKey,
    'Session-Key': sessionKey,
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
