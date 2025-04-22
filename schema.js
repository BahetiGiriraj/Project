// const Joi = require('joi');
// const review = require('./models/review');

// module.exports.listingSchema =Joi.object({
//     listing : Joi.object({
//         title : Joi.string().required() ,
//         description :  Joi.string().required(),
//         location :  Joi.string().required() , 
//         country :  Joi.string().required() , 
//         price :  Joi.number().required().min(0),
//         image :  Joi.string().allow("" , null)
//         category: Joi.string().valid("Trending", "Rooms", "Iconic Cities", "Mountains", "Beach", "Arctic", "Amazing Pools", "Camping", "Farms")
//     }).required()
// }) ;


// module.exports.reviewSchema = Joi.object({
//     review : Joi.object({
//         rating : Joi.number().required(),
//         comment : Joi.string().required()
//     }).required()
// })
const Joi = require('joi');
const review = require('./models/review');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null), // <- comma added here
        category: Joi.string().valid("Trending", "Rooms", "Iconic Cities", "Mountains", "Beach", "Arctic", "Amazing Pools", "Camping", "Farms")
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        comment: Joi.string().required()
    }).required()
});
