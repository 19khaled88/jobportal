const Job = require("../models/Job.js")
const User = require("../models/User.js")

exports.jobCreateServices=async(data)=>{
    try {
        console.log(data)
        const jobPosted = await Job.create(data)
        const {_id:jobId,jobCreatedByManager} = jobPosted

        const update_jobid_to_User = await User.updateOne(
            {_id:jobCreatedByManager},
            {$push:{postedJobs:jobId}}
            )
        if(!jobPosted){
            return false 
        }
        return jobPosted
    } catch (error) {
        res.status(400).json({
            success:false,
            error:'Job creation unsuccessful'
        })
    }
}
exports.jobGetServices=async()=>{
    try {
        const alljob = await Job.find({})
        return alljob 
    } catch (error) {
        return error
    }
}
exports.jobDetailsByIdServices=async(id)=>{
    try {
        const jobDetails = await Job.findOne({_id:id}).populate('jobCreatedByManager')
        return jobDetails
    } catch (error) {
        
    }
}