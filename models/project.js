const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: String,
    owner: mongoose.Schema.Types.ObjectId,
    collaborators: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Project', ProjectSchema);