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
        const _id = req.user._id

        userModel.findOne({_id})
            .populate('blogs') 
            .exec()
            .then(user => user.blogs)
            .then(blogs => blogs.sort(order('createdOn', -1)))
            .then(blogs => res.render('usersBlog', {blogs}));

    } catch (err) {
        next(err)
    }
};


// showing specific blog
blogController.blog = (req, res, next) => {
    // rendering page
    res.render('showBlog', {blog: req.blog});
}


// blog update
blogController.update = async (req, res, next) => {
    try {
        // updating
        if(req.body.title) req.blog.title = req.body.title;
        if(req.body.body) req.blog.body = req.body.body;
        if(req.body.tag) req.blog.tag = req.body.tag;

        // saving details
        await req.blog.save()

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
        await req.blog.remove()
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

    // if not found 
    if(!req.blog) {
        req.app.locals.msg = 'Blog not found';
        error = true;
    };

    // if found
    res.render("editBlog", {blog: req.blog, error});
};


// deleting blog
blogController.adminDelete = async (req, res, next) => {
    try{
        const _id = req.params.id;
        // deleting
        await blogModel.findOneAndRemove({_id});
        // redirecting
        res.redirect('/admins/reports');
    } catch (err) {
        next(err);
    }
};


// report
blogController.reportPage = (req, res) => {
    const id = req.params.id;

    res.render('report', {id});
};


blogController.report = async(req, res, next) => {
    try{
        const _id = req.params.id;
        const key = req.body.report;
        // finding blog
        const blog = await blogModel.findOne({_id});
        // reporting
        blog.report.push(key);
        blog.noOreport += 1;
        // saving
        await blog.save()
        // response
        res.render("reported")
    } catch (err) {
        next(err)
    }
};


// getting all review
blogController.getAllReviews = async (req, res, next) => {
    try{
        // checking for error in creating review
        let error = false;
        if(req.query.error) error = true
        
        // finding blog and populating all reviews
        const _id = req.params.id;
        const blog = await blogModel.findOne({_id}).populate("reviews");

        // checking if user is autherized or not
        let user = false;
        if(req.user && req.user.name) user = true;

        // page object
        const temObj = {
            reviews: blog.reviews, 
            title: blog.title, 
            blogID: _id, user,
            error
        };
        
        
        // response
        res.status(200).render('reviews', temObj);

}catch(err){
next(err);
}
}


export default blogController;