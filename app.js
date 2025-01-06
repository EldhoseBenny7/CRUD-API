require('dotenv').config();
const express=require('express');
const expressLayout=require('express-ejs-layouts');
const methodOverride=require('method-override');

// flash message 
const flash= require('connect-flash');
const session= require('express-session');

const connectDB=require('./server/config/db');

const app=express();

const port=5000 || process.env.PORT;

//run the function
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//method override 
app.use(methodOverride('_method'));

//static files eg.html and css 
app.use(express.static('public'));

//express session
app.use(
    session({
        secret:'secret',
        resave: false,
        saveUninitialized: true,
        cookie:{
            maxAge:1000* 60 * 60* 24 *7, //1 week
        }
    })
);
//flash message 
app.use(flash({ sessionKeyName : 'flashMessage'}));


//template engine 
app.use(expressLayout);
app.set('layout','./layouts/main'); 
app.set('view engine','ejs'); 

//home page 
app.use('/',require('./server/routes/customer'));


//404 error
app.get('*',(req,res)=>{
    res.status(404).render('404');
});

app.listen(port,()=>{
    console.log('App listening on port 5000');
});