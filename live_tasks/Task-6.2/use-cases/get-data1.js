module.exports = function makeGetDataFromSalesmate1UseCase({
    getFileData2,
    getTemplateBody,
    getBodySumit,
    updateTemplate,
    createTemplate
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

            let dataOfSalesmate1 = await response.json();
            dataOfSalesmate1 = dataOfSalesmate1.Data;


            let dataOfSalesmate2 = await getFileData2();


            let ids = dataOfSalesmate2.map(dataOfSalesmate2 => dataOfSalesmate2.id);




            for (let i = 0; i < dataOfSalesmate2.length; i++) {
                let flag = 0;
                // for (j = 0; j < dataOfSalesmate1.length; j++) {

                    // if (dataOfSalesmate2[i].name === dataOfSalesmate1[j].name) {
                    //     console.log("name is found we r just updating", dataOfSalesmate1[j].name);

                    //     let updateVaribale;
                    //     let bodyAkshat = await getBodySumit(dataOfSalesmate1[j].id);
                    //     let update = await getTemplateBody(dataOfSalesmate2[i].id, bodyAkshat);

                    //     if (update !== null && bodyAkshat !== null) {
                    //         updateVaribale = update.filter((bodyAkshat) => !bodyAkshat.includes(bodyAkshat));
                    //     }

                    //     await updateTemplate((updateVaribale + bodyAkshat), dataOfSalesmate1[j].id, dataOfSalesmate1[j].name, dataOfSalesmate1[j].folderId);

                    //     flag++;
                    //     break;
                    // }
                // }
                console.log('flag', flag);
                if (flag === 0) {
                    console.log("Now we are creating");
                    let update = await getTemplateBody(dataOfSalesmate2[i].id);
                    // console.log('---.....---..--',dataOfSalesmate2[i]);
                    await createTemplate(update, dataOfSalesmate2[i].name)
                }
            }

        } catch (error) {
            console.error(error);
        }
    };
};
