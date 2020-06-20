import userModel from "../models/user.model.js";
import askMeModel from "../models/askMe.model.js";


const adminController = {};


// admin related routes

// making admin

// admin home
adminController.home = (req, res) => {
    res.status(200).render('adminHome', {name: req.user.name, id: req.user._id});
};

// make admin
adminController.makeAdmin = async (req, res, next) => {
    const email = req.body.email;
    try{
        const user = await userModel.findOne({email});

        // if user is not found
        if(!user) return res.status(404).redirect('/makeAdmin?notfound=true');

        // user found
        user.admin = true;
        await user.save();

        res.status(200).render('newAdmin', {user})
    } catch(err){
        next(err);
    }
};


// AskMe portal
adminController.askMe = async (req, res, next) => {
    let error = false;
    // checking if this is redirect
    if(req.query.error) error = true;

    // fetching all questions
    try{
        // finding questions that are not answered
        const questions = await askMeModel.find({solved: false});
        // response
        res.render('adminAskMe', {questions, error})
    } catch(err) {
        next(err)
    }
}


export default adminController;