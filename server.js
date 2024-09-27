const express=require('express');
const app=express();

// establishing database connection
const db=require('./db');

// Body Parser used to extract body from POST request by client
const bodyParser=require('body-parser');
app.use(bodyParser.json());

require('dotenv').config();

const userroutes=require('./routes/userroutes');
app.use('/user',userroutes);

const adminroutes=require('./routes/adminroutes');
app.use('/candidates',adminroutes);

const voterroutes=require('./routes/voterroutes');
app.use('/vote',voterroutes);

PORT_NO=process.env.PORT || 3000;

app.listen(PORT_NO,()=>{
    console.log("Server running at port 3000!")
})

