const mongoose = require('mongoose');
const { replaceOne } = require('../models/Post');
const Post = mongoose.model('Post');

exports.view = async (req, res) => {
     // busca as informações
     const post = await Post.findOne({ slug: req.params.slug });
     // Carrega formulario para edição
     res.render('view',{post});
};

exports.add = (req, res) =>{
    res.render('postAdd');
};

exports.addAction = async (req, res) =>{
    // tratamento das tags.
    req.body.tags = req.body.tags.split(',').map(t=>t.trim()); // quebra em array e tira os espaços.

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
    // recria o slug
    req.body.slug = require('slug')(req.body.title,{lower:true});
    // tratamento das tags.
    req.body.tags = req.body.tags.split(',').map(t=>t.trim()); // quebra em array e tira os espaços.

    //Busca item enviado e atualiza.
    try{
        const post = await Post.findOneAndUpdate(
                    {slug: req.params.slug }, 
                    req.body,
                    {
                        new:true, // Retorna novo item atualizado.
                        runValidators:true
                    });
    }catch(error){
        req.flash('error','Erro:' + error.message);
        return res.redirect('/post/' + req.params.slug + '/edit');
    };
    
   // Mostra mensagem de sucesso
   req.flash('success', 'Post atualizado com Sucesso.');
   // redireciona
   res.redirect('/');


};