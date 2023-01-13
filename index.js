
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());



const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASSWORD}@cluster0.0ihcm8w.mongodb.net/?retryWrites=true&w=majority`;
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
        
        app.get('/alltasks', async(req,res)=>{
            const query = {};
            const cursor = userCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.delete('/alltasks/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id :ObjectId(id)}
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

        app.delete('/alltasks', async(req, res)=>{
            
            // const ids = req.body.ids;
            const ids = req.body.ids.map(ObjectId);

            // const query = {_id :ObjectId(ids)} ;
            // const result = await userCollection.deleteMany(query);

            // const result = await userCollection.deleteMany({_id: {$in:ids}});

            const result = await userCollection.deleteMany({ _id: { $in: ids } });
            // res.send(result);
            res.json(result);            
        })

        app.put('/alltasks/:id', async(req, res)=>{
            const id = req.params.id;
            const action = req.body;
            const filter = {_id : ObjectId(id)};
            const options = { upsert: true };
            const updatedDoc = {
                $set : {
                    action : action.action
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

        app.get('/alltasks/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result);
        })
    }
    finally { 

    }
}

run().catch(console.dir);



app.listen(port,()=>{
    console.log('listening to port 5000');
})