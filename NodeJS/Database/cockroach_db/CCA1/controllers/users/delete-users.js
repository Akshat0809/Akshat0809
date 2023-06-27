module.exports = function makeDeleteUserController({
    Joi,
    deleteUser,
    validateId
}) {
    return async function deleteUserController(req, res){
        try{
            const database_name  = req.headers['database_name'];
            const id=+(req.params.id);
            const ans=await validateId(id);
            console.log("in controller of validate id ",ans);
            if(ans!==id){
                res.status(201).json({
                    status: "Id does not Exist",
                    messege: "Id does not Exist in users table",
                  }); 
            }
            else{
                console.log("Now we r deleting");
                await deleteUser(database_name,{id});
                res.status(201).json({
                    status:'Success',
                    messege:'User Deleted'
                })
            }
        }
        catch(err)
        {
            res.status(500).json({
                status:'Error',
                messege:'Error in controller'+err
            })
        }
    }
}





