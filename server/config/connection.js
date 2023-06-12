const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://googlebooksapi:pasword12345@cluster0.biksjiy.mongodb.net/');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = mongoose.connection;
