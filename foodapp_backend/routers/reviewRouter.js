import express from "express";
import { protectRoute } from '../controller/authController.js';
import { getAllReviews, top3reviews, getPlanReviews, createReview, updateReview, deleteReview } from '../controller/reviewController.js';

export const reviewRouter = express.Router()

reviewRouter
  .route('/all')
  .get(getAllReviews);

reviewRouter
  .route('/top3')
  .get(top3reviews);

reviewRouter
  .route('/:id')
  .get(getPlanReviews);

reviewRouter.use(protectRoute);
reviewRouter
  .route('/crud/:plan')
  .post(createReview)
  .patch(updateReview)
  .delete(deleteReview)






