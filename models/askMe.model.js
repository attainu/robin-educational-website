import mongoose from 'mongoose';


// making schema
const askMeSchema = mongoose.Schema;

// defining schema
const askMe = new askMeSchema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    solved: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
});


const askMeModel = mongoose.model('askMe', askMe);

export default askMeModel;