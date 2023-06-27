module.exports = function makeGetUpdateTemplate({

}) {
    return async function updateTemplate(oldName, updateName, id, name, body) {

        try {
            let updatedBody = body.map(item => {
                for (let i = 0; i < oldName.length; i++) {
                    const regex = new RegExp(oldName[i], 'g');
                    item = item.replace(regex, updateName[i]);
                }
                return item;
            });
            console.log('length', updatedBody.length, updatedBody);
            updatedBody = JSON.parse(updatedBody);
            updatedBody = updatedBody.join(",");

            console.log('updatedBody', updatedBody, typeof (updatedBody));
            const url2 = `https://sumit.salesmate.io/fe/addEmailTemplate/${id}`;
            const accessToken2 = '80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9';

            const requestBody = {
                name: name,
                subject: 'This is updated',
                folderId: 12,
                body: updatedBody
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


            const responseData = await response.json();
            console.log('PUT Request Response:', responseData);
        }

        catch (err) {
            console.log("error in updating", err);
        }

    }
}