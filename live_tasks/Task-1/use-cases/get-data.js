module.exports = function makeGetfileUseCase({
    xlsx,
    addproduct,
    addSortAdder
}){
    return async function getfiledata() {
        console.info(`Inside get file data use case`);
            const workbook = xlsx.readFile('/home/ad.rapidops.com/akshat.jain/Downloads/Product-Data-Sample.xlsx');
            const read = workbook.SheetNames;
            let response = xlsx.utils.sheet_to_json(workbook.Sheets[read[0]])
            const res = await addSortAdder(response);
            await addproduct(res);
            return response;
    }
}