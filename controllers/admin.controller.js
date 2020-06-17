import userModel from "../models/user.model.js";


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


export default adminController;