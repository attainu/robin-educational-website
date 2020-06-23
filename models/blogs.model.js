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
        default: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
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
    }
});

// new Date().toISOString().
//   replace(/T/, ' ').      // replace T with a space
//   replace(/\..+/, '')     // delete the dot and everything after
// > '2012-11-04 14:55:45'
// new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')



//model
const blogModel = mongoose.model('blog', blog);


// exporting
export default blogModel;