require('dotenv').config();
const mongoose = require('mongoose');
const Console = require('../api/models/consoles');

const consoles = [
  {
    name: 'PlayStation 5',
    releaseYear: 2020,
    img: 'playstation-5.jpg'
  },
  {
    name: 'Xbox Series X',
    releaseYear: 2020,
    img: 'xbox-series-x.jpg'
  },
  {
    name: 'Nintendo Switch',
    releaseYear: 2017,
    img: 'nintendo-switch.jpg'
  },
  {
    name: 'Steam Deck',
    releaseYear: 2021,
    img: 'steam-deck.jpg'
  },
  {
    name: 'Nintendo Switch OLED',
    releaseYear: 2021,
    img: 'nintendo-switch-oled.jpg'
  },
  {
    name: 'PlayStation 4',
    releaseYear: 2013,
    img: 'playstation-4.jpg'
  },
  {
    name: 'Xbox One',
    releaseYear: 2013,
    img: 'xbox-one.jpg'
  },
  {
    name: 'Wii U',
    releaseYear: 2012,
    img: 'wii-u.jpg'
  },
  {
    name: 'PlayStation 3',
    releaseYear: 2006,
    img: 'playstation-3.jpg'
  },
  {
    name: 'Xbox 360',
    releaseYear: 2005,
    img: 'xbox-360.jpg'
  },
  {
    name: 'Wii',
    releaseYear: 2006,
    img: 'wii.jpg'
  },
  {
    name: 'PlayStation 2',
    releaseYear: 2000,
    img: 'playstation-2.jpg'
  },
  {
    name: 'Xbox',
    releaseYear: 2001,
    img: 'xbox.jpg'
  },
  {
    name: 'GameCube',
    releaseYear: 2001,
    img: 'gamecube.jpg'
  },
  {
    name: 'Dreamcast',
    releaseYear: 1998,
    img: 'dreamcast.jpg'
  }
];

const consoleDocuments = consoles.map((console) => new Console(console));

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    const allConsoles = await Console.find();

    if (allConsoles.length) {
      await Console.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await Console.insertMany(consoleDocuments);
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
