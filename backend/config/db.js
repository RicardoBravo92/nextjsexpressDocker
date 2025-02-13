require('dotenv').config();
require('colors');

const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB online'.rainbow);
  } catch (error) {
    console.log(error);
    throw new Error('Error db conection');
  }
};
module.exports = {
  connectDb,
};
