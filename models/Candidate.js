const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const candidateSchema = mongoose.Schema(
  {
    applicantName: {
      type: String,
      required: [true,"Applicant's name must not be missing"]
    },
    applicantEmail:{
      type:String,
      required:[true,"Applicant's email address must not be empty"]
    },
    age: {
      type: String,
      required: [true,"Applicant's age must not be missing"]
    },
    higherEducation: {
      type: String,
    },
    location: {
      type: String,
      required: [true,"Applicant's location must not be missing"]
    },
    companyName:{
      type:String,
      required:[true,'Company name is required']
    },
    postTitle: {
      type: String,
      required: [true,"Post title must be written"]
    },
    jobId: {
      type: ObjectId,
      required:[true,"Job id must not be empty"],
      ref: 'Job',
    },
    resume: String,
  },
  {
    timestamps: true,
  },
)

const Candidate = mongoose.model('Candidate', candidateSchema)

module.exports = Candidate
