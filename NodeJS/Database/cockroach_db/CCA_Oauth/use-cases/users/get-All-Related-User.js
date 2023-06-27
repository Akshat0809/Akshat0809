function makegetAllRelatedUser({
    getAllDbRelatedUser
})
{
    return async function getAllRelatedUser({current_time,databasename})
    {
       const result = await getAllDbRelatedUser({current_time,databasename});
       console.log([result]);
       return result;
    }
}

module.exports = makegetAllRelatedUser;