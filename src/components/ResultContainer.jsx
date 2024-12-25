import React from 'react';
import './ResultConteiner.css';

const ResultContainer = ({ formData }) => {
    const { gender, weight, height, age, activityLevel, manualCalories } = formData;

    const calculateBMR = () => {
        if (gender === 'male') {
            return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
        } else if (gender === 'female') {
            return 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
        }
        return 0;
    };

    const calculateAdjustedBMR = () => {
        const bmr = calculateBMR();
        return bmr * parseFloat(activityLevel);
    };

    return (
        <div className="result-container">
            <h2>Vos résultats</h2>
            {manualCalories ? (
                <p>
                    Vous avez indiqué un besoin calorique de :{' '}
                    <strong>{manualCalories} calories/jour</strong>.
                </p>
            ) : (
                <>
                    <p>
                        Votre métabolisme basal (BMR) est estimé à :{' '}
                        <strong>{calculateBMR().toFixed(2)} calories/jour</strong>
                    </p>
                    <p>
                        En prenant en compte votre niveau d’activité, vos besoins caloriques sont estimés à :{' '}
                        <strong>{calculateAdjustedBMR().toFixed(2)} calories/jour</strong>
                    </p>
                </>
            )}
        </div>
    );
};

export default ResultContainer;
    