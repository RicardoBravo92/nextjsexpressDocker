const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDb } = require('./config/db');
const Routes = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', Routes);

connectDb();
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.blue);
});
