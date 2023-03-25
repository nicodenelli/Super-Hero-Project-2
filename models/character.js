const mongoose = require("mongoose");

// Define the Emedded Schema (NOT MODEL)
const quoteSchema = new mongoose.Schema(
  {
    quoteList: {
        type: String,
        unique: true
    }
  },
  
);

const weaponSchema = new mongoose.Schema(
    {
        weaponList: {
            type: String,
            unique: true
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
    quote: [quoteSchema],
    weapon: [weaponSchema], 
  },
);

module.exports = mongoose.model("Super", characterSchema);
