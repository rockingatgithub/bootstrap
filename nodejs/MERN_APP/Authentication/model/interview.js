const mongoose = require('mongoose')

const interviewSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    candidates: [
        {
            ref: 'Student',
            type: mongoose.Types.ObjectId
        }
    ]

})

const Interview = mongoose.model('Interview', interviewSchema)
module.exports = Interview