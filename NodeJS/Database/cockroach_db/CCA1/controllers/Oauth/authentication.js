function makeAuthenticationAction({
    createUser,
    client,
    findId,
    defaultFolders
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
            console.log("Token is available",tokens);
            console.log("REFRESH_TOKEN is available",tokens.refresh_token);

      
            client.setCredentials(tokens);
            
            const { data } = await client.request({
                url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
                method: "GET",
            });
           

            const  databasename = "emailclient";
            console.log("in oauth");
            if(tokens.refresh_token)
            {
                const results= await createUser({
                    name:data.name,
                    email:data.email,
                    access_token:tokens.access_token,
                    refresh_token:tokens.refresh_token,
                    expiry_date:tokens.expiry_date,
                    password:'nullify',
                    databasename
                });
                const id = await findId({ email: req.body.email });
                console.log("controller id is", id);
                console.log(typeof(id));
               const rus = await defaultFolders({ id });
               console.log(rus);
            }
            else{
                await updateUserAccesToken({})
            }
            
            
            
          
        } 
        catch (error) {
          console.error(error);
          res.status(500).send("Server error");
        }
    }
}
    
module.exports = makeAuthenticationAction;