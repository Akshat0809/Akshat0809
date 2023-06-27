module.exports = function makeCreateCsvUseCase({

}) {
    return async function createCsvFile(orderData, productData) {
        console.info("Inside create csv use case");

        // console.log('sku',productData.sku,'product price',productData.base_price,'lineitemnumber',productData.id);
        // console.log('orderData date',orderData.id,
        // orderData.date_created,
        // orderData.billing_address.first_name,
        // orderData.billing_address.last_name,
        // orderData.billing_address.street_1+orderData.billing_address.street_2,
        // orderData.billing_address.city,
        // orderData.billing_address.zip,
        // orderData.billing_address.country,
        // orderData.billing_address.phone,
        // orderData.items_total,
        // orderData.customer_message);  



        const fs = require('fs');

        const convertToCSV = (data) => {
            const values = Object.values(data);
            const csvRow = values.map((value) => `"${value}"`).join(',');
            return csvRow;
        };

        const appendToCSV = (filePath, data) => {
            const csvRow = convertToCSV(data);
            fs.appendFileSync(filePath, csvRow + '\n');
        };

        const filePath = 'orderDetails.csv';

        if (!fs.existsSync(filePath)) {
            const header = 'FulfillmentPartnerCode,OrderNumber,OrderDate,CustomerPO,CustomerTag,CustomerProject,ShippingFirstName,ShippingLastName,ShippingAddress1,ShippingAddress2,ShippingCity,ShippingState,ShippingZip,ShippingCountry,ShippingPhone,LineItemNumber,Quantity,SKU,ManufacturerPartNumber,Cost,Notes\n';
            fs.writeFileSync(filePath, header);
        }

        appendToCSV(filePath, {
            FulfillmentPartnerCode:'CBG',
            OrderNumber:orderData.id,
            OrderDate: orderData.date_created,
            CustomerPO:'',
            CustomerTag:'',
            CustomerProject:'',
            ShippingFirstName: orderData.billing_address.first_name,
            ShippingLastName: orderData.billing_address.last_name,
            ShippingAddress1: orderData.billing_address.street_1 + orderData.billing_address.street_2,
            ShippingAddress2:'',
            ShippingCity:orderData.billing_address.city,
            ShippingState:orderData.billing_address.state,
            ShippingZip: orderData.billing_address.zip,
            ShippingCountry:orderData.billing_address.country,
            ShippingPhone: orderData.billing_address.phone,
            LineItemNumber: productData.id,
            Quantity: orderData.items_total,
            SKU: productData.sku,
            ManufacturerPartNumber:'950-WLT-BILL-1',
            Cost: productData.base_price,
            Notes: orderData.customer_message
        });

        console.log('Data appended to the CSV file.');


    };
};
