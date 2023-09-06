export const checkUserAuthenticate = (req, res, next) =>{
    if(req.user){
        next();
    } else {
        res.redirect("/login");
    }
};




export const showLoginView = (req, res, next) =>{
    if(req.user){
        res.redirect("/");
    } else {
        next();
    }
};