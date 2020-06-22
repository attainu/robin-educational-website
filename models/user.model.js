import mongoose from 'mongoose';

import bcrypt from 'bcrypt';

// schema
const userSchema = mongoose.Schema;

// defining
const user = new userSchema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog'
    }],
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'askMe'
    }],
    key: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    },
    profilePicLink: {
        type: String,
        default: 'http://res.cloudinary.com/dqephruum/image/upload/v1592380257/doojzhewxigdpfgk6w2h.png'
    }
});


user.methods.isCorrectPassword = async function(password){
    try{
        // checking if user password is in db or not
        if(!this.password) return false;
        
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch(err) {
        throw err;
    }
};


// model
const userModel = mongoose.model("user", user);


export default userModel;