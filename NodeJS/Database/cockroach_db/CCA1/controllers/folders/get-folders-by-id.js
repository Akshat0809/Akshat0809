module.exports = function makeGetFolderByIdController({
    Joi,
    getFolderById,
}) {
    return async function getFolderByIdController(req, res){
        
        try{
            const database_name  = req.headers['database_name'];
            const id=+(req.params.id);
            console.info(`In get folders by user_id controller`,id);
            const ans=await getFolderById(database_name,id);
            res.status(201).json({
                status:'Success',
                messege:ans
            })
        }
        catch(err)
        {
            res.status(500).json({
                status:'Error',
                messege:'Error'+err
            })
        }
        }
}