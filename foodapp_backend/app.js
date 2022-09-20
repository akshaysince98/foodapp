import express from "express";
const app = express();
// var cors = require('cors');
// app.use(cors()) ;
app.use(express.static('public/build'));

import cookieParser from 'cookie-parser';
//middleware func-> post, front-> json
app.use(express.json()); //global middleware 
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`server listening on port ${port}`)
});
app.use(cookieParser());

//mini app
import { userRouter } from './routers/userRouter.js';
import { planRouter } from './routers/planRouter.js';
import { reviewRouter } from './routers/reviewRouter.js';
import { payRouter } from './routers/payRouter.js';

//base route , router to use
app.use("/user", userRouter);
app.use("/plans", planRouter);
app.use("/review", reviewRouter);
app.use('/pay', payRouter);



// what the fuck
