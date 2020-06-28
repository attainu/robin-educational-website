// importing modules
import randomString from 'randomstring';

// user model
import userModel from "../models/user.model.js"
// mail file
import { sendEmail } from "../utils/mailer.js";
// mail config file
import { GMAIL_USER } from '../config/mailer.js';
// email body
import { verification, forgetPassword, changeMail } from  "../utils/emailBody.js";
// file upload cloudinary
import uploadFile from '../utils/uploadPic.js';
// data to string converter
import dataToString from "../utils/dataTOstring.js";


const userController = {};

// signin
userController.signin = async (req, res, next) => {

    try {
        const user = new userModel(req.body);

        // generate secret key 
        const key = randomString.generate();
        user.key = key;

        // send mail
        sendEmail(GMAIL_USER, req.body.email, 'Please verify your email', verification(key));

        // saving user
        await user.save();
        res.status(200).render('emailSent', {reason: 'account verification, please activate your account before login.'})
    } catch (err) {
        next(err);
    }
};

// login
userController.login = async (req, res) => {
    res.status(200).render('userHome', { name: req.user.name, isAdmin: req.user.admin });
};

// verify
userController.verify = async (req, res, next) => {
    const key = req.params.key;
    try {
        const user = await userModel.findOne({ key });

        // check if user found
        if (!user) return res.status(404).redirect('/?found=false');

        // if user found redirect to login page
        user.active = true;
        user.key = '';
        await user.save();
        res.status(200).redirect("/login?found=true");
    } catch (err) {
        next(err);
    }
};

// update
userController.update = async (req, res, next) => {
    try {
        if (req.body.name) req.user.name = req.body.name;
        if (req.body.password) req.user.password = req.body.password;
        if (req.body.email) req.user.email = req.body.email;
        req.user = await req.user.save();
        res.status(200).redirect('/users/details?updated=true');
    } catch (err) {
        next(err)
    }
};


// change email address
userController.changeEmail = async(req, res, next) => {
    try{
        const email = req.body.email;
        const key = randomString.generate();
        // putting key in user data
        req.user.key = key;
        await req.user.save()
        // putting mail in session
        req.session.userEmail = email;
        // sending mail
        sendEmail(GMAIL_USER, email, "For change of email", changeMail(key));
        // response
        res.render('emailSent', {reason: "changing email"})
    } catch(err) {
        next(err);
    }
};


// verify email
userController.verifyEmail = async(req, res, next) => {
    try{
        const key = req.params.key;
        // retrieving email
        const email = req.session.userEmail
        // searching user based on key
        const user = await userModel.findOne({key});
        // if not found
        if(!user) return res.redirect(404, "/");
        // if found updating email
        console.log(email)
        user.email = email;
        await user.save()
        // response
        res.redirect('/users/details');
    } catch(err) {
        next(err);
    }
};


// user details
userController.details = (req, res) => {
    if (req.query.updated) {
        return res.status(200).render('userProfile', { updated: true, user: req.user });
    }
    res.status(200).render('userProfile', { user: req.user });
};


// home page
userController.home = (req, res) => {
    res.status(200).render('userHome', { name: req.user.name, isAdmin: req.user.admin });
};


// logout
userController.logout = (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
};


// deleting account
userController.delete = async (req, res, next) => {
    try {
        await req.user.remove();
        req.logout();
        req.session.destroy();
        res.redirect('/login');
    } catch (err) {
        next(err);
    }
};


// forget password route control
userController.forgetPassword = async (req, res, next) => {
    const email = req.body.email
    try {
        // finding user
        const user = await userModel.findOne({ email });

        // user not found
        if (!user) return res.status(404).redirect('/forgetPassword?notfound=true');

        // user found
        // generating key for verification
        const key = randomString.generate();
        // saving it in user db
        user.key = key;

        await user.save();

        // sending mail
        sendEmail(GMAIL_USER, email, 'FOR CREATING NEW PASSWORD', forgetPassword(key));

        res.render('emailSent', {reason: 'password recovery'});
    } catch (err) {
        next(err);
    }
};


// make password
userController.makePassword = async (req, res, next) => {
    const key = req.body.key;
    try {
        const user = await userModel.findOne({ key });

        // check if user found
        if (!user) {
            req.app.locals.msg = 'Key is not valid.'
            return res.status(404).redirect('/makePassword?error=true');
        }

        // if user found 
        user.key = '';
        user.password = req.body.password;
        await user.save();

        res.redirect('/login');
    } catch (err) {
        next(err);
    }
};


// upload file 
userController.file = async (req, res, next) => {
        try {
            // checking if file provided
            if(!req.file) return res.redirect('/upload?noFile=true');

            // converting file into string
            const file = dataToString(req);

            // uploading on cloudinary
            const result = await uploadFile(file);

            // saving link of file in db
            req.user.profilePicLink = result.url;
            await req.user.save()

            res.redirect('/users/details');
        } catch(err) {
            next(err);
        }
}


// ask me page 
userController.askMe = async (req, res, next) => {
    let error = false;
    if(req.query.error)  error = true;
    try {
        console.log(req.user._id);
        await userModel.findOne({_id: req.user._id})
            .populate('questions')
            // .sort('createdOn')
            .exec()
            .then(docs => {
                res.render('AskMe', {user: req.user._id, questions: docs.questions, error});
            });
    } catch(err) {
        next(err)
    }
};


export default userController;