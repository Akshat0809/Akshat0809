module.exports = function makeGetUserByIdController({
    Joi,
    getUserById,
}) {
    return async function getUserByIdController(req, res){
        console.info(`In get user by id controller`, req.params);
        try{
            const id=req.params.id;
            const [result] = await getUserById(id);
            console.log("This is from controller");
            console.log([result]);
            res.status(201).json({
                status:'Success',
                messege: result
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