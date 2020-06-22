import mongoose from 'mongoose';


// creating schema
const blogSchema = mongoose.Schema;


//defining schema
const blog = new blogSchema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    tag: {
        type: String,
        required: true
    }
});


//model
const blogModel = mongoose.model('blog', blog);


// exporting
export default blogModel;