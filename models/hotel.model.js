const mongoose = require("mongoose");

const hotelsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: [{
        type: String,
        required: true,
        enum: [
            "Resort",
            "Bed and breakfast",
            "Budget Hotels"
        ]
    }],
    location: {
        type: String,
        required: true
    },
    rating: Number,
    reviews: [{
        type: String
    }],
    website: String,
    phonenumber: String,
    checkintime: String,
    checkouttime: String,
    amenities: [{
        type: String
    }],
    pricerange: [{
        type: String,
        enum: [
            "1000 - 2500",
            "2500 - 5000",
            "5000 - 10000"
        ]
    }],
    reservationsneeded: Boolean,
    parkingavailable: Boolean,
    wifiavailable: Boolean,
    poolavailable: Boolean,
    spaavailable: Boolean,
    restaurantavailable: Boolean,
    photos: [{
        type: String
    }]
  
})

const newHotels = mongoose.model("newHotels", hotelsSchema );

module.exports = newHotels
