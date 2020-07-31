/*// const { google } = require('googleapis');
// require('dotenv').config();

//create google auth object

const createConnection = () => {
    return new google.auth.OAuth2({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_KEY,
        redirectUri: process.env.GOOGLE_REDIRECT_URL
    });
    //return auth;
};

//sets the scope what the request need from google
const defaultScopes = [
    "https://www.googleapis.com/auth/plus.me",
    "https//www.googleapis.com/auth/userinfo.profile",
    "https//www.googleapis.com/auth/userinfo.email",
];

// get the url connection to google sign in

const getUrlConnection = (auth) => {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
        scope: defaultScopes
    });
}

//get google login url

const googleUrl = () => {
    const auth = createConnection();
    const url = getUrlConnection(auth);
    console.log(url);
    return url;
}


module.exports = googleUrl;*/