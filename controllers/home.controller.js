import blogModel from "../models/blogs.model.js";
import { pagination } from "../utils/pagination.js";

const homeController = {};

// user related
homeController.home = (req, res) => {
    if(req.user &&  Object.keys(req.user).length > 0){
        return res.redirect('/users/home');
    }
    res.status(200).render('home');
};

homeController.login = (req, res) => {
    if(req.user &&  Object.keys(req.user).length > 0){
        return res.redirect('/users/home');
    }
    // console.log(req.query.registered)
    if(req.query.registered) {
        return res.status(201).render('login', {registered: true});
    }
    if(req.query.failed){
        return res.status(401).render('login', {failed: true});
    }
    res.status(200).render('login');
};

homeController.sigin = (req, res) => {
    if(req.user &&  Object.keys(req.user).length > 0){
        return res.redirect('/users/home');
    }
    if(req.query.error){
        return res.status(422).render('register', {error: true});
    }
    res.status(200).render('register');
};


homeController.update = (req, res) => {
    if(req.query.error){
        return res.status(422).render('update', {error: true});
    }
    res.status(200).render('update');
};


// change email page 
homeController.changeEmail = (req, res) => {
    // check for error
    let error = false;
    if(req.query.error) error = true;

    res.render('changeEmail', {error});
};


//admin related 
homeController.newAdmin = (req, res) => {
    if(req.query.notfound){
        return res.status(404).render('makeAdmin', {notfound: true}); 
    }

    if(req.query.error){
        return res.status(403).render('makeAdmin', {error: true});
    }

    res.render('makeAdmin');
};


// forget password
homeController.forgetPassword = (req, res) => {
    res.render('forgetPassword');
};

// create password
homeController.makePassword = (req, res) => {
    if(req.query.error){
        return res.render('makePassword', {error: true});
    }
    res.render('makePassword')
}


// upload pic
homeController.upload = (req, res) => {
    if(req.query.noFile){
        req.app.locals.msg = 'Please select a file'
        return res.render('fileUpload', {error: true});
    }
    if(req.query.noImage){
        req.app.locals.msg = "Please select a image file"
        return res.render('fileUpload', {error: true});
    }
    res.render('fileUpload');
};


// For search all data specific to user input
homeController.search = async (req, res, next) => {
    try{
         // for pagination
         const limit = 10;
         const page = req.query.page || 1;

        // removing white spaces
        let word = req.body.word;
        word = word.trim();
    
        let data = [];
    
        if(word) {
            // if word match title
            data = await blogModel.find({
                $or: [
                    {title: word},
                    {title: {$regex: word, $options: "i"}}
                ]
            })
            .populate('createdBy', 'name')
            .sort({'title': 'desc'})
            .exec()
        };

        // details for pagination
        const { firstPage, endPage } = await pagination(
            blogModel, 
            {
                $or: [
                    {title: word},
                    {title: {$regex: word, $options: "i"}}
                ]
            },
            page,
            limit
        );

        // response
        res.render("search", {data, firstPage, endPage, prevPage: page-1, nextPage: page+1});
    } catch (err) {
        next(err);
    }

};


// rendering specific blog
homeController.viewBlog = async(req, res, next) => {
    const _id = req.query.blog;
    try{
        // finding blog
        const blog = await blogModel.findOne({_id})
            .populate('createdBy', 'name')

        // if not found
        if(!blog) return res.status(404).render("notfound");

        // checking if user is authorized
        let user = false;
        if(req.user && Object.keys(req.user).length != 0) user = true;

        // if found
        res.render("blog", {blog, user});
        
    } catch(err) {
        next(err);
    }
};


export default homeController;