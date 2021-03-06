const express = require('express');
const homeController = require('../controllers/homeController')
const usersController = require('../controllers/userController')
const postController = require('../controllers/postController.js')

const imageMiddleware = require('../middlewares/imageMiddeware');

const router = express.Router();
router.get('/', homeController.index);
router.get('/users/login',usersController.login);
router.get('/users/register', usersController.register);
router.post('/users/register', usersController.registerAction);
router.post('/users/login', usersController.loginAction);

router.get('/post/add',postController.add);
router.post('/post/add',
            imageMiddleware.upload, 
            imageMiddleware.resize,
            postController.addAction);

router.get('/post/:slug/delete', 
            postController.delete);
router.get('/post/:slug/edit',postController.edit)
router.post('/post/:slug/edit',
            imageMiddleware.upload, 
            imageMiddleware.resize,
            postController.editAction)

router.get('/post/:slug', postController.view);


router.get('/sobre', (req,res)=>{
    res.send('Pagina sobre!');
});

module.exports = router;