const Developer = require('../models/Developer');

module.exports = {
  async store(request, response) {
    const { developerId } = request.params;
    const { user } = request.headers;

    const loggedDeveloper = await Developer.findById(user);
    const targetDeveloper = await Developer.findById(developerId);

    if (!targetDeveloper || !loggedDeveloper) {
      return response.status(400).json({ error: 'Developer not found.' });
    }

    loggedDeveloper.dislikes.push(targetDeveloper._id);
    await loggedDeveloper.save();

    return response.json(loggedDeveloper);
  }
};
