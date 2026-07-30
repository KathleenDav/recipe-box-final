import React, { useState } from 'react';

const API_URL = 'https://recipe-box-backend-j2rk.onrender.com/api/recipes';

function RecipeCard({ recipe, onRecipeUpdated, onRecipeDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [rating, setRating] = useState(recipe.rating);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/${recipe._id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }

            onRecipeDeleted(recipe._id);
        } catch (err) {
            console.error(err);
            alert('Error deleting recipe.');
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${API_URL}/${recipe._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating })
            });

            if (!response.ok) {
                throw new Error('Failed to update recipe');
            }

            const updatedRecipe = await response.json();
            onRecipeUpdated(updatedRecipe);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            alert('Error updating recipe.');
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{recipe.category}</h6>
                <p className="card-text"><strong>Ingredients:</strong> {recipe.ingredients}</p>
                <p className="card-text"><strong>Instructions:</strong> {recipe.instructions}</p>

                {isEditing ? (
                    <div className="mb-2">
                        <label>Rating: </label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        />
                        <button className="btn btn-success btn-sm mx-2" onClick={handleUpdate}>
                            Save
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <p className="card-text">
                        <strong>Rating:</strong> {recipe.rating} / 5
                    </p>
                )}

                {!isEditing && (
                    <button className="btn btn-warning btn-sm me-2" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                )}
                <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default RecipeCard;