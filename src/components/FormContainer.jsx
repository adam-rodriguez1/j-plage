import React, { useState } from 'react';
import './FormConteiner.css';

const FormContainer = ({ onNext }) => {
    const [gender, setGender] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [activityLevel, setActivityLevel] = useState('1.1');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!gender || !weight || !height || !age) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        if (isNaN(weight) || isNaN(height) || isNaN(age)) {
            setError('Veuillez entrer des valeurs numériques pour le poids, la taille et l’âge.');
            return;
        }

        setError('');

        const bmr =
            gender === 'male'
                ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
                : 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;

        const adjustedBMR = bmr * parseFloat(activityLevel);

        onNext({ gender, weight, height, age, activityLevel, dailyNeeds: adjustedBMR });
    };

    return (
        <div className="form-container">
            <h2>Commencons par calculer nos besoins journalier</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Genre:
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Sélectionnez...</option>
                        <option value="male">Homme</option>
                        <option value="female">Femme</option>
                    </select>
                </label>
                <label>
                    Poids (kg):
                    <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </label>
                <label>
                    Taille (cm):
                    <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} />
                </label>
                <label>
                    Âge:
                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                </label>
                <label>
                    Niveau d'activité:
                    <select
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                    >
                        <option value="1.1">Sédentaire</option>
                        <option value="1.2">Peu actif</option>
                        <option value="1.375">Modérément actif</option>
                        <option value="1.55">Actif</option>
                        <option value="1.725">Très actif</option>
                    </select>
                </label>
                <button type="button" onClick={handleSubmit}>
                    Suivant
                </button>
            </form>
        </div>
    );
};

export default FormContainer;
