const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
app.use(express.urlencoded());
app.use(express.json());

// connect mongoose with database
mongoose.connect('mongodb://127.0.0.1:27017/Todos',{useUnifiedTopology:true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once("open", function() {
    console.log("connection successfully");
})


// create schema for database
const MySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    }
})

// create model for database
const myModel = mongoose.model('task', MySchema);

// create server 
app.listen(PORT, (error)=>{
    if (error){
        console.log(error);
    }else{
        console.log('listening on port ' + PORT);
    }
})

// create route
app.get("/title", (req, res)=>{
    myModel.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    });
})


app.get("/iscompleted", (req, res)=>{
    myModel.find({completed: false})
    .then((result)=>{
        res.send(result);
        console.log(result);
    })
    .catch((error)=>{
        res.send(error);
    })
})

// create data

app.post("/create", (req, res)=>{
    myModel.create(req.body)
    .then((result)=>{
        res.send(result);
        console.log("created")
    })
    .catch((error)=>{
        res.send(error);
    })
})

// update data

app.put("/update/:id", (req, res)=>{
    myModel.updateOne({_id: req.params.id},{title: req.body.title, completed: req.body.completed})
    .then((result)=>{
        res.send(true);
    })
    .catch((error)=>{
        res.send(error);
    })
})

// delete data

app.delete("/delete/:id",(req, res)=>{
    myModel.deleteOne({_id: req.params.id})
    .then((result)=>{
        res.send(true);
    })
    .catch((error)=>{
        res.send(error);
    })
})
