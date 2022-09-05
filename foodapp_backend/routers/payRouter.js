import express from "express";
import { protectRoute } from '../controller/authController.js';
import { createSession } from '../controller/payController.js';

export const payRouter = express.Router();

payRouter.post('/createSession', protectRoute, createSession);
payRouter.get('/createSession', function (req, res) {
  res.sendFile("E:/CODING/WEB DEV/PEPCODING/8_Backend/foodapp/foodapp_backend/payment.html");
});

