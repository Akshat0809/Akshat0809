module.exports = function makeGetDataFromTemplateUseCase({
    templateBody,
    updateTemplate
}) {
    return async function getTemplateData() {
        try {
            const accessToken = "80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9";
            const apiUrl = "https://sumit.salesmate.io/apis/v1/emailTemplates";

            const response = await fetch(apiUrl, {
                headers: {
                    "accesstoken": accessToken
                }
            });

            if (!response.ok) {
                throw new Error("Request failed with status code: " + response.status);
            }

            let templateData = await response.json();
            templateData = templateData.Data;


            // await templateBody(801,'Welcome To Salesmate');
            for (let i = 0; i < templateData.length; i++) {
                if (templateData[i].folderId === 12) {
                    console.log(templateData[i].id, templateData[i].name);
                    let templateBodye = await templateBody(templateData[i].id, templateData[i].name);


                }
            }

        } catch (error) {
            console.error(error);
        }
    };
};
