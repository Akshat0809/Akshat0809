module.exports = function makeShowUserController({
    Joi,
    showUser,
}) {
    return async function showUserController(req, res){
        try{
            const database_name  = req.headers['database_name'];
            console.log("get user controller");
            const users=await showUser(database_name);
            console.log("show user under user controller.")
            console.log(users);
            return res.status(200).json({
                status:"success",
                message:users,
            });
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