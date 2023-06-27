module.exports = function makeGetUserByIdController({
    usersDb,
}){
    return async function getUserByIdController(id) {
        console.info(`Inside get user by id use case`);
        const [ans] = await usersDb.getUserById(id);
        return [ans];
    }
}