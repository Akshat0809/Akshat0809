module.exports = function makeGetTestDataUseCase({
  createActivity,
  checkActivityType
}) {
  return async function getTestData(id) {
    try {
      const accessToken = "d9b54660-0b4c-11ee-aa23-63200a1878a0-5d727f70-7d13-4ba3-90d6-1de106fcbaa1";
      const apiUrl = `https://test.salesmate.io/apis/activity/v4/${id}?id=${id} `;


      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "accesstoken": accessToken,
          "x-linkname": 'test.salesmate.io'
        }
      });

      if (!response.ok) {
        throw new Error("Request failed with status code: " + response.status);
      }

      let testData = await response.json();
      let body = testData.Data;
      delete body.id;

      function removeNullUndefinedFields(obj) {
        for (let prop in obj) {
          if (obj[prop] === null || obj[prop] === undefined || obj[prop] === '') {
            delete obj[prop];
          } else if (typeof obj[prop] === 'object') {
            removeNullUndefinedFields(obj[prop]);
            if (Object.keys(obj[prop]).length === 0) {
              delete obj[prop];
            }
          }
        }
      }

      removeNullUndefinedFields(body)
      await createActivity(body);

    } catch (error) {
      console.error(error);
    }
  };
};
