const express=require('express');
const router=express.Router();

// importing candidate model
const Candidate=require('./../models/candidate');
const User=require('./../models/user');

// importing middleware for jwt authentication
const {jwtMiddleware,generatetoken}=require('./../jwt');

// POST method to create new candidate
router.post('/:id/:password',async (req,res) => {
    
    try {
        // asking for user id and password
        const id=req.params.id;
        const password=req.params.password;
    
        const admin=await User.findById(id);
        // console.log(admin);
        
        // checking if user with this id and password exists and is admin or not
        if(admin && admin.role=='admin' && (await admin.comparePassword(password))){

            const data=req.body;

            // Making new candidate
            const candidate_data=new Candidate(data);

            // Saving candidate into database
            const result=await candidate_data.save();

            console.log('Candidate created successfully!');
            res.status(200).json({result});
        }

        else{
            res.status(401).json({error:'Unauthorized'});
        } 
    } 

    catch (err) {
        console.log(err);
        res.status(500).json({error:err});
    }
})


// PUT method to update existing candidate
router.put('/:id/:password/:candidate_id',async (req,res) => {
    
    try {
        // asking for user id and password of admin in parameters
        const id=req.params.id;
        const password=req.params.password;

        // asking for candidate id in parameters
        const candidate_id=req.params.candidate_id;
    
        const admin=await User.findById(id);
        // console.log(admin);
        
        // checking if user with this id and password exists and is admin or not
        if(admin && admin.role=='admin' && (await admin.comparePassword(password))){

            const updated_data=req.body;

            // Updating candidate data
            const result=await Candidate.findByIdAndUpdate(candidate_id,updated_data,{
                new:true,
                runValidators:true
            });

            if(!result){
                res.status(404).json({error:'Not Found'});
            }

            console.log('Data updated successfully!');
            res.status(200).json({result});
        }

        else{
            res.status(401).json({error:'Unauthorized'});
        } 
    } 

    catch (err) {
        console.log(err);
        res.status(500).json({error:err});
    }
})


// Delete method to delete existing candidate
router.delete('/:id/:password/:candidate_id',async (req,res) => {
    
    try {
        // asking for user id and password of admin in parameters
        const id=req.params.id;
        const password=req.params.password;

        // asking for candidate id in parameters
        const candidate_id=req.params.candidate_id;
    
        const admin=await User.findById(id);
        // console.log(admin);
        
        // checking if user with this id and password exists and is admin or not
        if(admin && admin.role=='admin' && (await admin.comparePassword(password))){

            // Deleting candidate by ID
            const result=await Candidate.findByIdAndDelete(candidate_id);

            if(!result){
                res.status(404).json({error:'Not Found'});
            }

            console.log('Candidate removed successfully!');
            res.status(200).json({result});
        }

        else{
            res.status(401).json({error:'Unauthorized'});
        } 
    } 

    catch (err) {
        console.log(err);
        res.status(500).json({error:err});
    }
});

router.get('/',async(req,res)=>{
    try {
        
        const projection = {_id:0, name: 1, party: 1 };
        const result=await Candidate.find({},projection);    // Finds all the candidates data and returns to user
        console.log('All candidates data is fetched');
        res.status(200).json(result);
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports=router;