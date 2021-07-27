if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}


const mongoose = require('mongoose')
const Campground = require('../models/campground');
const cities = require('./cities')
const {places,descriptors} = require('./seedHelpers')

const dbUrl = process.env.DB_URL;
// || 'mongodb://localhost:27017/Yelp-Camp';


mongoose.connect( dbUrl,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connectted");
})

const sample = (array) => array[Math.floor(Math.random()*array.length)]

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<200;i++){
        const random1000 = Math.floor(Math.random()*1000)
        const price = Math.floor(Math.random()*20+10)
        const camp = new Campground({
            author: '60f6cb587ba14d41046e5fb2',
            geometry:{
                type:'Point',
                coordinates: [cities[random1000].longitude,
                                cities[random1000].latitude
                                ]
            },
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images:  [
                {
                  url: 'https://res.cloudinary.com/dpfbwlm4h/image/upload/v1626222038/YelpCamp/gfvt5bgvsbgjohcyufai.jpg',
                  filename: 'YelpCamp/gfvt5bgvsbgjohcyufai'
                },
                {
                  url: 'https://res.cloudinary.com/dpfbwlm4h/image/upload/v1626222045/YelpCamp/pfz8qkvc8abjxwhc0v9w.jpg',
                  filename: 'YelpCamp/pfz8qkvc8abjxwhc0v9w'
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt omnis rem pariatur soluta adipisci natus, quae laboriosam vitae in, repudiandae et atque! Aperiam illo non eum similique! Ut, minus repudiandae',
            price
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
});


