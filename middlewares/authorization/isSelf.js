import blogModel from "../../models/blogs.model.js";

// A middelware to check if blog is belong to user or not, in case some other user
// try to access another user`s blog
export const isSelf = async (req, res, next) => {
    try{
        const id = req.params.id;
        const blog = await blogModel.findById(id)
            .populate('createdBy', 'email');

        // if blog not found
        if(!blog) return res.redirect(404, 'back');
        // if blog do not belong to user
        if(blog.createdBy.email != req.user.email) return res.redirect(401, 'back');

        // else attached to req object
        req.blog = blog;
        next()

    } catch (err) {
        next(err);
    }
};