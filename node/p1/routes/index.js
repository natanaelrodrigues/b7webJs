const express = require('express');
const homeController = require('../controllers/homeController')
const usersController = require('../controllers/userController')

const router = express.Router();
router.get('/', homeController.index);
router.get('/users/login',usersController.login);

router.get('/sobre', (req,res)=>{
    res.send('Pagina sobre!');
});

module.exports = router;