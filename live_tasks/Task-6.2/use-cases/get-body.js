module.exports = function makeGetBody({


}) {
    return async function getBodySumit(id) {


        try {

            let ans;
            console.log("inside get Body of sumit",id);

            const accessToken = "80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9";
            const apiUrl = `https://sumit.salesmate.io/apis/v1/emailTemplates/${id}`;

            const response = await fetch(apiUrl, {
                headers: {
                    "accesstoken": accessToken
                }
            });

            if (!response.ok) {
                throw new Error("Request failed with status code: " + response.status);
            }

            let data = await response.json();
            ans = data.Data;

            const extractVariables = (template) => {

                const placeholders = template.match(/{{[^{}]+}}/g);

                return placeholders;
            };

            let variables2 = extractVariables(ans.body);
            return variables2;




        }
        catch (err) {
            console.log(err);
        }

    }
} 