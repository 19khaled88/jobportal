const Candidate = require('../models/Candidate')
const Job = require('../models/Job')
const User = require('../models/User')
const {
  jobCreateServices,
  jobGetServices,
  jobDetailsByIdServices,
} = require('../services/job.service')

exports.jobPostController = async (req, res, next) => {
  try {
    const result = await jobCreateServices(req.body)
    res.status(200).json({
      success: true,
      result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Something wrong with this job creation',
    })
  }
}
exports.jobEditController = async (req, res, next) => {
  try {
    const email = req.user?.email
    const jobId = req.params.id
    const data = req.body
    const job = await Job.findOne({ _id: jobId })
    const user = await User.findOne({ _id: job.jobCreatedByManager })

    if (email === user.email) {
      const updated = await Job.updateOne({ _id: jobId }, data, {
        runValidators: true,
      })
      res.send(updated)
    }
    res.send('This user is not permissible to execute changes')
  } catch (error) {}
}
exports.jobGetController = async (req, res, next) => {
  try {
    const jobs = await jobGetServices()
    res.status(200).json({
      success: true,
      jobs,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    })
  }
}
exports.jobGetByIdController = async (req, res, next) => {
  try {
    const jobDetails = await jobDetailsByIdServices(req.params.id)
    res.send(jobDetails)
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    })
  }
}
exports.jobApplyController = async (req, res, next) => {
  try {
    const date = new Date()
    const {applicantEmail:email,jobId} =req.body
    const job = await Job.findOne({_id:jobId})
    const {deadline} = job 
    if(date > deadline){
     return res.send('application date is expired')
    } 

    const isJobFound = await Candidate.find({jobId:jobId})
    isApplied = false
    
    isJobFound.map(data=>{
      if(data.applicantEmail === email){
        isApplied = true
      }
    })

    if(isApplied == true){
      return res.send('You have already applied')
    }else{
      const candidate = await Candidate.create(req.body)
      const {_id:candidateId} = candidate 
      const updateJob = await Job.updateOne(
        {_id:jobId},
        {$push:{applicantId:candidateId}}
      )
      res.send(candidate)
    }
    
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Job application failed',
    })
  }
}
