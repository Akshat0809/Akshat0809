function makeProductDbMethods({connection}){
    return Object.freeze({
        createOrder,
        checkOrderid
              
    })
    async function createOrder(id){
        console.log('welcome to db',id);
        try{
            const ans = await connection.query(`INSERT INTO orderId (orderId) VALUES (?);`, [id]);
            console.log("orderId succesfull stored");
             
        }
        catch(err)
        {
            throw err;
        }
    }  

    async function checkOrderid(){
        const ans = await connection.query(`select max(orderId) as max_value from orderId;`);
        return (ans[0][0].max_value);
    }
}
    module.exports =  makeProductDbMethods;