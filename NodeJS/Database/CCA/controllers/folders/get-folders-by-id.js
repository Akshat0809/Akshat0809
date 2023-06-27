module.exports = function makeGetFolderByIdController({
    Joi,
    getFolderById,
}) {
    return async function getFolderByIdController(req, res){
        console.info(`In get folders by user_id controller`, req.params);
        try{
            const id=req.params.id;
            const ans=await getFolderById(id);
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