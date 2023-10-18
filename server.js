//conectar a mongo express y body

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5555 ;

//Mongodb
mongoose.connect("mongodb+srv://user1:<12345>@mydatabase1.xm0aoya.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser:true});
const db = mongoose.connection;

const User = mongoose.model("User",{
    name:String,
    email:String,
});

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
});


//envio del form
app.post("/add", async(req,res)=>{
    const {name, email} = req.body;

    const newUser = new User({name,email});

    try{
        await newUser.save();
        console.log("Usuario agregado");
        res.redirect("/");
    } catch(err) {
        console.error("Error al insertar el documento:", err);
        res.status(500).send("Error agregando usuario");
    }
});

//start

app.listen(port,()=>{
    console.log('Server is running on port '+port);
});