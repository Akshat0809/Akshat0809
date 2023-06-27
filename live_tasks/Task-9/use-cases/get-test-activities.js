module.exports = function makeGetDataFromTestActivitiesUseCase({
    getTestData,
    checkActivityType
}) {
    return async function getTestActivitiesData() {
        try {
            const accessToken = "d9b54660-0b4c-11ee-aa23-63200a1878a0-5d727f70-7d13-4ba3-90d6-1de106fcbaa1";
            const apiUrl = "https://test.salesmate.io/apis/activity/v4/search?rows=250&from=0&viewType=list";

            const displayingFields = ["activity.title", "activity.dueDate", "activity.duration", "activity.owner.name", "activity.owner.photo", "activity.owner.id", "activity.relatedTo.title", "activity.relatedTo.id", "activity.primaryContact.name", "activity.primaryContact.id", "activity.primaryContact.photo", "activity.primaryCompany.name", "activity.primaryCompany.id", "activity.primaryCompany.photo", "activity.tags", "activity.type", "activity.isCompleted", "activity.endDate", "activity.id"];
            const filterQuery = {
                group: {
                    operator: "AND",
                    rules: [
                        {
                            condition: "EQUALS",
                            data: "false",
                            field: {
                                fieldName: "activity.isCompleted",
                                displayName: "Completed",
                                type: "Boolean"
                            },
                            moduleName: "Task"
                        },
                        {
                            condition: "EQUALS",
                            data: "$MYSELF$",
                            field: {
                                fieldName: "activity.owner",
                                displayName: "Owner",
                                type: "Lookup"
                            },
                            moduleName: "Task"
                        }
                    ]
                }
            };
            const sort = [];
            const moduleId = 2;
            const reportType = "get_data";
            const getRecordsCount = true;

            const body = {
                displayingFields,
                filterQuery,
                sort,
                moduleId,
                reportType,
                getRecordsCount
            };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accesstoken": accessToken,
                    "x-linkname": 'test.salesmate.io'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error("Request failed with status code: " + response.status);
            }

            await checkActivityType();
            let templateData = await response.json();
            console.log("test Activites data", templateData.Data.data.length);
            for (let i in templateData.Data.data) {
                console.log('id', templateData.Data.data[i].id);
                await getTestData(templateData.Data.data[i].id);

            }

        } catch (error) {
            console.error(error);
        }
    };
};
