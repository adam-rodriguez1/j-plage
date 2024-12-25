import React, { useEffect } from 'react';
import './ResponseDisplay.css';

function ResponseDisplay({ response, gender, weight, height, dailyNeeds, onResult }) {
    if (!response) return <p>No data yet.</p>;
    if (response.error) return <p>Error: {response.error}</p>;


    const idealWeight =
        gender === 'female'
            ? height - 100 - (height - 150) / 2.5
            : height - 100 - (height - 150) / 4;

  
    const caloricIntake = response.calories;
    const dailyCaloricDeficit = dailyNeeds - caloricIntake;
    const weightChangeRate = dailyCaloricDeficit / 7700; 
    const daysToIdealWeight =
        weightChangeRate !== 0
            ? Math.abs(weight - idealWeight) / Math.abs(weightChangeRate)
            : Infinity;

   
    const today = new Date();
    const finishDate = new Date();
    finishDate.setDate(today.getDate() + Math.ceil(daysToIdealWeight));

   
    let summerStartDate = new Date(today.getFullYear(), 5, 21); 
    if (finishDate > summerStartDate) {
        summerStartDate = new Date(today.getFullYear() + 1, 5, 21); 
    }

    const willAchieveBeforeSummer =
        isFinite(daysToIdealWeight) && finishDate <= summerStartDate;

    
    useEffect(() => {
        onResult(willAchieveBeforeSummer);
    }, [willAchieveBeforeSummer, onResult]);
console.log(0);
    return (
        <div className='final'>
            <h2>Resultat :</h2>
            <p>Votre poids <a href="https://fr.wikipedia.org/wiki/Poids_id%C3%A9al" target="_blank" rel="noopener noreferrer">
            idéal
        </a>: {idealWeight.toFixed(2)} kg</p>
            <p>
                Jour restant pour y arriver:{" "}
                {isFinite(daysToIdealWeight)
                    ? `${Math.ceil(daysToIdealWeight)} days`
                    : "Pas de deficit calorique, ca va être compliqué"}
            </p>
            <p>
    Date de fin estimée:{" "}
    {finishDate.toLocaleDateString('fr-FR', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long',
        day: 'numeric', 
    })}
</p>
            <p>
                Et enfin, l'été seras chaud ? (21 Juin):{" "}
                {willAchieveBeforeSummer ? "Oui" : "Non"}
            </p>
            <p className='rappel'>Rappel:Les régimes très basses calories (moins de 1 000 Kcal par jour) ne sont pas indiqués sauf
cas exceptionnels. Ils doivent être supervisés par un médecin spécialisé en nutrition. Et la <a href="https://www.has-sante.fr/upload/docs/application/pdf/2011-12/recommandation_obesite_adulte.pdf" target="_blank" rel="noopener noreferrer">haute autorité de la santé</a> conseille une perte de poids de 1 a 2 kg par mois. </p>
        </div>
        
    );
}

export default ResponseDisplay;
