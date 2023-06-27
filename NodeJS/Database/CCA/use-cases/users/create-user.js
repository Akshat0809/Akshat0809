
module.exports = function makeCreateUserUseCase({
    usersDb,
}){
    return async function createUserUsecase(body) {
        console.info(`Inside create user use case`);
        try{
           await usersDb.createUser(body);
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
}