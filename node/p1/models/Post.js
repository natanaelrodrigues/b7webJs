const mongoose = require('mongoose');
const slug = require('slug');

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    photo:String,
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
        let newSlug = this.title + '-'+ String(Math.floor(Math.random() * 200));
        this.slug = slug( newSlug, {lower:true} );
    }

    next();
});

postSchema.statics.getTagsList = function(){
    return  this.aggregate([
        {
            $unwind:'$tags'
        },
        {
            $group:{_id:'$tags', count:{$sum:1}}
        },
        {$sort: {count:-1}}
    ]);
};

module.exports = mongoose.model('Post', postSchema);