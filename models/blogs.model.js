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
        type: String,
        default: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    report: [{
        type: Number
    }],
    noOreport: {
        type: Number,
        default: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});


//model
const blogModel = mongoose.model('blog', blog);


// exporting
export default blogModel;