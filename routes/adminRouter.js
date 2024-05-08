const router = require('express').Router();
const {getAllUsers, getSingleUser,getUserAllPost} = require('../controllers/adminController');

router.get('/get-all-users', getAllUsers);
router.get('/get_single-user', getSingleUser);
router.get('/get-user-details', getUserAllPost)

module.exports = router;

