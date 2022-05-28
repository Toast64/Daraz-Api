const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');
const port = 8686;

app.use(cors()); 
app.options('*', cors()); // this enables preflight
app.use(express.json());
app.use(express.urlencoded());

let datas


async function main() {
    // we'll add code here soon
    const uri = "mongodb+srv://PersonalTesting:jJOco6DldCjM8jA0@cluster0.znnzse5.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect(async (err, db) => {
            if (err) {
                console.log("cant connect db", err);
                return
            } else {
                console.log("Connected to MongoDB!");
                const collection = await db.db("DarazData").collection("DataCategory").findOne({});
                datas = collection
            }
        });


    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

main().catch(console.error);



app.get('/getdata', (req, res) => {
    console.log("datagotcalled")
    res.json(datas)
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});