module.exports = function makeGetTemplateBody({
    testData,
    sumitData,
    updateTemplate
}) {
    return async function templateBody(id,name) {
        try{
            console.info("inside get template2 body", id);
        const url = `https://sumit.salesmate.io/apis/v1/emailTemplates/${id}`;
        const accessToken = '80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9';
        const response = await fetch(url, {
            headers: {
                "accesstoken": accessToken
            }
        });

        if (!response.ok) {
            throw new Error("Request failed with status code: " + response.status);
        }

        let data = await response.json();
        data = data.Data.body;

        data = data.split(',');
        
        let customField = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].includes("CustomField")) {
                customField.push(data[i].split('.'));
                customField = customField.map(arr => arr.map(str => str.replace(/{{|}}/g, '')));
                customField = customField.map(arr => arr.map(str => str.replace(/"|"/g, '')));
                customField = customField.map(subArr => subArr.map(str => str.replace(/^\[([\w\s]+)$/, '$1')));
            }
        }
        console.log('--',customField.length, customField);

        if(customField.length == 0){
            console.log("We have no custom field , we r not updating");
        }
        
        let oldName = [];
        let newName = [];

        for (let i = 0; i < customField.length; i++) {

            
            if (customField[i][0] == 'Contact') {
                let ans = await testData(1, customField[i][1]);
                let newAns = await sumitData(1, ans);
                if(newAns === undefined){
                    newAns = customField[i][1];
                }
                console.log("Test body name", customField[i][1], "Sumit body name", newAns);
                oldName.push("Contact." + customField[i][1]);
                newName.push('Contact.' + newAns);
            }

            else if (customField[i][0] == 'Company') {
                let ans = await testData(5, customField[i][1]);
                let newAns = await sumitData(5, ans);
                if(newAns === undefined){
                    newAns = customField[i][1];
                }
                console.log("Test body name", customField[i][1], "Sumit body name", newAns);
                oldName.push("Company." + customField[i][1]);
                newName.push('Company.' + newAns);
            }

            else if (customField[i][0] == 'Deal') {
                let ans = await testData(4, customField[i][1]);
                //    console.log("Test body name",customField[i][1],"Sumit body name",newAns);
            }
            else if (customField[i][0] == 'Task') {
                let ans = await testData(2, customField[i][1]);
                let newAns = await sumitData(2, ans);
                if(newAns === undefined){
                    newAns = customField[i][1];
                }
                console.log("Test body name", customField[i][1], "Sumit body name", newAns);
                oldName.push("Task." + customField[i][1]);
                newName.push('Task.' + newAns);
            }
        }

        if(oldName.length !== 0 || newName.length !== 0){
        await updateTemplate(oldName,newName,id,name,data);
        }
        oldName = [];
        newName = [];

        }
        catch(err){
            console.log("error in getting template body",err);
        }
    }
}