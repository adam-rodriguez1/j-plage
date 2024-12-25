import React, { useState } from 'react';
import FormContainer from './components/FormContainer';
import PostForm from './components/PostForm';
import ResponseDisplay from './components/ResponseDisplay';
import './App.css';
import { motion } from 'framer-motion';

function App() {
    const [step, setStep] = useState(2);
    const [formData, setFormData] = useState({
        gender: '',
        weight: '',
        height: '',
        age: '',
        activityLevel: '1.1',
        dailyNeeds: 0,
    });
    const [apiResponse, setApiResponse] = useState(null);
    const [willAchieveBeforeSummer, setWillAchieveBeforeSummer] = useState(null);

    const handleNext = (data) => {
        setFormData((prevData) => ({ ...prevData, ...data }));
        setStep(step + 1);
    };
//
    const handleApiResponse = (response, willAchieve) => {
        setApiResponse(response);
        setWillAchieveBeforeSummer(willAchieve);
        setStep(4);
    };

   let stepImages = [
        'src/assets/image1.jpg',
        'src/assets/image2.jpg',
        willAchieveBeforeSummer ? 'src/assets/image3succes.jpg' : 'src/assets/image3echec.jpg',
    ];

    return (
        <div className="app-container">
            <h1>J-plage </h1>
            <div className='content-image-conteiner'>
            <div className="content-container">
                {step === 2 && <FormContainer onNext={handleNext} />}
                {step === 3 && <PostForm onResponse={handleApiResponse} />}
                {step === 4 && (
                    <ResponseDisplay
                        response={apiResponse}
                        gender={formData.gender}
                        weight={formData.weight}
                        height={formData.height}
                        dailyNeeds={formData.dailyNeeds}
                        onResult={(willAchieve) => setWillAchieveBeforeSummer(willAchieve)}
                    />
                )}
            </div>
            <div className="image-container">
                <motion.img
                    key={step}
                    src={stepImages[step - 2]}
                    alt={`Step ${step}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="step-image"
                />
            </div>
            </div>
        </div>
    );
}

export default App;
