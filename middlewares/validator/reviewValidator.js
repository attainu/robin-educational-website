import pkg from 'express-validator';
const { check, validationResult } = pkg;

export const reviewChecker = [
    check('review')
    .exists().withMessage('please provide review')
    .trim()
    .isLength({min: 1}).withMessage('review must not be blank'),
];


export const reviewErrorHandler = (req, res, next) => {
    try{
        validationResult(req).throw();
        next()
    } catch(err){
        req.app.locals.msg = err.array()[0].msg;
        res.redirect(`/blogs/reviews/${req.params.id}?error=true`);
    }
};