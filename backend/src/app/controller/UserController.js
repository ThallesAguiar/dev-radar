const axios = require('axios');

const User = require('../model/User');
const { findConnections, sendMessage } = require('../../websocket');
// const parseStringAsArray = require('../../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  async store(req, res) {
    const {
      github_username,
      // passions, 
      latitude,
      longitude
    } = req.body;

    let user = await User.findOne({ github_username });

    if (!user) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      const { name = login, avatar_url } = apiResponse.data;

      // const passionsArray = parseStringAsArray(passions);
      const bio = apiResponse.data.bio.trim();

      const location = {
        type: "Point",
        coordinates: [longitude, latitude],
      };

      user = await User.create({
        github_username,
        name,
        avatar_url,
        bio,
        // passions: passionsArray,
        location
      });

      // Filtrar as conexões que estão há no máximo 10km de distância
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        // passionsArray
      );

      sendMessage(sendSocketMessageTo, 'new-user', user);
    }

    return res.json(user);
  }
}