module.exports = function makeGetBody({

    
}) {
    return async function getBodySumit(id) {
       let ans;
       console.log("inside get Body");
    
       const accessToken = "80cae010-0600-11ee-906c-039cf6e6ca22-1ea325c3-e547-43e5-8b08-bd49045379a9";
       const apiUrl = `https://sumit.salesmate.io/apis/v1/emailTemplates/${id}`;
    

       try {
           const response = await fetch(apiUrl, {
               headers: {
                   "accesstoken": accessToken
               }
           });

           if (!response.ok) {
               throw new Error("Request failed with status code: " + response.status);
           }

           let data = await response.json();
           ans = data.Data;
          
           

         
    }
    catch(err){
             console.log(err);
    }

    return ans;
}
} 