module.exports = function makeGetfileUseCase({
    xlsx,
    addproduct,
    addSortAdder,
    filedetails
}){
    return async function getfiledata() {
        console.info(`Inside get file data use case`);
        let file_name = 'Product-Cat-Test';
            const workbook = xlsx.readFile('/home/ad.rapidops.com/akshat.jain/Downloads/Product-Data-Full-Test.xlsx');
            const read = workbook.SheetNames;
            let response = xlsx.utils.sheet_to_json(workbook.Sheets[read[1]])
            const currentDate = new Date();
            const file_id = await filedetails(file_name,currentDate);
            const res = await addSortAdder(response);

            await addproduct(res,file_id);
            // await addproduct(xValues[0],file_id)
            return response;
    }
}