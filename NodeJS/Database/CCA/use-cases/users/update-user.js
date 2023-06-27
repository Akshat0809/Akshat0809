module.exports = function makeCreateUserUseCase({
    usersDb,
}){
    return async function updateUserUsecase(data) {
        console.info(`Inside update user use case`);
            await usersDb.updateUser(data);
    }
}