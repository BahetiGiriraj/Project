if (process.env.NODE_ENV !="production"){
    require('dotenv').config()
}
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError.js");
const passport = require('passport');
const LocalStrategy = require("passport-local")
const privacyRoutes = require('./routes/privacy');



// Models
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const User = require("./models/user.js")

// Routes
const listingRoutes = require("./routes/listing");
const reviewRoutes = require("./routes/review");
const userRoutes = require("./routes/user");
const privacyRoutes = require("./routes/privacy");





const dbURL = process.env.ATLASDB_URL
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(dbURL);
}

app.use('/', privacyRoutes); 
// View engine setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl : dbURL,
    crypto : {
        secret : process.env.SECRET
    },
    touchAfter : 24 * 3600
})

store.on("error" , () =>{
    console.log("Error in mongo session store" , err);
})

const sessionOptions = {
    store : store,
    secret: process.env.SECRET ,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};




app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// Routes
app.use("/listing", listingRoutes);
app.use("/listing/:id/reviews", reviewRoutes);
app.use("/" , userRoutes)

app.get("/", (req, res) => {
    res.redirect("/listing")
});


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
});


app.listen(8080, () => {
    console.log("Server is running on port 8080");
});


