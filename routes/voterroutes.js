const express=require('express');
const router=express.Router();

const User=require('./../models/user');
const Candidate=require('./../models/candidate');

const {jwtMiddleware,generatetoken}=require('./../jwt');

// Candidate id is used as parameter to vote for a particular candidate
router.post('/:candidate_id',jwtMiddleware,async(req,res)=>{    //jwtMiddleware used to ensure candidate has login before voting
    try {

        const candidate_id=req.params.candidate_id;
        const user_id=req.user.id;

        const candidate=await Candidate.findById(candidate_id);

        const user=await User.findById(user_id);

        if(!candidate){
            res.status(401).json({error:'Not found'});
        }

        if(user.has_Voted==true || user.role=='admin'){
            res.status(401).json({error:'Can\'t vote'});
        }

        // Updating in database that given user has voted
        user.has_Voted=true;
        await user.save();

        // adding id and time of vote in the candidate votes and 
        // incrementing the vote count
        candidate.votes_count++;
        candidate.votes.push({user:user_id});
        await candidate.save();
        
        console.log('Your vote has been recorded!');
        res.status(200).json({msg:'Great work'});      
    } 
    catch (err) {
        console.log(err);
        res.status(200).json({error:'Internal Server error'});      
    }
});

router.get('/count',async(req,res)=>{
    try {
        // Finding the count of votes and sort them in descending order
        const result=await Candidate.find({},{_id:0,party:1,votes_count:1}).sort({votes_count:'desc'});

        // Mapping candidate data to another variable
        const display=result.map((data)=>{
            return{
                party:data.party,
                votes:data.votes_count
            }
        })

        console.log('Counting data is fetched');
        res.status(200).json(display);
        
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
    
});

module.exports=router;