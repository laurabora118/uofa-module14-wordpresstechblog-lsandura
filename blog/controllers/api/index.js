const router = require('express').Router();
const signupRoutes = require('./signups');

router.use('/bloggers', signupRoutes);

module.exports = router;
