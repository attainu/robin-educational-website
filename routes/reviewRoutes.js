import express from 'express';
import reviewController from '../controllers/reviewController.js';
import userAutherized from '../middlewares/authorization/userAutherized.js';

const reviewRouter = express.Router();

// reviewRouter.route('/').post( reviewController.createReview).get(reviewController.getAllReviews);

reviewRouter
    .post("/create/:id", userAutherized, reviewController.createReview)


export default reviewRouter;