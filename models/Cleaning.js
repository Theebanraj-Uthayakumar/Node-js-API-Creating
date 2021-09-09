const mongoose = require('mongoose');

const CleaningSchema = mongoose.Schema({
    CName: {
        type: String,
        require: true
    },
    Location: {
        type: String,
        require: true
    },
    NOE: {
        type: String,
        require: true
    },
    CNumber: {
        type: String,
        require: true
    },
    Since: {
        type: String,
        require: true
    },
    Image: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Cleaning_Company', CleaningSchema);