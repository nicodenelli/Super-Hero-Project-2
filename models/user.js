const mongoose = require('mongoose');

// Create your User Model
const userSchema = new mongoose.Schema(
    {
      name: String,
      avatar: String,
      googleId: {
        type: String,
        required: true,
      }
    },
    
  );
  
  module.exports = mongoose.model("User", userSchema);