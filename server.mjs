import express from "express";
import dialogflow from '@google-cloud/dialogflow';
import gcHelper from "google-credentials-helper"
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';


const app = express();

app.use(cors())
app.use(express.json())
dotenv.config()

gcHelper();


const PORT = process.env.PORT || 4000;


const PROJECID = "testing-mvgr"

// Create a new session
const sessionClient = new dialogflow.SessionsClient();


// Detect intent method
const detectIntent = async (languageCode, queryText, sessionId) => {

    const sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: queryText,
                languageCode: languageCode,
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult.fulfillmentText;
    return result
}

// Dialogflow route
app.post('/dialogflow', async (req, res) => {
    let languageCode = "en-US";
    let queryText = req.body.text;
    let sessionId = uuidv4();
    let data = await detectIntent(languageCode, queryText, sessionId);
    console.log(data);
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});