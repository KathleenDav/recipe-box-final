import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import RecipeForm from './RecipeForm';

const API_URL = 'https://recipe-box-backend-j2rk.onrender.com/api/recipes';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setRecipes(data);
        } catch (err) {
            console.error('Error fetching recipes:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRecipeAdded = (newRecipe) => {
        setRecipes((prev) => [...prev, newRecipe]);
    };

    const handleRecipeUpdated = (updatedRecipe) => {
        setRecipes((prev) =>
            prev.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
        );
    };

    const handleRecipeDeleted = (id) => {
        setRecipes((prev) => prev.filter((r) => r._id !== id));
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">My Recipe Box</h1>
            <RecipeForm onRecipeAdded={handleRecipeAdded} />
            <hr />
            <h2>Saved Recipes</h2>
            {loading ? (
                <p>Loading recipes...</p>
            ) : recipes.length === 0 ? (
                <p>No recipes yet. Add one above!</p>
            ) : (
                recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe._id}
                        recipe={recipe}
                        onRecipeUpdated={handleRecipeUpdated}
                        onRecipeDeleted={handleRecipeDeleted}
                    />
                ))
            )}
        </div>
    );
}

export default RecipeList;