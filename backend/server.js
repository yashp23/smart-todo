const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const port = process.env.PORT || 5000;
const app = express();

// Import routes

const register = require('./routes/register');

const login = require('./routes/login');

const addtask = require('./routes/todo');

const logout = require('./routes/logout');

// Connect to MongoDB  parmaryash305  lJ6u0qx4tuVBCZiZ
mongoose.connect('mongodb+srv://parmaryash305:lJ6u0qx4tuVBCZiZ@cluster0.bkkje.mongodb.net/my-todo-smart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

// Middleware to handle CORS

app.use(cors());
app.use(express.json());


app.use('/api', register);
app.use('/api', login);
app.use('/api', addtask)
app.use('/api', logout)

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})