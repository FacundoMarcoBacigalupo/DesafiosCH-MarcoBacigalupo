export class SessionController{
    static redirectRegister = async(req, res) =>{
        return res.redirect("login", {messagge:"Register user for login"})
    }


    static failRegister = async(req, res) =>{
        return res.send("<p>Can not register the user, <a href='/register'>Try again</a></p>");
    }


    static redirectLogin = async(req, res) =>{
        let user = req.user
        return res.render("/profile", {style: "forms.css"})
    }


    static failLogin = async(req, res) =>{
        return res.send("<p>Can not login the user, <a href='/login'>Try again</a></p>");
    }


    static redirectGitHub = async(req, res) =>{}


    static failGitHub = async(req, res) =>{
        return res.render("/")
    }


    static redirectLogout = (req, res) =>{
        req.logOut(error =>{
            if(error){
                return res.render("login", {user: req.user, error:"Cannot close de session"}, {style: "forms.css"})
            }
            else{
                req.session.destroy(error =>{
                    if(error) return res.render("login", {user: req.session.userInfo, error:"Cannot close de session"}, {style: "forms.css"})
                    res.redirect("/")
                })
            }
        })
    }
}