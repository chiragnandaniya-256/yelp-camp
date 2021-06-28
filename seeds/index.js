const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60d1b8cc9eb7f831fcaf2cc4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. A dignissimos vel, ex expedita ipsum minus officia nulla eos explicabo autem cum officiis sequi nostrum illo? Pariatur, aliquid. Pariatur, blanditiis porro?',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dma8yeqkw/image/upload/v1624449641/YelpCamp/qrbbz8kwvaqabthql2p6.jpg',
                    filename: 'YelpCamp/qrbbz8kwvaqabthql2p6'
                },
                {
                    url: 'https://res.cloudinary.com/dma8yeqkw/image/upload/v1624449641/YelpCamp/x5ofmhrpekjf3eq5paui.jpg',
                    filename: 'YelpCamp/x5ofmhrpekjf3eq5paui'
                },
                {
                    url: 'https://res.cloudinary.com/dma8yeqkw/image/upload/v1624449641/YelpCamp/zliui73dijtf9fkqobq7.jpg',
                    filename: 'YelpCamp/zliui73dijtf9fkqobq7'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database closed!');
})

