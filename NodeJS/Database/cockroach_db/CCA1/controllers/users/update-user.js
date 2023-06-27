module.exports = function makeUpdateUserController({
    Joi,
    updateUser,
}) {
    return async function updateUserController(req, res){

        console.info(`In update user controller`, req.params,req.body);
        try{
            const database_name  = req.headers['database_name'];
            validInput({
                name:req.body.name,
            });

            const data ={
                id:req.params.id,
                name:req.body.name
            }
            await updateUser(database_name,{
                id:req.params.id,
                name:req.body.name
            });
            res.status(201).json({
                status:'Success',
                messege:'User updated'
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
        function validInput({name})
        {
            const schema = Joi.object({
            name: Joi.string().required(),
            })
            const {error}=schema.validate({name});
            if(error)
            {
                console.log(error);
                throw error;
            }
        }
      }