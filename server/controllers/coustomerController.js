const Customer=require('../models/Customer');
const mongoose=require('mongoose');


//coustomer routes 

exports.homepage=async(req,res)=>{

    const messages= await req.flash('info');

    try{
        const customers= await Customer.find({}).limit(22);
        res.render('index',{messages,customers});

    } catch(error) {
       console.log(error);
    }
   
} 

//new coustomer form

exports.addCustomer=async(req,res)=>{
    res.render('customer/add');
} 

//adding coustomer in form
exports.postCustomer=async(req,res)=>{

    const newCustomer= new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        details: req.body.details

    }); 

    try { 
        await Customer.create(newCustomer);
        await req.flash('info','New coustomer added.');

        res.redirect('/');

    } catch(error) {
         console.log(error);
    }
}  
// fore view customer details 
exports.view= async (req,res)=>{
   
    try{
       
        const customerId = req.params.id.trim(); // Remove any leading/trailing spaces
        const customer = await Customer.findById(customerId); 
        res.render('customer/view', { customer: customer });
    } catch(error) { 

        console.log(error);
    }
};
//to edit
exports.edit= async (req,res)=>{
   
    try{
       
        const customerId = req.params.id.trim(); // Remove any leading/trailing spaces
        const customer = await Customer.findById(customerId); 
        res.render('customer/edit', { customer: customer });
    } catch(error) { 

        console.log(error);
    }
}; 
//update customer data
exports.editPost= async (req,res)=>{
   
    try{
        await Customer.findByIdAndUpdate(req.params.id.trim(),{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            details: req.body.details,
            updateAt:Date.now()
        });
        res.redirect(`/edit/${req.params.id.trim()}`);

    } catch(error) {
        console.log(error);
    }
}; 
//to delete customer 
exports.deleteCustomer = async (req,res) =>{

    try{

        await Customer.deleteOne({_id:req.params.id.trim()});
        res.redirect("/");
    } catch(error) {

        console.log(error);
    }
}