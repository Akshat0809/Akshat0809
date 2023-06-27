// console.log("user use case index.js")
const users_table="users";
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


    async function createUser({name,password,email,access_token,refresh_token,expiry_date}){
        console.log("Create user");
        try{
            console.log("Data-access:",name,password,email,access_token,refresh_token,expiry_date)
            // const result = connection.query(`INSERT INTO emailclient."${users_table}" ("name", "password", "email", "access_Token", "refresh_Token", "expiry_date") VALUES ($1, $2, $3, $4, $5, $6);`, [name,password,email,access_token,refresh_token,expiry_date])
            // .then((result) => {
            // console.log('Insert successful!');
            // return result;
            // })
            // .catch((error) => {
            // console.error('Insert failed:', error);
            // });

        }
        catch(err)
        {
            throw err;
        }
    }    

    async function showUser(database_name){
        console.log(" inside Show user data access");
        try{

        const [insertQuery] = `select * from ${database_name}.${users_table};`;

            connection.query([insertQuery])
            .then((result) => {
            console.log('list comes successfully!',[result]);
            return [result];
            })
            .catch((error) => {
            console.error('list failed:', error);
            });


        }
        catch(err)
        {
            console.log("error in data access");
            throw err;
        }
        
    }
    async function deleteUser(database_name,id){
        console.log("id inside data access",id);
        console.log("delete user");
        try{
            const [result] = await connection.query(`DELETE FROM ${database_name}.${users_table} WHERE id = ?;`,id);
            console.log(result)
            return result;
        }
        catch(err)
        {
            throw err;
        }
    }
    async function updateUser(database_name,obj){
        console.log("update user");
        console.log(obj);
        try{
            const [result] = await connection.query(`update ${database_name}.${users_table} set username = ? where id=?`, [obj.name,obj.id]);
            console.log("User updated");
            return (result.affectedrows);
        }
        catch(err)
        {
            throw err;
        }
    }    
    async function getUserById(database_name,id){
        try{
            console.log("Inside data access",id);
            const [result] = await connection.query(`select * from ${database_name}.${users_table} where id=?;`,[id]);
            console.log(result);
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
            console.log(email,'in db');
            // const result = await connection.query(`select count(*) as row from ${users_table} where email_address=?`,[email]);
            // const result = await connection.query(`select count(*) as row from ${users_table} where email_address=?`,[email]);
            // console.log("Inside data Access to check mail id");
            // console.log(result[0][0].row);
            // return (result[0][0].row);
            return 0;
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