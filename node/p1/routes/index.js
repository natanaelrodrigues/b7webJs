const express = require('express');

const router = express.Router();
router.get('/', (req,res)=>{
    let obj = {
        pageTitle:"Pagina home..."
    }
    res.render('home', obj) 
});

router.get('/sobre', (req,res)=>{
    res.send('Pagina sobre!');
});

module.exports = router;