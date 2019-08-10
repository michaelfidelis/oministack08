const axios = require('axios');
const Developer = require('../models/Developer');

module.exports = {

  async index(request, response) {
    const { user } = request.headers;
    const loggedDeveloper = await Developer.findById(user);

    const users = await Developer.find({
      $and: [
        { _id: { $ne: user }},
        { _id: { $nin: loggedDeveloper.likes }},
        { _id: { $nin: loggedDeveloper.dislikes }}
      ]
    });

    return response.json(users);
  },

  async store(request, response) {
    const { username } = request.body;

    const githubResponse = await axios.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url: avatar} = githubResponse.data;

    const userExists = await Developer.findOne({ user: username });

    if (userExists) {
        return response.json(userExists);
    }

    const createdDeveloper = await Developer.create({
        name,
        user: username,
        bio,
        avatar
    });

    return response.json(createdDeveloper);
  }
};
