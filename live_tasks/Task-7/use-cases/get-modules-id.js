module.exports = function makeGetDataModulesUseCase({
    getModulesData,
    getModulesData2,
    findType,
    createCustomField
}) {
    return async function getModules() {


        try {

            const accessToken = "80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9";
            const apiUrl = "https://sumit.salesmate.io/apis/v1/modules/purchased";

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
            // let customField1 = [];
            // let customField2 = [];

            // let moduleData1 = await getModulesData(1);
            // let moduleData2 = await getModulesData2(1);

            // for(let i = 0; i < moduleData1.length; i++){

            //     if(moduleData1[i].isRemovable === true){
            //         customField1.push(moduleData1[i].displayName)
            //         console.log
            //     }
            // }

            // for(let i = 0; i < moduleData2.length; i++){

            //     if(moduleData2[i].isRemovable === true){
            //         customField2.push(moduleData2[i].displayName)
            //     }
            // }

            // console.log('customField', customField1);
            // console.log('customField2', customField2);

            // let output = customField2.filter(item => !customField1.includes(item));

            // console.log(output,output.length);

            // for(let i = 0 ; i<output.length ; i++){

            //     let type = await findType(1,output[i]);
            //     console.log(output[i],type);
            //     await createCustomField(1,output[i],type)
            // }

            for (let i = 0; i < dataOfSalesmate1.length; i++) {
                console.log('dataOfSalesmate1', dataOfSalesmate1[i].name);
            

                let name = dataOfSalesmate1[i].name;
                let customField1 = [];
                let customField2 = [];
                let id = dataOfSalesmate1[i].id;
                // await getModulesData(dataOfSalesmate1[i].id);
                if (id !== 3 && id !== 6 && id !== 7) {
                    let moduleData1 = await getModulesData(dataOfSalesmate1[i].id);
                    let moduleData2 = await getModulesData2(dataOfSalesmate1[i].id);


                    for (let i = 0; i < moduleData1.length; i++) {

                        if (moduleData1[i].isRemovable === true) {
                            customField1.push(moduleData1[i].displayName)
                            console.log
                        }
                    }

                    for (let i = 0; i < moduleData2.length; i++) {

                        if (moduleData2[i].isRemovable === true) {
                            customField2.push(moduleData2[i].displayName)
                        }
                    }

                    

                    let output = customField2.filter(item => !customField1.includes(item));

                    console.log('output', output,name);


                    for (let i = 0; i < output.length; i++) {

                        let type = await findType(id, output[i]);
                        console.log(output[i], type.type);

                        if(name === 'Contact'){
                        let groupId = 1;
                        await createCustomField(id, output[i], type.type, type.fieldOptions,groupId)
                    }

                    else if(name === 'Deal'){
                        let groupId = 8;
                        await createCustomField(id, output[i], type.type, type.fieldOptions,groupId)
                    }

                    else if(name === 'Company'){
                        let groupId = 11;
                        await createCustomField(id, output[i], type.type, type.fieldOptions,groupId)
                    }

                    else if(name === 'Task'){
                        let groupId = 5;
                        await createCustomField(id, output[i], type.type, type.fieldOptions,groupId)
                    }

                    }
                }


            }

        } catch (error) {
            console.error(error);
        }
    };
};


// api to get id of modules
// https://sumit.salesmate.io/apis/v1/modules/purchased

//api to get data of modules
// https://sumit.salesmate.io/apis/v1/modules/1/fields

//api to create custom fields
// https://sumit.salesmate.io/apis/v1/modules/1/fields