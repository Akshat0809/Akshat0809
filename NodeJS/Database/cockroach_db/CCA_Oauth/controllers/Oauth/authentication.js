function makeAuthenticationAction({
    createUser,
    client,
    findId,
    defaultFolders,
    updateUserAccesToken,
    axios,
}) {
    return Object.freeze({
        googleAuthLogin,
        googleAuthCallback
    })
    function googleAuthLogin(req, res) {
        try {
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
    async function googleAuthCallback(req, res) {
        if (!req.query || !req.query.code) {
            return res.status(400).json({ error: 'Code not found in request query' });
        }

        const { code } = req.query;

        try {
            const { tokens } = await client.getToken(code);
            console.log("Token is available", tokens);
            console.log("REFRESH_TOKEN is available", tokens.refresh_token);


            client.setCredentials(tokens);

            const { data } = await client.request({
                url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
                method: "GET",
            });


            const databasename = "emailclient";
            // console.log("in oauth");
            if (tokens.refresh_token) {
                const results = await createUser({
                    name: data.name,
                    email: data.email,
                    access_token: tokens.access_token,
                    refresh_token: tokens.refresh_token,
                    expiry_date: tokens.expiry_date,
                    password: 'nullify',
                    databasename
                });
                const email = data.email;
                // console.log("oauth",email);
                const user_id = await findId(email);
                //  console.log("user id in controlller",user_id);
                const folder = await defaultFolders({ user_id });



                const access_token = tokens.access_token;
                console.log("access token is coming", access_token);
        
                const url=`https://gmail.googleapis.com/gmail/v1/users/me/labels`;
                const urls = `https://www.googleapis.com/auth/gmail.labels`;
                const response = await axios.get(url,{
                    headers: { Authorization: `Bearer ${access_token}` },
                });
                
                const folders = response.data.labels;
                const { Kafka } = require('kafkajs');
                const kafka = new Kafka({
                    clientId : "fetch_label",
                    brokers:['localhost:9092']
                })
                const producer = kafka.producer();
                await producer.connect();
                await producer.send({
                    topic:'fetchlabel',
                    messages:[
                        {
                            value:JSON.stringify({folders,user_id})
                        }
                    ]
                })
}
            else {
                console.log("Now we are refreshing the TOOKKEENN");
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