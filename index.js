
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/',(req, res)=>{
    const result = req.body;
    res.send(result);
})

app.get('/', (req, res)=>{
    const user = {
        name : 'russell'
    }
    res.send(user);
})

app.listen(port,()=>{
    console.log('listening to port 5000');
})