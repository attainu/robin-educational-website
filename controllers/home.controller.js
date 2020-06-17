const homeController = {};

// user related
homeController.home = (req, res) => {
    if(req.user &&  Object.keys(req.user).length > 0){
        return res.redirect('/users/home');
    }
    res.status(200).render('home');
};

homeController.login = (req, res) => {
    if(req.user &&  Object.keys(req.user).length > 0){
        return res.redirect('/users/home');
    }
    // console.log(req.query.registered)
    if(req.query.registered) {
        return res.status(201).render('login', {registered: true});
    }
    if(req.query.failed){
        return res.status(401).render('login', {failed: true});
    }
    res.status(200).render('login');
};

homeController.sigin = (req, res) => {
    if(req.user &&  Object.keys(req.user).length > 0){
        return res.redirect('/users/home');
    }
    if(req.query.error){
        return res.status(422).render('register', {error: true});
    }
    res.status(200).render('register');
};


homeController.update = (req, res) => {
    if(req.query.error){
        return res.status(422).render('update', {error: true});
    }
    res.status(200).render('update');
};


//admin related 
homeController.newAdmin = (req, res) => {
    if(req.query.notfound){
        return res.status(404).render('makeAdmin', {notfound: true}); 
    }

    if(req.query.error){
        return res.status(403).render('makeAdmin', {error: true});
    }

    res.render('makeAdmin');
};


// forget password
homeController.forgetPassword = (req, res) => {
    res.render('forgetPassword');
};

// create password
homeController.makePassword = (req, res) => {
    if(req.query.error){
        return res.render('makePassword', {error: true});
    }
    res.render('makePassword')
}


// upload pic
homeController.upload = (req, res) => {
    if(req.query.noFile){
        req.app.locals.msg = 'Please select a file'
        return res.render('fileUpload', {error: true});
    }
    if(req.query.noImage){
        req.app.locals.msg = "Please select a image file"
        return res.render('fileUpload', {error: true});
    }
    res.render('fileUpload');
}


export default homeController;