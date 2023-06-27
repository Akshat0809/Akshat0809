const fetchData = async () => {
  const accessToken = "f69392f0-0516-11ee-906c-039cf6e6ca22-776493a2-2068-4925-a66d-e95f0f8e3f13";

  try {
    const getEmailTemplate = async (templateId) => {
      const url = `https://sumit.salesmate.io/apis/v1/emailTemplates/${templateId}`;
      const response = await fetch(url, {
        headers: {
          "accesstoken": accessToken
        }
      });

      if (!response.ok) {
        throw new Error("Request failed with status code: " + response.status);
      }

      const data = await response.json();
      // console.log(data);
      return data;
    };

    const template3 = await getEmailTemplate(3);
    const template6 = await getEmailTemplate(6);

    const extractVariables = (template) => {
      const variablePattern = /{{([^}]+)}}/g;
      const variables = [];
      let match;

      while ((match = variablePattern.exec(template)) !== null) {
        variables.push(match[1]);
      }

      return variables;
    };

    let variables1 = extractVariables(template3.Data.body);

    let variables2 = extractVariables(template6.Data.body);

    let variables3 = variables1.filter(element => !variables2.includes(element));

    for (let i = 0; i < variables2.length; i++) {
      variables2[i] = '{{' + variables2[i] + '}}';
    }
    for (let i = 0; i < variables2.length; i++) {
      variables3[i] = '{{' + variables3[i] + '}}';
    }

    console.log('Variables 1:', variables1);
    console.log('Variables 2:', variables2);
    console.log('Priority Variables:', variables3);

    const url2 = 'https://sumit.salesmate.io/fe/addEmailTemplate/6';
    const accessToken2 = 'f69392f0-0516-11ee-906c-039cf6e6ca22-776493a2-2068-4925-a66d-e95f0f8e3f13';

    const requestBody = {
      name: template6.Data.name,
      subject: 'this is updates',
      folderId: template6.Data.folderId,
      body: variables2 + ',' + variables3
    };
    console.log('requestBody', requestBody);
    // return;

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
  } catch (error) {
    console.error(error);
  }
};

fetchData();
