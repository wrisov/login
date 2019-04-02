
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
const Schema = mongoose.Schema;
const User= new Schema({
    email: {
    type: String,
    required: true
    
    },
    password:{
        type: String,
    required: true
    }
});


app.get('/signin',(req,res,next) => {
    res.write('<html>');
    res.write('<form action="http://localhost:3000/signin_submit" method="POST">');
   // res.write('<input type="text" name="uname" placeholder="Enter Full Name"> <br>'); 
    res.write('<input type="email" name="uemail" placeholder="Enter Email-Address"> <br>'); 
    res.write('<input type="password" name="upassword" placeholder="Enter Password"> <br>'); 
    //res.write('<button type="submit">Create New </button><br>');
    res.write('<button type="submit">Log In</button>');
    res.write('</form>');
    res.write('</html>');
    const email = req.body.uemail;
    const passin =  req.body.upassword;
    User.findOne({email:email})
    .then(user => {
        if(!user){
        return res.send("No user found!");
        }
        if(user.password==passin){
            return res.send("Logged in!");
        }
        else
        return res.send("Wrong info!");
    });
});

app.get('/signup',function(req,res){
 res.write('<html>');
res.write('<form action="http://localhost:3000/signup_submit" method="POST">');
res.write('<input type="text" name="name" placeholder="Enter Full Name"> <br>'); 
res.write('<input type="email" name="email" placeholder="Enter Email-Address"> <br>'); 
res.write('<input type="password" name="password" placeholder="Enter Password"> <br>'); 
res.write('<button type="submit">Create New </button><br>');
//res.write('<a href=http://localhost:3000/signin><button type="button">Log In</button></a>');
res.write('</form>');
res.write('</html>');
const name = req.body.name;
const email = req.body.email;
const pass=req.body.password;
User.findOne({email:email})
.then(userDoc =>{
    if(userDoc){
        res.send("User exists!");
    }
    const user = new User({
        email:email,
        password:pass
    });
return user.save();
})
.then(result => {
    res.send("Signed up!");
})
.catch(err =>{
    console.log(err);
});
});


app.post('/signup_submit',function(req,res){
console.log(req.body)
res.send("<h1>Sucess!<h1>");
});
app.post('/signin_submit',function(req,res){
    console.log(req.body)
    res.send("<h1>Sucess!<h1>");
    });

mongoose.connect('mongodb+srv://wrisov:wrisov@cluster0-fj4x6.mongodb.net/test?retryWrites=true').then(result =>{
    app.listen(3000,function(){
        console.log("Server on!");
    });
}).catch(err => {
    console.log(err);
})  ;  

