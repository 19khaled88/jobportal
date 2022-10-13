const User = require("../models/User")

exports.managerService=async(data)=>{
    try {
        const {email } = data
        const managerPostedJobs = await User.findOne({email}).select("-_id -email -password -role").populate('postedJobs')
        return managerPostedJobs
    } catch (error) {
        
    }
}