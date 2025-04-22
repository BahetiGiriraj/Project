const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {listingSchema }= require("../schema.js");
const Review = require("../models/review.js");
const listing = require("../routes/listing");
const {isLoggegIn , validateListing} = require("../middleware.js")
const {isOwner} = require("../middleware.js")
const listingController = require("../controllers/listings.js")
const multer = require("multer");
const {storage} = require("../cloudConfig.js");

const upload = multer({storage});

//Index Route
router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggegIn,upload.single('listing[image]') , validateListing  ,wrapAsync(listingController.createListing));


//New ROUTE
router.get("/new" ,isLoggegIn, listingController.new )

//Category ROUTE
router.get("/category/:category", wrapAsync(listingController.categoryFilter));

//Show ROUTE (READ)
router.get("/:id" , wrapAsync( listingController.showListing))

//Create Route
// router.post("/"  ,isLoggegIn,validateListing , wrapAsync(listingController.createListing))

// /Edit Route
router.get("/:id/edit" , isLoggegIn , isOwner, wrapAsync( listingController.editListing))

//Update Route
router.put("/:id"  ,isLoggegIn , isOwner ,upload.single('listing[image]') ,  validateListing  ,wrapAsync( listingController.updateListing))

//Delete Route
router.delete("/:id" , isLoggegIn ,isOwner,  wrapAsync( listingController.deleteListing))



module.exports = router;
