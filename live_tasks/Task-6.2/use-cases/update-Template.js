module.exports = function makeGetUpdateTemplate({

}) {
  return async function updateTemplate(variables, id, name, folderId) {
    console.log("Inside update template");

    try{
      const url2 = `https://sumit.salesmate.io/fe/addEmailTemplate/${id}`;
    const accessToken2 = '80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9';

    const requestBody = {
      name: name,
      subject: 'This is updated',
      folderId: folderId,
      body: variables
    };
    console.log('requestBody', requestBody);


    const response = await fetch(url2, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'accesstoken': accessToken2
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error("Request failed with status code: " + response.status);
    }

    const responseData = await response.json();
    console.log('PUT Request Response:', responseData);
    }
    catch(err){
      console.log(err);
    }
  }
}