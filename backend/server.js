const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeRoutes = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI = 'mongodb+srv://kathleendavis005_db_user:YY903MMO4EgU0QBK@cluster0.2ckiwpt.mongodb.net/recipebox?retryWrites=true&w=majority&appName=Cluster0';

app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipeRoutes);

app.get('/', (req, res) => {
    res.send('Recipe Box API is running');
});

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });