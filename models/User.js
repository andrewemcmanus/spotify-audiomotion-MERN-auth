const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const favoritesSchema = new Schema({
// INFO FROM SPOTIFY API GOES HERE
// })

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  // favorites: [favoritesSchema]
})

module.exports = User = mongoose.model('User', userSchema);
