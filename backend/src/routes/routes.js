const express = require('express');
const router = express.Router();
const throttle = require('../middlewares/Throttle');
const ApiRoute = require('./api/api.js');

/**
 * All Api Routes
 */
const apiThrottle = throttle();

router.use('/api', apiThrottle, ApiRoute);
/************ End ************/



/**
 * Default Route for handling 404 Not Found Error
 */
router.all('*', (req, res) => {
    res.status(404).json({
        message: `Error 404 Not Found!`
    })
});

module.exports = router;