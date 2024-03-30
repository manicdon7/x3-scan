// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB URI
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Define a Mongoose schema and model for POS data
const posSchema = new mongoose.Schema({
    _id: String,
    lex: String,
    tokens: String,
    fullCode: String,
    ast: String,
    parser: String,
    result: String,
    context: String,
    symbolTable: String,
    executionTime: Number,
    resultValue: String,
    account: String,
    type: String,
    transaction: Object
});

const POSModel = mongoose.model('POS', posSchema);

app.get('/api/pos', async (req, res) => {
    try {
        const posData = await POSModel.find({});
        res.json(posData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/api/pos/core', async (req, res) => {
    try {
        const corePosData = await POSModel.find({ type: 'core' });
        res.json(corePosData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/pos/polygon', async (req, res) => {
    try {
        const polygonPosData = await POSModel.find({ type: 'polygon' });
        res.json(polygonPosData);
        console.log(res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
