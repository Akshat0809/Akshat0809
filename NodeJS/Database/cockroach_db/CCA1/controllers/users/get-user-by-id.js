module.exports = function makeGetUserByIdController({
    Joi,
    getUserById,
}) {
    return async function getUserByIdController(req, res){
        // const id=req.params.id;
        // console.info(`In get user by id controller`, id);
        try{
            const database_name  = req.headers['database_name'];
            const id=req.params.id;
            console.log("inside controller",id);
            const [result] = await getUserById(database_name,id);
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