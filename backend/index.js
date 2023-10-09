const express = require('express');
require('dotenv').config();
const initApp = require('./src/app')

const app = express();
const PORT = process.env.PORT;
const SECRET = process.env.SESSION_SECRET;


initApp(express, app);

app.listen(PORT, (err) => {
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
});

