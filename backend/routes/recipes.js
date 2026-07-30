const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET a single recipe by id
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new recipe
router.post('/', async (req, res) => {
    try {
        const { title, category, ingredients, instructions, rating } = req.body;
        const newRecipe = new Recipe({ title, category, ingredients, instructions, rating });
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT (update) an existing recipe
router.put('/:id', async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a recipe
router.delete('/:id', async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json({ message: 'Recipe deleted', recipe: deletedRecipe });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;