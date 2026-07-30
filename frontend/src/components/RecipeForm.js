import React, { useState } from 'react';

const API_URL = 'http://localhost:5000/api/recipes';

function RecipeForm({ onRecipeAdded }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRecipe = { title, category, ingredients, instructions, rating };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecipe)
            });

            if (!response.ok) {
                throw new Error('Failed to add recipe');
            }

            const savedRecipe = await response.json();
            onRecipeAdded(savedRecipe);

            setTitle('');
            setCategory('');
            setIngredients('');
            setInstructions('');
            setRating(0);
        } catch (err) {
            console.error(err);
            alert('Error adding recipe. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="recipe-form">
            <h2>Add a New Recipe</h2>
            <div className="mb-2">
                <input
                    type="text"
                    placeholder="Title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <input
                    type="text"
                    placeholder="Category (e.g. Dinner, Dessert)"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <textarea
                    placeholder="Ingredients"
                    className="form-control"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <textarea
                    placeholder="Instructions"
                    className="form-control"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    required
                />
            </div>
            <div className="mb-2">
                <label>Rating (0-5): </label>
                <input
                    type="number"
                    min="0"
                    max="5"
                    className="form-control"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Recipe</button>
        </form>
    );
}

export default RecipeForm;