module.exports = function makeGetAllCategoriesUseCase({
    
}){
    return async function getAllCategories() {
        // console.info(`Inside get categories use case`);


              let url = "https://api.bigcommerce.com/stores/fex8vaorav/v3/catalog/trees/categories";
          
              let options = {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "X-Auth-Token": "mtv0gmm8dgttwfac4sb9snps067aiea",
                },
              };
          
              const response = await fetch(url, options);
              const result = await response.json();
              return result;
            
          
    }
}