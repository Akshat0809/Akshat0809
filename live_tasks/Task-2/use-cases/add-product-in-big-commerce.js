module.exports = function makeAddCategoryInBigCommerceUseCase({
    
}){
    return async function addCategoryInBigCommerce({body}) {
        // console.info(`Inside add product in big-Commerce use case`,body);

        let url = "https://api.bigcommerce.com/stores/fex8vaorav/v3/catalog/categories";
          
              let options = {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "X-Auth-Token": "mtv0gmm8dgttwfac4sb9snps067aiea",
                },
                body: JSON.stringify(body),
              };
          
              const response = await fetch(url, options);
              const createCategoryResult = await response.json();
              if (!createCategoryResult.errors) {
                  console.log("category created in create add category in big commere.js file");
                }
            // console.log("inside add big commerce",createCategoryResult);
            
          
    }
}