exports.index = (req,res)=>{
    let obj = {
        pageTitle:"Pagina home..."
    }
    res.render('home', obj) 
};