const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '651c4d7fc1961f032da81729',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, cupiditate. Aspernatur cumque voluptates est, necessitatibus possimus asperiores qui repellat eaque vero dolores eveniet autem ipsum tenetur laboriosam amet repellendus earum?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/drbqnahql/image/upload/v1696423411/YelpCamp/in6jvbkjxunrjj9xi0vo.jpg',
                    filename: 'YelpCamp/in6jvbkjxunrjj9xi0vo'
                },
                {
                    url: 'https://res.cloudinary.com/drbqnahql/image/upload/v1696423413/YelpCamp/bh56axhoez5agdl51dhl.jpg',
                    filename: 'YelpCamp/bh56axhoez5agdl51dhl'
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})