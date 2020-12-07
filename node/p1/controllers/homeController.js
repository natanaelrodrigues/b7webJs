exports.userMiddleware = (req, res, next) =>{
    let info = {name:'Natanael', id:'9785'};

    req.userInfo = info;

    next();
};

exports.index = (req,res)=>{
    let obj = {
        pageTitle:"Pagina home...",
        userInfo: req.userInfo
    }
    res.render('home', obj) 
};