const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");



require("./db/conn");
const Register = require("./models/register.js");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"..");
const template_path = path.join(__dirname,"../templates/views");
//const partials_path = path.join(__dirname, "/templates/partials");
app.use(express.static(static_path));
const main_path = path.join(__dirname,"../mainpg.html");
app.set("view engine","hbs");
const login_path = path.join(__dirname,"../templates/views/login.hbs");
const register_path = path.join(__dirname,"../templates/views/register.hbs");
const contact_path = path.join(__dirname,"../templates/views/contact.hbs");
const home_path = path.join(__dirname,"../olx1_html.html");
//app.set("views",template_path);
//hbs.registerPartials(partials_path);

app.use(express.urlencoded({extended:false}));

app.get("/",(req,res) => {
    res.sendFile(main_path);
});
app.get("/login",(req,res) => {
    res.render(login_path);
}); 
app.get("/contact",(req,res) => {
    res.render(contact_path);
}); 

app.post("/login",async(req,res) => {
    
    try{

        const email = req.body.email; 
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        if(useremail == null){
            res.send("INVALID CREDENTIALS !!!");
        }

        if(useremail.password === password){
            res.status(201).sendFile(home_path);
        }else{
            res.send("INVALID CREDENTIALS !!!");
        }


    } catch(error){
        res.status(400).send(error);
    }

});

app.get("/register",(req,res) => {
    res.render(register_path);
});

app.post("/register",async(req,res) => {

    try{

        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if(password === cpassword){
            const registerUser = new Register({
                name: req.body.name,
                phnumber: req.body.phnumber,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword,
            })

        const registered = await registerUser.save();
        res.status(201).render(login_path);
        }
        else
        {
            res.send("Passwords Don't Match");
        }

    } catch(error){
        res.status(400).send(error);
    }

})


//both are typs of call back functions
app.listen(port, () => {
    console.log(`Running at ${port}`);
    //console.log(partials_path);
});