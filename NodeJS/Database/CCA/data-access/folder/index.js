// console.log("folder data index index.js")

const folder_table="folders";
function makeFolderDbMethods({connection}){
    return Object.freeze({
        updateFolder,
        deleteFolder,
        getFolderById,
        createFolder,
        folderExists,
    })
    
    async function folderExists({id,name}){
        console.log("Folder existence check");
        try{
            const [result]=await connection.query(`select count(*) as row from ${folder_table} where id=? and name=?`,[id,name]);
            console.log(result[0].row);
            return (result[0].row);
        }
        catch(err)
        {
            throw err;
        }
    }    
    async function createFolder(obj){
        console.log("Create folder data access");
        try{
            await connection.query(`INSERT INTO ${folder_table} (name,id) VALUES (?,?);`, [obj.name,obj.id]);
            console.log("Folder Created");
        }
        catch(err)
        {
            throw err;
        }
    }    
    async function getFolderById(obj){
        try{
            const [result] = await connection.query(`select name from ${folder_table} where id=? ;`,[obj]);
            // console.log(result)
            return result;
        }
        catch(err)
        {
            throw err;
        }
    }

async function updateFolder(obj){
    console.log("update folder");
    console.log(obj);
    try{
        await connection.query(`update ${folder_table} set name = ? where folder_id=?`, [obj.name,obj.id]);
        console.log("Folder updated");
    }
    catch(err)
    {
        console.log(err);
    }
}    
async function deleteFolder(body){
    console.log("delete folder");
    console.log(body);
    try{
        const result = await connection.query(`DELETE FROM ${folder_table} WHERE folder_id = ?;`,[body.id]);
        console.log(result)
        return result;
    }
    catch(err)
    {
        console.log(err);
    }
}
}
module.exports =  makeFolderDbMethods;