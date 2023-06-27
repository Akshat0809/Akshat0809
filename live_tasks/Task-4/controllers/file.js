module.exports = function makeGetFilecontroller({
    getfiledata
}) {
    return async function getfileController(req, res){
        console.info(`In get file controller`);
        try{
            const response =  await getfiledata();
            res.status(201).json({
                status:'Success',
                messege: response
            })
            // console.log("console",response['Product Name'])
        }
         catch(err)
        {
            console.log(err);
            res.status(500).json({
                status:'Error',
                messege:'Error'+err
            })
        }
        }
}