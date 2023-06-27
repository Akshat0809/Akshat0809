// console.log("user use case index.js")
const users_table="user";
function makeUserDbMethods({connection}){
    return Object.freeze({
        createUser,
        showUser,
        deleteUser,
        getUserById,
        updateUser,
        defaultFolders,
        findId,
        Emailexist,
        validId
    })
    async function createUser(obj){
        console.log("Create user");
        try{
            await connection.query(`INSERT INTO ${users_table} (username,password,email_address) VALUES (?,?,?);`, [obj.name,obj.password,obj.email]);
            console.log("User Created");
        }
        catch(err)
        {
            throw err;
        }
    }    
    async function showUser({}){
        console.log("Show user");
        try{
            const [result] = await connection.query(`select * from ${users_table};`);
        console.log(result)
        return result;
        }
        catch(err)
        {
            throw err;
        }
        
    }
    async function deleteUser(id){
        console.log("delete user");
        try{
            const [result] = await connection.query(`DELETE FROM ${users_table} WHERE id = ?;`,[id]);
            console.log(result)
            return result;
        }
        catch(err)
        {
            throw err;
        }
    }
    async function updateUser(obj){
        console.log("update user");
        console.log(obj);
        try{
            await connection.query(`update user set username = ? where id=?`, [obj.name,obj.id]);
            console.log("User updated");
        }
        catch(err)
        {
            throw err;
        }
    }    
    async function getUserById(obj){
        try{
            const [result] = await connection.query(`select * from ${users_table} where id=?;`,[obj]);
            // console.log([result])
            return [result];
        }
        catch(err)
        {
            throw err;
        }
    }

    async function defaultFolders({id}){
        console.log("Inside default folder data-access");
        const folders = ['inbox','outbox','trash','archieve','trash'];
        try{
        for(let i in folders){
            const [result] = await connection.query(
                `insert into folders (id,name) values (?,?)`,[id,folders[i]]
            );
        }
    }
        catch(err){
            console.log(err)
    }
    }

    async function findId({email}){
        console.log("FindIdDb in data-access");
        console.log({email});
        try{
            const [result] = await connection.query(`select id from ${users_table} where email_address=?`,[email]);
            return (result[0].id);
        }
        catch(err){
            throw (err)
        }
    }

    async function Emailexist({email}){
        
        try{
            const result = await connection.query(`select count(*) as row from ${users_table} where email_address=?`,[email]);
            // console.log("Inside data Access to check mail id");
            console.log(result[0][0].row);
            return (result[0][0].row);
        }
        catch(err)
        {
            throw err;
        }
    } 

    async function validId(id){
        console.log("in data access coming id is",id);
        try{
            const [result] = await connection.query(`select * from ${users_table} where id=?`,[id]);
            console.log("in data access of valid id",result[0].id);
            console.log(typeof(result[0].id));
            // console.log(result[0][0].row);
            // return (result[0][0].row);
            return result[0].id;
        }
        catch(err)
        {
            throw err;
        }
    } 

}
module.exports =  makeUserDbMethods;