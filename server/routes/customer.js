const express=require('express');
const router=express.Router();
const coustomerController=require('../controllers/coustomerController');

router.get('/',coustomerController.homepage);

router.get('/add',coustomerController.addCustomer);
router.post('/add',coustomerController.postCustomer);
// customer view route
router.get('/view/:id',coustomerController.view);

//to edit the customer details
router.get('/edit/:id',coustomerController.edit);
//to store the new values after updated
router.put('/edit/:id',coustomerController.editPost);

//to delete customer
router.delete('/edit/:id',coustomerController.deleteCustomer);

module.exports=router;