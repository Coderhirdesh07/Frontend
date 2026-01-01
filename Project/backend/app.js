const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const cookieparser = require('cookie-parser');
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(cors({
  origin: 'http://localhost:5173', // React frontend port
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));





app.use('/api/users',userRoutes);
app.use('/api/task',taskRoutes);

module.exports = app;
