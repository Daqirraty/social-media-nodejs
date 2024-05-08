const router = require('express').Router();
const {createUser, editUser,loginUser,getAllPosts, getSinglePost} = require('../controllers/userController');

router.post('/create-user', createUser);
router.patch('/edit-user', editUser);
router.post('/login', loginUser);
router.get('/all-posts', getAllPosts);
router.get('/single-post', getSinglePost);


module.exports = router;