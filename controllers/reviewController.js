import Review from './../models/reviewModel.js';
import blogModel from '../models/blogs.model.js';

const reviewController = {};


reviewController.createReview = async (req, res, next) => {
try{
    // console.log('hi from cretae revies controller');
    const newReview = await Review.create({
        review: req.body.review,
        createdBy: req.user.name
    });
    
    // saving in blog
    const blogID = req.params.id;
    const blog = await blogModel.findOne({_id: blogID})

    console.log(blog, "blog", newReview._id)
    blog.reviews.push(newReview._id);

    await blog.save();

    // redirect to review page
    res.redirect(`/blogs/reviews/${blogID}`);
}
catch(err){
    next(err)
}
}

export default reviewController;