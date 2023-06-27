function makeProductDbMethods({connection}){
    return Object.freeze({
        createproducte
              
    })
    async function createproducte(product_id,created,obj){
        // console.log("Create user",product_id,created,obj['Product Name']);
        // try{
        //     if(product_id > 0){
        //     const ans = await connection.query(`INSERT INTO product_details (product_id, created, sku, FulfillmentPartnerCode, ManufacturerPartNumber, LeadTime) VALUES (?, ?, ?, ?, ?, ?);`, [product_id, created, obj.SKU, obj.FulfillmentPartnerCode, obj.ManufacturerPartNumber, obj.LeadTime]);
        //     console.log("Product stored Created");
        //     }
        //     else{
        //         const ans = await connection.query(`INSERT INTO product_details (created, sku, FulfillmentPartnerCode, ManufacturerPartNumber, LeadTime , error) VALUES (?, ?, ?, ?, ?, ?);`, [created, obj.SKU, obj.FulfillmentPartnerCode, obj.ManufacturerPartNumber, obj.LeadTime,product_id]);
        //     console.log("Product stored Created");
        //     }
             
        // }
        // catch(err)
        // {
        //     throw err;
        // }
    }  




}
    module.exports =  makeProductDbMethods;