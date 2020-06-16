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


export default adminRoute;