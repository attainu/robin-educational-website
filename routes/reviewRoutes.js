import express from 'express';
import reviewController from '../controllers/reviewController.js';
import userAutherized from '../middlewares/authorization/userAutherized.js';
import { reviewChecker, reviewErrorHandler } from '../middlewares/validator/reviewValidator.js';

const reviewRouter = express.Router();

// reviewRouter.route('/').post( reviewController.createReview).get(reviewController.getAllReviews);

reviewRouter
    .post(
        "/create/:id",
        reviewChecker,
        reviewErrorHandler, 
        userAutherized, 
        reviewController.createReview
    )


export default reviewRouter;