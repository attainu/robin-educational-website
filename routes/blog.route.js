import express from 'express';
import blogController from "../controllers/blogs.controller.js";
// autherization
import userAutherized from "../middlewares/authorization/userAutherized.js";
import isAdmin from "../middlewares/authorization/isAdmin.js";
import { isSelf } from "../middlewares/authorization/isSelf.js"
// validator
import { bodyChecker, checkForOne, updateBodyChecker, createError, updateError } from "../middlewares/validator/blogValidator.js"


// creating route
const blogRoute = express.Router();


// defining paths
// new blog
blogRoute.post(
    '/create',
    userAutherized,
    bodyChecker,
    createError,
    blogController.create
);

// show all user`s blogs
blogRoute.get(
    "/show",
    userAutherized,
    blogController.show
);


//showing specific blog
blogRoute.get(
    "/blog-search/:id",
    userAutherized,
    isSelf,
    blogController.blog
);

// update blog
blogRoute.post(
    "/update/:id",
    userAutherized,
    isSelf,
    checkForOne,
    updateBodyChecker,
    updateError,
    blogController.update
);

// delete blog
blogRoute.get(
    "/delete/:id",
    userAutherized,
    isSelf,
    blogController.delete
);


// rendering page
// new blog
blogRoute.get(
    '/new',
    userAutherized,
    blogController.new
);

// edit blog
blogRoute.get(
    "/edit/:id",
    userAutherized,
    isSelf,
    blogController.edit
);


// deleting
blogRoute.get(
    "/adminDelete/:id",
    userAutherized,
    isAdmin,
    blogController.adminDelete
);


// report
blogRoute.get(
    "/report-page/:id",
    userAutherized,
    blogController.reportPage
);


blogRoute.post(
    "/report/:id",
    userAutherized,
    blogController.report
);


blogRoute.get(
    "/reviews/:id",
    blogController.getAllReviews
);


export default blogRoute;