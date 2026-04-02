const express= require("express");
const app= express();
const mongoose= require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");

app.use(express.urlencoded({ extended: true }));

const MONGO_URL="mongodb://127.0.0.1:27017/travelnest";

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view enjine","ejs");
app.set("views",path.join(__dirname,"views"));

// app.get("/testlisting",async (req,res)=>{
//     let sampleListing = new Listing({
//         title: "My Villa",
//         description: "Coolest Villa ever",
//         price:2999,
//         location:"Goa",
//         country:"India",
//     })
//     await sampleListing.save();
//     console.log("Sample saved");
//     res.send("Successful");
// })


app.get("/",(req,res)=>{
    res.send("hey");
});
//Index Route
app.get("/listings",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})

//New Route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
})

//Show Route
app.get("/listings/:id", async (req,res)=>{
    let {id}= req.params;
    const listing= await Listing.findById(id);
    res.render("listings/show.ejs",{id});
})

//Create Rounte
app.post("/listings", async (req,res)=>{
    const newListing= new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
});