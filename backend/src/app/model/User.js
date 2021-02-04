const { Schema, model } = require("mongoose");
const PointSchema = require('./utils/PointSchema');

const UserSchema = new Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  // passions: [String],
  location: {
    type: PointSchema,
    index: '2dsphere' //para trabalhar com lat lng, pontos Y e X. 2dsphere = uma esfera 2d
  },
});

module.exports = model('User', UserSchema);