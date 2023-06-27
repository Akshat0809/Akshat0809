module.exports = function makegetAccesToken({
    Kafka,
    OAuth2Client,
    updateUserAccesToken
})
{
    const CLIENT_ID = '726764844144-b4hfsg9ir35ccvsc0ns5gd4up7aqh9sc.apps.googleusercontent.com';
    const CLIENT_SECRET = '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';
    const REDIRECT_URI = "http://localhost:8000/auth/google/callback";
    const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET,REDIRECT_URI);

    return async function getAccessToken()
    {
        databasename='emailclient';
        
        const kafka=new Kafka({
            clientId:'user-update-acces-token-producer',
            brokers:['localhost:9092']
        });
        const consumer = await kafka.consumer({ groupId:'myTokenConsumer' });
        
        await consumer.connect();
        await consumer.subscribe({ topic:'AccessToken', fromBeginning:false});
        
        await consumer.run({
            eachMessage: async({ topic, partition, message }) => {
                console.log("Message consumed at get getAccesToken ::",{
                    partition,
                    offset: message.offset,
                    value: message.value.toString()
                });
                let result = JSON.parse(message.value);
                console.log("result in get access token",result.relatedusers);
                for(let user of result.relatedusers)
                {
                    console.log("user",user);
                    const REFRESH_TOKEN= user.refresh_Token;
                    console.log("token is refreshed",REFRESH_TOKEN);
                    const { tokens } =  await client.refreshToken(REFRESH_TOKEN);
                    console.log("Token",tokens);
                    console.log("New acces token : ",tokens.access_token);
                    const updaterow = await updateUserAccesToken({user_id:user.user_id,access_Token:tokens.access_token,expiry_date:tokens.expiry_date,databasename:"emailclient"})
                 
                }           
            }
        })
    }
}


