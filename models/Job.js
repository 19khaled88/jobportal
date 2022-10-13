const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const jobSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Company name must not be missing'],
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title must not be empty'],
    },
    skills: [
      {
        type: String,
        required: [true, 'Skill set must be given'],
      },
    ],
    salary: {
      type: Number,
      required: [true, 'Salary field must not leave empty'],
    },
    jobStatus: {
      type: String,
      required: true,
      enum: {
        values: ['remote', 'on-site', 'work-from-home'],
        message:
          "Job status can't be {VALUE}, must by remote/on-site/work-from-home",
      },
      default: 'on-site',
    },
    jobtype: {
      type: String,
      enum: {
        values: ['full-time', 'part-time', 'temporary', 'internship'],
        message:
          "Job type can't be {VALUE}, must be full-time/part-time/temporary/internship",
      },
    },
    location: {
      type: String,
      enum: {
        values: [
          'chattogram',
          'khulna',
          'barishal',
          'mymensingh',
          'potuakhali',
          'vola',
          'dhaka',
          'sylhet',
          'jessor',
        ],
        message: "Location can't be {VALUE}",
      },
    },
    numberOfVacancies: {
      type: Number,
      required: [true, 'Job vacancy number must be filled up'],
    },
    deadline: {
      type: Date,
    },
    applicantId: [{
      type: ObjectId,
      ref: 'Candidate',
    }],
 
    jobCreatedByManager: {
      type: ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

const Job = mongoose.model('Job', jobSchema)
module.exports = Job
