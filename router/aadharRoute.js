const express = require('express');
const router = express.Router();
const { adminLogin, userLogin } = require('../middleware/authverify')
const { AadharController } = require('../controller/aadharController');
const aadhar = new AadharController;


// create aadhar
router.post('/create', adminLogin, aadhar.createAadhar)

// view user aadhar
router.get('/view', userLogin, aadhar.viewAadharDetail)

// view all aadhar for admin
router.get('/viewAll', adminLogin, aadhar.viewAll)

//view all aadhar based on state for admin
router.get('/viewAll/:state', adminLogin, aadhar.viewAllBasedOnState)



module.exports = router;
