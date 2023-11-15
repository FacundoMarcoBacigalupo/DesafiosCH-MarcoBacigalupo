export const checkRole = (roles) =>{
    return (req, res, next) =>{
        if(roles.includes(req.user.role)){
            next()
        }
        else{
            res.json({status:"Error", message:"You do not have permission"})
        }
    }
}




export const checkUserAuthenticate = (req, res, next) =>{
    if(req.user){
        next();
    }
    else {
        res.status(403).json({status:"Error", message:"You do not have permission"})
    }
};




export const showLoginView = (req, res, next) =>{
    if(req.user){
        res.render("/");
    }
    else {
        next();
    }
};