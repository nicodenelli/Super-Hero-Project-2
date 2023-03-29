const mongoose = require("mongoose");

// Define the Emedded Schema (NOT MODEL)
const quoteSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    quotes: {
        type: String,
        required: true
    }
  },
  
);


const characterSchema = new mongoose.Schema(
  {
    character: {
      type: String,
      required: true,
    },
    age: Number,
    powerLevel: Number,
    weapon: {
      type: String,
      required: true
    },
    quote: [quoteSchema],
  },
);

module.exports = mongoose.model("Super", characterSchema);
