import express from "express";
import { isAuthorised, protectRoute } from "../controller/authController.js";
import { getPlan, getAllPlans, createPlan, updatePlan, deletePlan, top3Plans } from '../controller/planController.js'

export const planRouter = express.Router();

//all plans leke aayega 
planRouter.route('/allPlans')
  .get(getAllPlans)

planRouter
  .route('/top3')
  .get(top3Plans)

//own plan -> logged in necessary 
planRouter.use(protectRoute );
planRouter.route('/plan/:id')
  .get(getPlan);


// admin nd restaurant owner can only create,update or delte plans 
planRouter.use(isAuthorised(['admin', 'restaurantowner']));
planRouter
  .route('/crudPlan')
  .post(createPlan);

planRouter
  .route('/crudPlan/:id')
  .patch(updatePlan)
  .delete(deletePlan)

