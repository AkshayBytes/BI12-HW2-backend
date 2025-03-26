const express = require("express")
const { initializeDatabase } = require("./db/db.connect")
const fs = require("fs")
const newHotels = require("./models/hotel.model")
const { error } = require("console")
initializeDatabase()
console.log(newHotels)
const app = express()
app.use(express.json());
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// const jsonData = fs.readFileSync("hotelsData.json", "utf-8")

// const theHotelsData = JSON.parse(jsonData);

// function seedData(){
//     try {
//         for(const theHotelData of theHotelsData ){

//             const thenewHotels = new newHotels({
//                 name: theHotelData.name,
//                 category: theHotelData.category,
//                 location: theHotelData.location,
//                 rating: theHotelData.rating,
//                 reviews: theHotelData.reviews,
//                 website: theHotelData.website,
//                 phoneNumber: theHotelData.phoneNumber,
//                 checkInTime: theHotelData.checkInTime,
//                 checkOutTime: theHotelData.checkOutTime,
//                 amenities: theHotelData.amenities,
//                 priceRange: theHotelData.priceRange,
//                 reservationsNeeded: theHotelData.reservationsNeeded,
//                 isParkingAvailable: theHotelData.isParkingAvailable,
//                 isWifiAvailable: theHotelData.isWifiAvailable,
//                 isPoolAvailable: theHotelData.isPoolAvailable,
//                 isSpaAvailable: theHotelData.isSpaAvailable,
//                 isRestaurantAvailable: theHotelData.isRestaurantAvailable,
//                 photos: theHotelData.photos
//             })
//             thenewHotels.save()
//         }
        
//     } catch (error) {
//         console.log("Error seeding the data.", error)
//     }
    

// }

async function letsCreateNewHotelData(theNewHotelData) {
    try {
        const soHotelData = new newHotels(theNewHotelData)
        
      //  soHotelData.email = req.body.email;
        // console.log(soHotelData.priceRange)
        // console.log(soHotelData)
        const newHotelData = await soHotelData.save()
        
        return newHotelData
    } catch (error) {
        throw error
    }
}

app.post("/hotels", async(req, res) => {
    try {
        const theActualHotelDataToSave = await letsCreateNewHotelData(req.body)
        res.status(202).json({message: "Hotel added succesfully",hotel: theActualHotelDataToSave })
    } catch (error){
        res.status(500).json({error: "Failed to fetch hotels."})
    }
})
//seedData()

async function toGetAllHotels(){
    try {
        const allHotels = await newHotels.find()
        //console.log(allHotels)
        return allHotels
    } catch (error) {
        throw error
    }
}

app.get("/hotels", async(req, res) => {
    try {
        const allHotels = await toGetAllHotels()
        if(allHotels){
            res.status(200).json(allHotels)
        }else{
            res.status(404).json({error: "Hotel not found"})
        }
        
    } catch (error) {
        res.status(500).json({error: "Failed to fetch the hotels"})
    }
})

//toGetAllHotels()

async function toReadHotelsByName(perticularHotelName){
    try {
        const hotelsByName = await newHotels.findOne({name: perticularHotelName})
        return hotelsByName
    } catch (error) {
        throw error
    }
    
}

app.get("/hotels/:hotelName", async(req, res) => {
    try {
        const theHotelName = await toReadHotelsByName(req.params.hotelName)
        if(theHotelName){
            res.status(200).json(theHotelName)
        }else{
            res.status(400).json({error: "Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch hotels."})
    }
})

//toReadHotelsByName("Sunset Resort")

async function toGetHotelsByPhoneNumber(perticularHotelPhoneNumber){
    try {
        const hotelsByPhoneNumber = await newHotels.findOne({phoneNumber: perticularHotelPhoneNumber})
        return hotelsByPhoneNumber
    } catch (error) {
        throw error
    }
}

app.get("/hotels/directory/:phoneNumber", async(req, res) => {
    try {
        const theHotelsByPhoneNumber = await toGetHotelsByPhoneNumber(req.params.phoneNumber)
        if(theHotelsByPhoneNumber){
            res.json(theHotelsByPhoneNumber)
        }else{
            res.status(400).json({error: "Hotel not found."})
        }
    } catch (error) {
            res.status(500).json({error: "Failed to fetch."})
    }
    
    
})

//toGetHotelsByPhoneNumber("+1234567890")

async function toGetHotelsByRating(perticularHotelRating) {
    try {
     const hotelsByRating = await newHotels.find({rating: perticularHotelRating });   
     return hotelsByRating
    } catch (error) {
     throw error   
    }
}

app.get("/hotels/rating/:hotelRating", async(req, res) => {
    try {
        const theHotelsByRating = await toGetHotelsByRating(req.params.hotelRating)
        if(theHotelsByRating){
            res.json(theHotelsByRating)
        }else{
            res.status(400).json({error: "Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch"})
    }
})

//toGetHotelsByRating(4)


async function  toGetAllHotelsByCategory(perticulatHotelCategory) {
    try {
        const hotelsByCategory = await newHotels.find({category:perticulatHotelCategory })
        return hotelsByCategory
    } catch (error) {
        throw error
    }
}

app.get("/hotels/category/:hotelCategory", async(req, res) => {
    try {
        const theHotelsByCategory = await toGetAllHotelsByCategory(req.params.hotelCategory)
        if(theHotelsByCategory){
            res.json(theHotelsByCategory)
        }else{
            res.status(400).json({error: "Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch the hotels."})
    }
})



async function letDeleteHotelByHotelId(theHotelIdToDelete) {
      try {
        const deletedHotel = await newHotels.findByIdAndDelete(theHotelIdToDelete)
        return deletedHotel
      } catch (error) {
        console.log(error)
      }    
}

app.delete("/hotels/:hotelId", async(req, res) => {
    try {
        const actuallyDeletedHotel = await letDeleteHotelByHotelId(req.params.hotelId)
        if(actuallyDeletedHotel){
            res.status(202).json({message: "Hotel deleted succesfully", theHotel: actuallyDeletedHotel })
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete the hotel."})
    }
})

//toGetAllHotelsByCategory("Mid-Range")
PORT = 3000
app.listen(PORT, () => {
    console.log("sever is running on PORT", PORT)
})







