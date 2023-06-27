// console.log("folder data index index.js")

const folder_table="folder";
function makeFolderDbMethods({connection}){
    return Object.freeze({
        updateFolder,
        deleteFolder,
        getFolderById,
        createFolder,
        folderExists,
        updatelabel,
        updateid
    })
    
    async function folderExists(id,name){
        console.log("Folder existence check");
        try{
            console.log('near query',name);
            const result = await connection.query(`select count(*) as row from emailclient.folder where user_id=$1 and name=$2`, [id, name]);
            console.log(result.rows[0].row);
            return (result.rows[0].row);
}
        catch(err)
        {
            throw err;
        }
    }    
    async function createFolder(database_name,obj){ 
        console.log("Create folder data access");
        try{
            await connection.query(`INSERT INTO emailclient.${folder_table} (name,id) VALUES ($1,$2);`, [obj.name,obj.id]);
            console.log("Folder Created");
        }
        catch(err)
        {
            throw err;
        }
    }    
    async function getFolderById(database_name,obj){
        try{
            const [result] = await connection.query(`select name from ${database_name}.${folder_table} where id=? ;`,[obj]);
            // console.log(result)
            return result;
        }
        catch(err)
        {
            throw err;
        }
    }

async function updateFolder(database_name,obj){
    console.log("update folder");
    console.log(obj);
    try{
        await connection.query(`update ${database_name}.${folder_table} set name = ? where folder_id=?`, [obj.name,obj.id]);
        console.log("Folder updated");
    }
    catch(err)
    {
        console.log(err);
    }
}    
async function deleteFolder(datbase_name,body){
    console.log("delete folder");
    console.log(body);
    try{
        const result = await connection.query(`DELETE FROM ${database_name}.${folder_table} WHERE folder_id = ?;`,[body.id]);
        console.log(result);
        return result;
    }
    catch(err)
    {
        console.log(err);
    }
}

async function updatelabel(folderproviderId, folderNames, id,i) {
    console.log("inside data-access", folderproviderId, folderNames, id,i);
    const foldernames = folderNames;
    const folderproviderid = folderproviderId;
    try {
      const result = await connection.query(`INSERT INTO emailclient.folder (name,user_id,providerid,priority) VALUES ($1,$2,$3,$4);`, [foldernames, id, folderproviderid,i])
          .then((result) => {
            console.log('Insert successful!');
            return result;
          })
          .catch((error) => {
            console.error('Insert failed:', error);
          });
    }
    catch (err) {
      console.log(err);
    }
  }
  

  async function updateid(providerid,name,id){
    console.log("inside update id",providerid,name,id);
    try{
        await connection.query(`update emailclient.folder set providerid = $1 where name=$2`, [providerid,name]);
        console.log("providerid updated");
    }
    catch(err)
    {
        console.log(err);
    }
}    

}
module.exports =  makeFolderDbMethods;