import mongoose from 'mongoose';


// creating schema
const faqsSchema = mongoose.Schema;


//defining schema
const faqs = new faqsSchema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
});


//model
const faqModel = mongoose.model('faqs', faqs);


// exporting
export default faqModel;