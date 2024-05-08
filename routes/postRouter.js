const {createPost, deletePost, addReaction} = require('../controllers/postController');
const router = require('express').Router();

router.post('/creat-post', createPost);
router.delete('/delete-post/:postId', deletePost);
router.post('/add-reaction', addReaction);


module.exports = router;