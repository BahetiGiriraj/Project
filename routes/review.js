const express = require("express");
const router = express.Router({mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { reviewSchema}= require("../schema.js");
const Review = require("../models/review.js");
const listing = require("../routes/listing");
const {validateReview, isLoggegIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/review.js")

//Reviews Route
router.post("/",isLoggegIn ,  validateReview, wrapAsync(reviewController.addReview));

// delete review route
router.delete("/:reviewId",isLoggegIn ,isReviewAuthor ,  wrapAsync(reviewController.deleteReview));


module.exports = router;