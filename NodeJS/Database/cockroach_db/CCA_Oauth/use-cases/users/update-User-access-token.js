module.exports = function makeupdateUserAccesToken({
    updateDbUserAccesToken
})
{
    return async function updateUserAccesToken( { user_id,access_Token,expiry_date,databasename } )
    {
        console.log("We are in the use case",user_id,access_Token);
        return await updateDbUserAccesToken({ user_id,access_Token,expiry_date,databasename});
    }
}