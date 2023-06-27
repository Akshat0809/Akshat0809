module.exports = function makeGetcreateActivityUseCase({

}) {
    return async function createActivity(data) {
        console.log("Inside for Creating Activity");

        try {
            const url2 = `https://sumit.salesmate.io/apis/activity/v4`;
            const accessToken2 = '80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9';

            const inputDate = new Date();

            const year = inputDate.getUTCFullYear();
            const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
            const day = String(inputDate.getUTCDate()).padStart(2, '0');
            const hours = String(inputDate.getUTCHours()).padStart(2, '0');
            const minutes = String(inputDate.getUTCMinutes()).padStart(2, '0');
            const seconds = String(inputDate.getUTCSeconds()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;


            const convertedData = {
                title: data.title,
                isCompleted: data.isCompleted,
                dueDate: data.createdAt,
                lastModifiedAt: data.lastModifiedAt,
                isDeleted: data.isDeleted,
                duration: data.duration,
                type: data.type,
                isCalendarInvite: data.isCalendarInvite,
                isCreatedFromSystem: data.isCreatedFromSystem,
                purpose: data.purpose,
                visibility: data.visibility,
                owner: 19,
                createdBy: 19,
                lastNoteAddedBy: 19

            };

            const requestBody = {
                convertedData
            };
            console.log('requestBody', requestBody.convertedData);


            const response = await fetch(url2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accesstoken': accessToken2,
                    "x-linkname": 'sumit.salesmate.io'
                },
                body: JSON.stringify(requestBody.convertedData)
            });


            const responseData = await response.json();
            console.log('POST Request Response:', responseData);
        }

        catch (err) {
            console.log("error in updating", err);
        }

    }
}