import express from "express";
import multer, { diskStorage } from 'multer';
import { getUser, getAllUser, updateUser, deleteUser, updateProfileImage } from '../controller/userController.js';
import { signup, login, isAuthorised, protectRoute, resetpassword, logout, forgotpassword } from '../controller/authController.js';

export const userRouter = express.Router();

// user ke options 
userRouter.route('/:id')
  .patch(updateUser)
  .delete(deleteUser)

userRouter
  .route('/signup')
  .post(signup)

userRouter
  .route('/login')
  .post(login)

userRouter
  .route('/forgotpassword')
  .post(forgotpassword)

userRouter
  .route('/resetpassword/:token')
  .post(resetpassword)

userRouter
  .route('/logout')
  .get(logout)


//multer for fileupload

// upload-> storage , filter
const multerStorage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, `user-${Date.now()}.jpeg`)
  }
});

const filter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb(new Error("Not an Image! Please upload an image"), false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: filter
});

userRouter.post("/ProfileImage", upload.single('photo'), updateProfileImage);
//get request
userRouter.get('/ProfileImage', (req, res) => {
  res.sendFile("E:/CODING/WEB DEV/PEPCODING/8_Backend/foodapp/foodapp_backend/multer.html");
});

//profile page 
userRouter.use(protectRoute);
userRouter
  .route('/userProfile')
  .get(getUser)


// admin specific func
userRouter.use(isAuthorised(['admin']));
userRouter
  .route('/')
  .get(getAllUser)