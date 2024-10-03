const express=require('express');
const app=express();

const cors=require('cors');

const corsOptions={
    origin:'http://localhost:5000/candidates',
    methods: "GET,POST,PATCH,PUT,DELETE,HEAD",
    credentials:true
}

app.use(cors(corsOptions));

// establishing database connection
const db=require('./db');

// Body Parser used to extract body from POST request by client
const bodyParser=require('body-parser');
app.use(bodyParser.json());

require('dotenv').config();

const userroutes=require('./routes/userroutes');
app.use('/api/user',userroutes);

const adminroutes=require('./routes/adminroutes');
app.use('/api/candidates',adminroutes);

const voterroutes=require('./routes/voterroutes');
app.use('/api/vote',voterroutes);

PORT_NO=process.env.PORT || 3000;

app.listen(PORT_NO,()=>{
    console.log("Server running at port 3000!")
})

