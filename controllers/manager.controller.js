const Job = require("../models/Job")
const { jobCreateServices } = require("../services/job.service")
const { managerService } = require("../services/manager.service")

// exports.jobPostController=async(req,res,next)=>{
//     try {
       
//         const result = await jobCreateServices(req.body)
//         res.status(200).json({
//             success:true,
//             result
//         })
//     } catch (error) {
//         res.status(400).json({
//             success:false,
//             error:'Something wrong with this job creation'
//         })
//     }
// }
exports.getManagerJobController=async(req,res,next)=>{
    try {
        const result = await managerService(req.user)
        res.status(200).json({
            success:true,
            jobPostedBy:result.name,
            postedJobs:result.postedJobs
            
        })
    } catch (error) {
        
    }
}
exports.getManagerJobByIdController=async(req,res,next)=>{
    try {
        const jobById = await Job.findOne({_id:req.params.id}).populate("applicantId")
        res.send(jobById)
    } catch (error) {
        res.status(200).json({
            success:false,
            error:"No job found"
        })
    }
}