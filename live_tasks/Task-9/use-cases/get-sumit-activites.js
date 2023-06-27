module.exports = function makeGetDataFromSumitActivitiesUseCase({
    getTestActivitiesData,
    getTestDealsData,
    getAllTestDeals
}) {
    return async function getSumitActivitiesData() {
        try {
            // await getTestActivitiesData();
            // await getTestDealsData();
            await getAllTestDeals();


        } catch (error) {
            console.error(error);
        }
    };
};
