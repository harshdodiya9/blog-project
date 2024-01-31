const express = require('express');
const port = 8001;
const app = express();
const path = require('path');

// const db = require("./config/mongoose");
const Admin = require("./models/admin");

//harsh
const mongoose = require('mongoose')
mongoose.connect(("mongodb+srv://dodiyaharsh99:harsh123@cluster0.zqnwysw.mongodb.net/blog"), {
     useUnifiedTopology: true,
     useNewUrlParser: true
 })
     .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


// cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const session = require('express-session');

const passport = require('passport');
const passportlocal = require('./config/passport-local');

app.use(express.urlencoded());
app.use(session({
      name : "harsh",
      secret : "harsh",
      resave : false,
      saveUninitialized: true,
       cookie : {
           maxAge : 1000*60*100
       }
}))

app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuth);
// routing
app.use('/',require('./routes/user'));
app.use("/admin",require("./routes/admin"));
app.use(express.static(path.join(__dirname,"assets")));
app.use(express.static(path.join(__dirname,"user_assets")));
app.use("/uploades",express.static(path.join(__dirname,"uploades")));


app.listen(port,function(err){
    if(err)
    console.log(err);

    console.log(`Server is running port :${port}`);
})