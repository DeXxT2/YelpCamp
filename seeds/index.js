const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '65a9b560bc35e788c12edf28',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/djtaicbnx/image/upload/v1706050420/YelpCamp/znzxmnxexnpl8it9veyl.jpg',
                  filename: 'YelpCamp/znzxmnxexnpl8it9veyl',
                },
                {
                  // url: '' 'https://res.cloudinary.com/djtaicbnx/image/upload/v1706050440/YelpCamp/dvdbgd2ickcg1b47ylcl.jpg',
                  // filename: 'YelpCamp/dvdbgd2ickcg1b47ylcl',
                  url: 'https://res.cloudinary.com/djtaicbnx/image/upload/v1706751132/YelpCamp/cgct4xctaz9uk6dgby51.jpg',
                  filename: 'YelpCamp/cgct4xctaz9uk6dgby51',
          
                }
              ] 
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
