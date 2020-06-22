import blogModel from "../models/blogs.model.js";
import userModel from "../models/user.model.js";
import { order } from "../utils/JSONDataSort.js";


const blogController = {};

// create
blogController.create = async (req, res, next) => {
    try{
        let blog = new blogModel({
            title: req.body.title,
            body: req.body.body,
            tag: req.body.tag,
            createdBy: req.user._id
        });
        // save blog
        blog = await blog.save();
        
        // saving to user side
        req.user.blogs.push(blog._id);
        await req.user.save();

        // response
        res.redirect('/blogs/show');

    } catch (err) {
        next(err);
    }
};


// blog show
blogController.show = (req, res, next) => {
    try{
        let self = false;
        let admin = false;

        const _id = req.user._id || req.query.userID;

        if (!req.body.userID) self = true;
        if (req.body.userID) admin = true;

        userModel.findOne({_id})
            .populate('blogs') 
            .exec()
            .then(user => user.blogs)
            .then(blogs => blogs.sort(order('createdOn', -1)))
            .then(blogs => res.render('showBlogs', {self, admin, blogs}));

    } catch (err) {
        next(err)
    }
};


// blog update
blogController.update = async (req, res, next) => {
    try {
        // finding blog
        const _id = req.params.id
        const blog = await blogModel.findOne({_id});

        // if not found
        if(!blog) {};

        // updating
        if(req.body.title) blog.title = req.body.title;
        if(req.body.body) blog.body = req.body.body;
        if(req.body.tag) blog.tag = req.body.tag;

        // saving details
        await blog.save()

        // redirecting
        res.redirect("/blogs/show");
    } catch (err) {
        next(err);
    }
};


// blog delete
blogController.delete = async (req, res, next) => {
    try{
        const _id = req.params.id;
        // deleting
        await blogModel.findOneAndRemove({_id});
        // redirecting
        res.redirect('/blogs/show');
    } catch (err) {
        next(err);
    }
};


// rendering page
// For new blog
blogController.new = (req, res) => {
    let error = false;
    // check if error happens
    if(req.query.error) error = true;

    res.render('newBlog', {error});
};


// for edit blog
blogController.edit = async (req, res, next) => {
    // for checking if redirect due to error
    let error = false;
    if(req.query.error) error = true;

    const _id = req.params.id;
    // finding blog
    const blog = await blogModel.findOne({_id});

    // if not found 
    if(!blog) {
        req.app.locals.msg = 'Blog not found';
        error = true;
    };

    // if found
    res.render("editBlog", {blog, error});
};


// for admin
blogController.admin = (req, res, next) => {
    try{
        const email = req.body.email;

        userModel.findOne({email})
            .populate('blogs') 
            .exec()
            .then(user => {
                if(!user) throw "User not found";
                return user.blogs
            })
            .then(blogs => blogs.sort(order('createdOn', -1)))
            .then(blogs => res.render('showBlogs', {admin: true, blogs}));

    } catch (err) {
        if(err === 'User not found') return res.redirect("/admins/blog?error=true");
        next(err)
    }
};


// deleting
blogController.adminDelete = async (req, res, next) => {
    try{
        const _id = req.params.id;
        // deleting
        await blogModel.findOneAndRemove({_id});
        // redirecting
        res.redirect('/admins/blog');
    } catch (err) {
        next(err);
    }
};


export default blogController;