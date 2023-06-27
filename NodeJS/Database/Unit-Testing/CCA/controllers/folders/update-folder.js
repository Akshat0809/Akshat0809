module.exports = function makeUpdateFolderController({
    Joi,
    updateFolder,
    folderExists
}) {
    return async function updateFolderController(req, res){

        console.info(`In update folder controller`, req.params,req.body);
        try{
            const database_name  = req.headers['database_name'];
            validInput({
                id:req.params.id,
            });
            const data ={
                id:req.params.id,
                name:req.body.name
            }
            const name=req.body.name
            const  id=req.body.id
            const ans=await folderExists({id,name});
            console.log(ans);
            if(ans!==0){
                console.log("Folder Already Exist");
                res.send("Folder Already Exist");
            }
          else{
            await updateFolder(database_name,{
                id:req.params.id,
                name:req.body.name
            });
            res.status(201).json({
                status:'Success',
                messege:'Folder updated'
            })
          }
        }
        catch(err)
        {
            res.status(500).json({
                status:'Error',
                messege:"Error" + err
            })
        }
        }

        function validInput({id})
        {
            const schema = Joi.object({
            id: Joi.number().integer().required(),
            })
            const {error}=schema.validate({id});
            if(error)
            {
                console.log(error);
                throw error;
            }
        }
      }





      