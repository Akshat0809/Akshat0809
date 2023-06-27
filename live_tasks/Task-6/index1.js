const fetchData = async () => {
    const accessToken = "305f2f10-05c3-11ee-8e67-6d6669354778-399c1c1c-8324-4e8a-9ded-bcfdddda39c7";
    const apiUrl = "https://test.salesmate.io/apis/v1/emailTemplates/?includeArchived=true";
  
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
      data = data.Data;
      let ids = data.map(data => data.id);

      for(let id of ids){
        console.log(id);

      const url = `https://test.salesmate.io/apis/v1/emailTemplates/${id}`;
      const response = await fetch(url, {
        headers: {
          "accesstoken": accessToken
        }
      });

      if (!response.ok) {
        throw new Error("Request failed with status code: " + response.status);
      }

      const data = await response.json();
      console.log(data.Data);
      }

    } catch (error) {
      console.error(error);
    }
  };
  
  fetchData();
  

  
