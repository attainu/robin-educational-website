import express from 'express';

// controller file
import adminController from "../controllers/admin.controller.js";
// autherization files
import userAutherized from "../middlewares/authorization/userAutherized.js";
import isAdmin from "../middlewares/authorization/isAdmin.js";

// init route
const adminRoute = express.Router();


// routes

// admin home page
adminRoute.get(
    "/home",
    userAutherized,
    isAdmin,
    adminController.home
);

// make admin
adminRoute.post(
    "/makeAdmin",
    userAutherized,
    isAdmin,
    adminController.makeAdmin
);

// answering askMe(s)
adminRoute.get(
    "/askMe",
    userAutherized,
    isAdmin,
    adminController.askMe
);


// for deleting blog page
adminRoute.get(
    "/blog",
    userAutherized,
    isAdmin,
    adminController.blog
);


export default adminRoute;