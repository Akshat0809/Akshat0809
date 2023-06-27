const {OAuth2Client} = require("google-auth-library");

const CronJob = require('cron').CronJob;
// const { Kafka } = require('kafkajs');
const { users } = require('../use-cases/index');

const updateUserAccesToken = users.updateUserAccesToken

const getAllRelatedUser = users.getAllRelatedUser
const databasename = "emailclient";

const CLIENT_ID = '726764844144-b4hfsg9ir35ccvsc0ns5gd4up7aqh9sc.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = "http://localhost:8000/auth/google/callback";
    
    const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET,REDIRECT_URI);

function runCron()
{
    const job = new CronJob('*/10 * * * * *',async function() 
    {
        console.log("inside crown");
        const current_time=new Date().getTime();
        let relatedusers = await getAllRelatedUser({current_time,databasename});
        
        // await runProducer({relatedusers});
        console.log('Running a task every 10 seconds:',JSON.stringify({relatedusers}));
        


        for(let user of relatedusers)
                {
                    const access_token = user.access_token;
                    console.log("user",user);
                    console.log("access_token",access_token)
                    const REFRESH_TOKEN= user.refresh_token;
                    console.log("token is refreshed",REFRESH_TOKEN);
                    const { tokens } =  await client.refreshToken(REFRESH_TOKEN);
                    console.log("Token",tokens);
                    console.log("New acces token : ",tokens.access_token);
                    const updaterow = await updateUserAccesToken({user_id:user.user_id,access_Token:tokens.access_token,expiry_date:tokens.expiry_date,databasename:"emailclient"})
                 
                }        
    });
    
    job.start();
}

// async function runProducer({relatedusers})
// {
//     const kafka = new Kafka({
//         clientId:'user-update-acces-token-producer',
//         brokers:['localhost:9092']
//     })
    // const producer = kafka.producer();
    
    // await producer.connect();
    // await producer.send({
    //     topic: 'AccessToken',
    //     messages: [
    //         {
    //             value:JSON.stringify({relatedusers})
    //         }
    //     ]
    // })
// }


runCron();


