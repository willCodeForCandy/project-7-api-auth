const mongoose = require('mongoose');

const consoleSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
    releaseYear: { type: Number, trim: true },
    img: { type: String, trim: true }
  },
  {
    timestamps: true,
    collection: 'consoles'
  }
);

const Console = mongoose.model('console', consoleSchema, 'consoles');

module.exports = Console;
