module.exports = function makeValidIdUserUseCase({
    usersDb,
}){
    return async function validId(id){
        console.info("Inside Validid use case coming id is",id);
        const result = await usersDb.validId(id);
        console.log("in use case of validate id",result);
        return result;
    }
}