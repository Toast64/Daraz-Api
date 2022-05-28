const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
var request = require('request');
require('dotenv').config();
const apiuri = process.env.APIU
const cors = require('cors');
const port = 8686;
var jsonformat = {};

async function main() {
    // we'll add code here soon
    const uri = "mongodb+srv://PersonalTesting:jJOco6DldCjM8jA0@cluster0.znnzse5.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect((err, db) => {
            if (err) {
                console.log("cant connect db", err);
                return
            } else {
                console.log("Connected to MongoDB!");
                const collection = db.db("DarazData").collection("DataCategory");
                
                collection.insertOne({jsonformat})
            }

        });


    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

const getDarazData = (req, res) => {
    request.get(apiuri, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonformat = response.body;
            // console.log(body)
        } else {
            console.log("error", error);
        }
    })
}
// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

getDarazData()
setTimeout(() => {
    main().catch(console.error);
}, 5000);




app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});