const mongoose = require('mongoose');
const { replaceOne } = require('../models/Post');
const Post = mongoose.model('Post');

exports.add = (req, res) =>{
    res.render('postAdd');
};

exports.addAction = async (req, res) =>{
    const post = new Post(req.body);

    try {
        await post.save();  
    } catch (error) {
        req.flash('error','Erro:' + error.message);
        return res.redirect('/post/add');
    }
    

    req.flash('success', 'Post salvo com sucesso!');

    res.redirect('/');
};

exports.edit = async (req, res) => {
    // busca as informações
    const post = await Post.findOne({ slug: req.params.slug });
    // Carrega formulario para edição
    res.render('postEdit',{post});
};


exports.editAction = async (req, res) => {
   //Busca item enviado e atualiza.
    const post = await Post.findOneAndUpdate(
                {slug: req.params.slug }, 
                req.body,
                {
                    new:true, // Retorna novo item atualizado.
                    runValidators:true
                });
   // Mostra mensagem de sucesso
   req.flash('success', 'Post atualizado com Sucesso.');
   // redireciona
   res.redirect('/');


};