const express=require("express");
const path=require("path");
const app=express();
const port=80;
const bodyparser=require('body-parser');
const mongoose = require('mongoose');


//MONGOOSE SPECIFIC STUFF
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  //Define mongoose schema
  const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String

  });

  const Contact = mongoose.model('Contact', contactSchema);
  
  app.post('/contact',async (req,res)=>{
    const myData= new Contact(req.body);
    await myData.save();
    
    res.status(200).render('contact.pug');
    
});
  
}

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')); //for serving static files
app.use(express.urlencoded());


//PUG SPECIFIC STUFF
app.set('view engine','pug');  //set the template engine as pug
app.set('views',path.join(__dirname,'views'));  //set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params);
});

app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params);
});



//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});