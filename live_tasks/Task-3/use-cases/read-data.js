module.exports = function makecsvfileUseCase({
  sendMail
}) {
  return async function createcsv() {
    console.log("inside create csv-use case");
    const fs = require('fs');
    const mysql = require('mysql');
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'Akshat08',
      password: 'Binny08@',
      database: 'products'
    });


    const query1 = 'SELECT sku FROM product_details where product_id = 0';
    const query2 = 'SELECT error FROM product_details where product_id = 0';


    connection.query(query1, (error1, results1) => {
      if (error1) {
        console.error('Error retrieving data from the database (query1):', error1);
        connection.end();
        return;
      }

      connection.query(query2, (error2, results2) => {
        if (error2) {
          console.error('Error retrieving data from the database (query2):', error2);
          connection.end();
          return;
        }

        const results = results1.concat(results2);
        console.log(results);

        const skuRows = results.filter(row => row.hasOwnProperty('sku'));
        const skuCount = skuRows.length;
        const headers = ['sku', 'error'];
        let sku;
        let error;
   
        const combinedResults = [];
        for (let i = 0; i < results.length; i += 1) {
          sku = results[i]?.sku || '';
          error = results[i + skuCount]?.error || ' ';
          combinedResults.push({ sku, error });

        }


        const rows = combinedResults.map(row => [row.sku, row.error]);
        const csvData = [headers, ...rows];
        const csvContent = csvData.map(row => row.join(',')).join('\n');
        fs.writeFile('data.csv', csvContent, (error) => {
          if (error) {
            console.error('Error writing data to CSV:', error);
          } else {
            console.log('Data successfully written to data.csv');
          }
        });
      })
    })


    await sendMail();
  }
}