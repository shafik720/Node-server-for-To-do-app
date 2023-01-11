
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());



const uri = "mongodb+srv://genius_car:AFpsnZTMmFrRqe3m@cluster0.0ihcm8w.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db('todo_app').collection('task_list');

        app.post('/addTask', async(req, res)=>{
            const doc = req.body;
            const result = await userCollection.insertOne(doc);
            res.send(result);
        })
        
    }
    finally { 

    }
}

run().catch(console.dir);


app.get('/', (req, res)=>{
    const user = req.body;
    res.send(user);
})

app.listen(port,()=>{
    console.log('listening to port 5000');
})