export default (req, res, next) => {
    if(req.user && req.user.admin){
       return next();
    }
    res.status(403).redirect("/makAdmin?error=true");
};