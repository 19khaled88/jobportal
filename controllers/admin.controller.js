const Candidate = require("../models/Candidate")
const User = require("../models/User")

exports.getCandidate=async(req, res,next)=>{
    try {
        const getCandidate = await User.find({role:'candidate'}).select("name email role postedJobs")
        res.status(200).json({
            success:true,
            getCandidate
        })
    } catch (error) {
        
    }
}

exports.getCandidateById=async(req, res,next)=>{
    try {
        const getCandidate = await Candidate.findOne({_id:req.params.id})
        const allAppliedJobs = await Candidate.find({applicantEmail:getCandidate.applicantEmail})
        const candidateDetails = await User.findOne({email:getCandidate.applicantEmail})
        res.status(200).json({
            success:true,
            candidateDetails,
            allAppliedJobs
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            error:'Something went wrong'
        })
    }
}
exports.getHiringManager=async(req, res,next)=>{
    try {
        const getManager = await User.find({role:'manager'})
        
        res.status(200).json({
            success:true,
            getManager,
            
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            error:'Something went wrong'
        })
    }
}
exports.updateRole=async(req, res,next)=>{
    try {
        const getManager = await User.findOne({_id:req.params.id})
        if(getManager.role ==='manager' && req.body.role === 'candidate' ){
            
            const updated = await User.updateOne({_id:req.params.id},req.body)
            res.status(200).json({
                success:true,
                updated
            })
        }else{
            res.status(400).json({
                success:true,
                error:'update from user to manger not happened',
            })
        }
       
    } catch (error) {
        res.status(400).json({
            success:false,
            error:'Something went wrong'
        })
    }
}