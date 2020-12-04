const express = require('express');

const router = express.Router();
router.get('/', (req,res)=>{
    res.render('home') 
});

router.get('/sobre', (req,res)=>{
    res.send('Pagina sobre!');
});

module.exports = router;