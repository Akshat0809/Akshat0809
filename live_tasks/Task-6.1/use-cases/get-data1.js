// module.exports = function makeGetDataFromSalesmate1UseCase({
//     getFileData2,
//     getTemplateBody,
//     getName,
//     getBodySumit,
//     updateTemplate,
//     getTestBody
// }) {
//     return async function getfiledata1() {
//         const accessToken = "80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9";
//         const apiUrl = "https://sumit.salesmate.io/apis/v1/emailTemplates";

//         try {
//             const response = await fetch(apiUrl, {
//                 headers: {
//                     "accesstoken": accessToken
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error("Request failed with status code: " + response.status);
//             }

//             let data = await response.json();
//             data = data.Data;
//             let Ids = await getFileData2();
//             console.log(data);

//             for (let i = 0; i < Ids.length; i++) {

//                 if (data[i].folderId !== 3) {

//                     console.log("Here we directly creating");
//                     for (let id of Ids) {
//                         let body = await getTestBody(id);
//                     }

//                 }
//                 else {
//                     console.log("Here are we updating only");
//                     let nameCheck = data[i].name
//                     let id = data[i].id;
//                     let dataFromTest = await getName();
//                     let datafromakshat = data[i];
//                     let folderId = data[i].folderId;
//                     let name = data[i].name;


//                     for (let i = 0; i < dataFromTest.length; i++) {

//                         if (dataFromTest[i].name === nameCheck) {

//                             console.log('Yha p hum ab andr ki body check krege or update krenege');
//                             let datafromsir = await getTemplateBody(dataFromTest[i].id);
//                             let bodyAkshat = await getBodySumit(datafromakshat.id)

//                             const extractVariables = (template) => {

//                                 const placeholders = template.match(/{{[^{}]+}}/g);

//                                 return placeholders;
//                             };
//                             let variables1 = extractVariables(bodyAkshat.body);
//                             let variables2 = extractVariables(datafromsir.body);
//                             let variables3 = variables2.filter((item) => !variables1.includes(item));

//                             await updateTemplate(variables3 + variables1, id, name, folderId);

//                         }
//                         else {
//                             //         let Ids = await getFileData2();

//                             // for (let id of Ids) {
//                             //     let body = await getTemplateBody(id);
//                             // }
//                         }
//                     }
//                 }

//             }

//         }

//         catch (error) {
//             console.error(error);
//         }
//     }
// }

//////////////////////////////////////////////////////////////////////////////////////////////

module.exports = function makeGetDataFromSalesmate1UseCase({
    getFileData2,
    getTemplateBody,
    getName,
    getBodySumit,
    updateTemplate,
    getTestBody
}) {
    return async function getfiledata1() {
        const accessToken = "80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9";
        const apiUrl = "https://sumit.salesmate.io/apis/v1/emailTemplates";

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    "accesstoken": accessToken
                }
            });

            if (!response.ok) {
                throw new Error("Request failed with status code: " + response.status);
            }

            let data = await response.json();
            data = data.Data;
            let Ids = await getFileData2();

            console.log("length of id",Ids.length,Ids);

            for (let i = 0; i < Ids.length; i++) {
                let templateExists = false;
                let existingTemplateId = null;

                if (data[i].folderId !== 3) {
                    console.log("Here we directly create",data[i].name);
                    // for (let id of Ids) {
                    //     let body = await getTestBody(id);
                    // }
                // } else {
                //     console.log("Here we are updating only");
                //     let nameCheck = data[i].name;
                //     let id = data[i].id;
                //     let dataFromTest = await getName();
                //     let datafromakshat = data[i];
                //     let folderId = data[i].folderId;
                //     let name = data[i].name;

                //     for (let i = 0; i < dataFromTest.length; i++) {
                //         if (dataFromTest[i].name === nameCheck) {
                //             templateExists = true;
                //             existingTemplateId = dataFromTest[i].id;
                //             break;
                //         }
                //     }

                //     if (templateExists) {
                //         console.log('Yha p hum ab andr ki body check krege or update krenege');
                //         let datafromsir = await getTemplateBody(existingTemplateId);
                //         let bodyAkshat = await getBodySumit(datafromakshat.id);

                //         const extractVariables = (template) => {
                //             const placeholders = template.match(/{{[^{}]+}}/g);
                //             return placeholders;
                //         };

                //         let variables1 = extractVariables(bodyAkshat.body);
                //         let variables2 = extractVariables(datafromsir.body);
                //         let variables3 = variables2.filter((item) => !variables1.includes(item));

                //         await updateTemplate(variables3 + variables1, id, name, folderId);
                //     } else {
                //         console.log('Here we directly create');
                //         for (let id of Ids) {
                //             let body = await getTestBody(id);
                //             // Create the new template using the obtained body
                //         }
                //     }
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
};
