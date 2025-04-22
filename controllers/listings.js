const Listing = require("../models/listing");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: mapToken });

// module.exports.index = async (req,res) => {
//     // const allListings = await Listing.find({})
//     // res.render("../views/listing/index.ejs", {allListings});

// }
module.exports.index = async (req, res) => {
    let { category, country } = req.query;
    const filter = {};
  
    if (category) {
      filter.category = category;
    }
  
    if (country) {
      const key = country.trim().toLowerCase();
      const abbrMap = {
        'us': 'United States',
        'usa': 'United States',
        'uk': 'United Kingdom',
        'u.k.': 'United Kingdom',
        'uae': 'United Arab Emirates',
        'uae.': 'United Arab Emirates',
      };

      const normalized = abbrMap[key] || country.trim();
  
      filter.country = new RegExp(`^${normalized}$`, 'i');
    }
  
    const allListings = await Listing.find(filter);

    if (country && allListings.length === 0) {
      req.flash('error', `No listings found in "${country}"`);
      return res.redirect('/listing');
    }
  
    res.render('listing/index.ejs', {
      allListings,
      selectedCategory: category,
      searchCountry: country
    });
  };
  

module.exports.new = (req,res) => {
    res.render("../views/listing/new.ejs")
}
module.exports.showListing = async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path : "reviews" , populate : {
        path : "author"
    }}).populate("owner");
    if(!listing){
        req.flash("error" , "Listing you are trying to find does not exist");
        res.redirect("/listing");
    }
    res.render("../views/listing/show.ejs" , {listing});
}

module.exports.createListing =  async(req,res ,next) =>{
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()
       
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url , filename}
    newListing.geometry = response.body.features[0].geometry
    await newListing.save();
    req.flash("success" , "New Listing Created");
    res.redirect("/listing")   
}

module.exports.editListing = async (req,res) =>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error" , "Listing you are trying to find does not exist");
        res.redirect("/listing");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl  = originalImageUrl.replace("/upload" , "/upload/w_250")
    res.render("../views/listing/edit.ejs" , {listing , originalImageUrl});
}

module.exports.updateListing = async(req,res) =>{
    let {id} = req.params;
   let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing});

   if (typeof req.file  !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url , filename};
    await listing.save();
   }
  
   req.flash("success" , "Listing updated successfully! ");
   res.redirect(`/listing/${id}`);
}



module.exports.deleteListing = async (req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Deleted");
    res.redirect("/listing")
}

module.exports.categoryFilter = async (req, res) => {
    const { category } = req.params; 
    const allListings = await Listing.find({ category }); 
    
    
    if (allListings.length === 0) {
        req.flash("error", "No listings found for this category.");
        return res.redirect("/listing");
    }
    res.render("../views/listing/index.ejs", { 
        allListings, 
        selectedCategory: category 
    });
};
