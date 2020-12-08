const mongoose = require('mongoose');
const slug = require('slug');

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:'Informe um titulo para o post'
    },
    slug:String,
    body:{
        type:String,
        trim:true
    },
    tags:[String]

});

postSchema.pre('save', function(next){
    if (this.isModified('title')) { // quando mudar de branco para o conteúdo.
        this.slug = slug( this.title, {lower:true} );
    }

    next();
});


module.exports = mongoose.model('Post', postSchema);