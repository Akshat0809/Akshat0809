function makeAuthenticationAction({
    createUser,
    client,
    updateUserAccesToken
}){
    return Object.freeze({
        googleAuthLogin,
        googleAuthCallback
    })
    
    function googleAuthLogin(req,res)
    {
        try 
        {
            const authUrl = client.generateAuthUrl({
              access_type: "offline",
              scope: [
                "email",
                "profile",
                "https://mail.google.com/",
                "https://www.googleapis.com/auth/gmail.send",
                "https://www.googleapis.com/auth/gmail.readonly",
                "https://www.googleapis.com/auth/gmail.compose",
                "https://www.googleapis.com/auth/gmail.modify",
                "https://www.googleapis.com/auth/gmail.metadata",
              ],
            });
            console.log(authUrl);
            res.redirect(authUrl);
        } 
        catch (error) {
            return res.status(400).json({ error: error });
        }
    }
    async function googleAuthCallback(req,res)
    {
        const { code } = req.query;

        try {
            const { tokens } = await client.getToken(code);
            console.log("TOKENNNNNNNNNNNNNNNN",tokens);
            console.log("REFRESH_TOKENNNNNNNNNNNNNNNN",tokens.refresh_token);

      
            client.setCredentials(tokens);
            
            const { data } = await client.request({
                url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
                method: "GET",
            });
            console.log("Google data receivedddddddddddddddd : ", data);

            const  databasename = "emailclientcockroachdb";
            if(tokens.refresh_token)
            {
                const results= await createUser({
                    uname:data.name,
                    email:data.email,
                    access_token:tokens.access_token,
                    refresh_token:tokens.refresh_token,
                    expiry_date:tokens.expiry_date,
                    databasename
                });
                
                await fetchGmailFolder({userid:results[0].userid,ACCESS_TOKEN:tokens.access_token,REFRESH_TOKEN:tokens.refresh_token,});
            }
            else{
                await updateUserAccesToken({})
            }
            
            
            await fetchmails({userid:'123',ACCESS_TOKEN:tokens.access_token});
            
            res.redirect("/");
        } 
        catch (error) {
          console.error(error);
          res.status(500).send("Server error");
        }
    }
}
    
module.exports = makeAuthenticationAction;