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
        validId,
        updateDbUserAccesToken,
        getAllDbRelatedUser
    })


    async function createUser({name,password,email,access_token,refresh_token,expiry_date}){
        console.log("Create user");
        try{
            console.log("Data-access:",name,password,email,access_token,refresh_token,expiry_date)
            const result = connection.query(`INSERT INTO emailclient."${users_table}" ("name", "password", "email", "access_token", "refresh_token", "expiry_date") VALUES ($1, $2, $3, $4, $5, $6);`, [name,password,email,access_token,refresh_token,expiry_date])
            .then((result) => {
            console.log('Insert successful!');
            return result;
            })
            .catch((error) => {
            console.error('Insert failed:', error);
            });

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

    async function defaultFolders(user_id){
        console.log("Inside default folder data-access");
        const folders = ['inbox','outbox','trash','archieve'];
        try{
        // for(let i in folders){
        //     const result = await connection.query(
        //         `insert into emailclient.folder (name,user_id,priority) values ($1,$2,$3)`,[folders[i],user_id,i+1]
        //     );
        // }
        for(let i=0;i<folders.length;i++){
            const result = await connection.query(
                `insert into emailclient.folder (name,user_id,priority) values ($1,$2,$3)`,[folders[i],user_id,i+1]
            );
        }
    }
        catch(err){
            console.log(err)
    }
    }


    

    async function findId(email){
        console.log("FindIdDb in data-access");
        console.log("in data access",email,typeof(email));
        try{
            // Prepare the statement
            const stmt = await connection.query(`SELECT user_id FROM emailclient.${users_table} WHERE email=$1`,[email]);
            console.log(stmt.rows[0].user_id);
            return(stmt.rows[0].user_id);
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

    async function updateDbUserAccesToken({ user_id,access_Token,expiry_date,databasename })
    {
        console.log("AT AccesToken data access:", user_id,access_Token,expiry_date,databasename );
        const result = await connection.query( `update emailclient.users set(access_token,expiry_date) = ($1,$2) where user_id=$3`,[access_Token,expiry_date,user_id]) ;
        console.log("RESULT",result);
        return result;
    }

    async function getAllDbRelatedUser({current_time,databasename})
    {
        const result=await connection.query( `select * from emailclient.users where expiry_date-${current_time}>=60000;`); //1800000
        return result.rows;
    }

}
module.exports =  makeUserDbMethods;