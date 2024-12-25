import React, { useState } from 'react';
import './PostForm.css';

function PostForm({ onResponse }) {
    const [ingredients, setIngredients] = useState('');

    const validateIngredients = (ingredients) => {
        const lines = ingredients.split('\n').filter((line) => line.trim() !== '');
        return lines.every((line) => /^\d+/.test(line));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const lines = ingredients.split('\n').filter((line) => line.trim() !== '');
        if (!validateIngredients(ingredients)) {
            alert('Please enter valid ingredients. Each line should start with a quantity.');
            return;
        }

        const data = {
            title: 'Generic Recipe Title',
            ingr: lines,
        };

        try {
            const response = await fetch(
                `https://api.edamam.com/api/nutrition-details?6`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            onResponse(result);
        } catch (error) {
            console.error('Error:', error);
            onResponse({ error: 'Failed to fetch data. Please try again.' });
        }
    };

    const placeholderText = `
100gr oat
150gr chicken
1 yogourt
1 spoon olive oil
150gr rice
1 pizza`;

    return (
        <>
        <h2>Ce qu'on mange</h2>
            <p>Inscrivez ci dessous ce que vous manger dans une journée banal,en englais et en precisant les quantités </p>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={ingredients}
                    placeholder={placeholderText}
                    onChange={(e) => setIngredients(e.target.value)}
                />
                <label>Un aliment par ligne !</label>
                <button type="submit">Continuons</button>
            </form>
        </>
    );
}

export default PostForm;
