const { OAuth2Client } = require("google-auth-library");
const { google } = require('googleapis');

const { user,folder,email } = require('../../use-cases');
const users = require("../users");

const CLIENT_ID = '726764844144-b4hfsg9ir35ccvsc0ns5gd4up7aqh9sc.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = "http://localhost:3001/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);


// const makefetchGmailFolder=require("./fetchGmailFolder");
// const fetchGmailFolder=makefetchGmailFolder({
//     client,
//     google,
//     createFolder:folder.createFolder,
//     updateFolderProviderId:folder.updateFolderProviderId,
// });

const makeAuthenticationAction=require("./authentication");
const autheticationAction=makeAuthenticationAction({
    client,
    createUser:users.createUser,
});

const authAction = Object.freeze({
    googleAuthLogin:autheticationAction.googleAuthLogin,
    googleAuthCallback:autheticationAction.googleAuthCallback
});

module.exports=authAction;