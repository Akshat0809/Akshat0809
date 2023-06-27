module.exports = function makeCreateUserUseCase({
    usersDb,
}){
    return async function showUserUsecase(database_name) {
        try{
            console.log("under use case");
            const users=await usersDb.showUser(database_name);
            console.log("show user under use case")
            return users;
        }
        catch(err)
        {
            console.log(err);
            throw err;
        }
    };
};