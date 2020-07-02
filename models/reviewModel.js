import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [ true, 'Review is required' ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: [ true, 'User is required' ]
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;





