module.exports = function makeFindEmailUserUseCase({
    usersDb,
}){
    return async function Emailexist({email}){
        console.log(email,'in use case');
        const ans = await usersDb.Emailexist({email});
        return ans;
    }
}