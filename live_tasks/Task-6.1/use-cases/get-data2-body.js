const { update } = require("lodash");

module.exports = function makeGetBodySalesmate2({
    createTemplate
    
}) {
    return async function getTemplateBody(id) {
        console.info("inside get template2 body",id);
        const url = `https://test.salesmate.io/apis/v1/emailTemplates/${id}`;
        const accessToken = '305f2f10-05c3-11ee-8e67-6d6669354778-399c1c1c-8324-4e8a-9ded-bcfdddda39c7';
        const response = await fetch(url, {
          headers: {
            "accesstoken": accessToken
          }
        });
  
        if (!response.ok) {
          throw new Error("Request failed with status code: " + response.status);
        }
  
        let data = await response.json();
        data = data.Data
        return data;
        


        const extractVariables = (template) => {
                 
            const placeholders = template.match(/{{[^{}]+}}/g);
            
            return placeholders;
          };

          let variables2 = extractVariables(data.body);
          let name = data.name;
          await createTemplate(variables2,name,data.subject)
          

          // if(variables2 !== null){
            
          //   let variables3 = variables2.filter(element => !variables1.includes(element));
          //   console.log('variables3',variables3);
          //   // await updateTemplate(variables3,variables2,id,data);
          // }
          // else{
          //   console.log("This cannot be updated",id);
          // }
         
    }
} 