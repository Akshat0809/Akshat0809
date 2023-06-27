module.exports = function makeGetName({

    
}) {
    return async function getName() {
       let ans;
       console.log("inside get name of folder id 3");
    
       const accessToken = "305f2f10-05c3-11ee-8e67-6d6669354778-399c1c1c-8324-4e8a-9ded-bcfdddda39c7";
       const apiUrl = "https://test.salesmate.io/apis/v1/emailTemplates";
    

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
        //    for(let i = 0;i<data.length;i++){
        //     console.log('name inside test',data[i].name);
        //    }
           

         
    }
    catch(err){
             console.log(err);
    }

    return ans;
}
} 