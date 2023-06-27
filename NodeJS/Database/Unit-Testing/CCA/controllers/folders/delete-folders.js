module.exports = function makeDeleteFolderController({
    Joi,
    deleteFolder,
}) {
    return async function deleteFolderController(req, res){
        console.info(`In delete folder controller`, req.body);
        try{
            const database_name  = req.headers['database_name'];
            const data ={
                id:req.params.id,
            }
            await deleteFolder(database_name,data);
            res.status(201).json({
                status:'Success',
                messege:'Folder Deleted'
            })
        }
        catch(err)
        {
            res.status(500).json({
                status:'Error',
                messege:'Error '+err
            })
        }
        }
    }