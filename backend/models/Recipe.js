const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);