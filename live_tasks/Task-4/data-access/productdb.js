function makeProductDbMethods({connection}){
    return Object.freeze({
        createproducte,
        filedetails
              
    })
    async function createproducte(product_id,created,obj,error,file_id){
        console.log("Create user",product_id,created,obj['Product Name'],error,file_id);
        try{
            if(created == 1){
            const ans = await connection.query(`INSERT INTO product_details (product_id,file_id, created, sku, FulfillmentPartnerCode, ManufacturerPartNumber,LeadTime,error) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, [product_id,file_id, created, obj.SKU, obj.FulfillmentPartnerCode, obj.ManufacturerPartNumber, obj.LeadTime,error]);
            console.log("Product stored Created");
            }
            else{
                const ans = await connection.query(`INSERT INTO product_details (product_id,created, sku, FulfillmentPartnerCode, ManufacturerPartNumber,file_id,LeadTime , error) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, [product_id,created, obj.SKU, obj.FulfillmentPartnerCode, obj.ManufacturerPartNumber,file_id, obj.LeadTime,error]);
            console.log("Product stored Created");
            }
             
        }
        catch(err)
        {
            throw err;
        }
    }  

    async function filedetails(name,time){
        console.log("File details",name,time);
        const ans = await connection.query("insert into file_details (name,createdat) values (?,?);",[name,time]);
        console.log("File data stored");
        const [ans2] = await connection.query("select file_id from file_details");
        return (ans2[0].file_id);
    }
}
    module.exports =  makeProductDbMethods;