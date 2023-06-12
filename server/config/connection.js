const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://googlebooksapi:pasword12345@cluster0.biksjiy.mongodb.net/');

module.exports = mongoose.connection;
