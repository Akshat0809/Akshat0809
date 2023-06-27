module.exports = function makeFindEmailUserUseCase({
    usersDb,
}){
    return async function Emailexist({email}){
        console.log(email);
        const ans = await usersDb.Emailexist({email});
        return ans;
    }
}