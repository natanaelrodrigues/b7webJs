const mongoose = require('mongoose');
const Post = mongoose.model('Post');


exports.index = async (req,res)=>{
    let responseJson = {
        pageTitle:"Pagina home...",
        posts:[]
    }
    const posts = await Post.find();
    responseJson.posts = posts;

    res.render('home', responseJson)
};

