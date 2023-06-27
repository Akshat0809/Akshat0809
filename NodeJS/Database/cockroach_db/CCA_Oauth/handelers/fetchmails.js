const {google} = require('googleapis');
const {OAuth2} = google.auth;

async function getMessages() {
  const oAuth2Client = new OAuth2(
    '726764844144-b4hfsg9ir35ccvsc0ns5gd4up7aqh9sc.apps.googleusercontent.com',
    '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',
    "http://localhost:8000/auth/google/callback"
  );

  oAuth2Client.setCredentials({
    access_token: 'ya29.a0AWY7CkmtLwL3Q6gXDaTFH8gbxy79tXhQPr9iivUSbfY3meELypmywMoYQbNuK9dBMBy_r0dcaWFKf5Zuqg3Hk2cNiXOg6N3xhnifPmiWsN1Stb2UPTwv1T-KvERO7fdVUG-aOI5Jnd74ypeZZ51mx3zlgtItaCgYKAbASARMSFQG1tDrp3c-77dgOF0_ueGKlvYaIrA0163',
    refresh_token: '1//0gwOgkWodBUjICgYIARAAGBASNwF-L9IrXEFh8GDhB6SlvStSiAxAwj3pRSnqbjG1CkS1B7LUEnHCte3ZKpuV1mBQLWIdOAUeykM'
  });

  const gmail = google.gmail({version: 'v1', auth: oAuth2Client});

  const response = await gmail.users.messages.list({
    userId: 'me',
    maxResults: 10 // number of messages to retrieve
  });

  const messages = response.data.messages;

  for (let i = 0; i < messages.length; i++) {
    const message = await gmail.users.messages.get({
      userId: 'me',
      id: messages[i].id,
      format: 'minimal'

    });
    console.log("in fetchmails",message);
  }
}

getMessages();
