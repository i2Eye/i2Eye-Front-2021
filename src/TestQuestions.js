const getTestQuestions = () => {
    return {
       "bloodpressure" : [
            {
                questionNum: 1,
                question: "Is patient > 18 years old?",
                type: "radio",
                required: true
            },
            {
                questionNum: 2,
                question: "Systolic BP Reading 1 (mmHg)",
                type: "text",
                required: false
            },
            {
                questionNum: 3,
                question: "Diastolic BP Reading 1 (mmHg)",
                type: "text",
                required: false
            },
            {
                questionNum: 4,
                question: "Systolic BP Reading 2 (mmHg)",
                type: "text",
                required: false
            },
            {
                questionNum: 5,
                question: "Diastolic BP Reading 2 (mmHg)",
                type: "text",
                required: false
            },

       ],
       "fingerstickAnemia" : [
        {
            questionNum: 1,
            question: "Hb level (g/dL)",
            type: "text",
            required: true
        },
        {
            questionNum: 2,
            question: "How many meals do you eat a day?",
            type: "text",
            required: true
        },
        {
            questionNum: 3,
            question: "How often do you eat protein (eg. daal, mung, rajma, chole, chana)?",
            type: "radio",
            required: true,
            options: ["Never", "1-2 times a month", "1-3 times weekly", "4-5 times weekly", "Once a day", "More than once daily"]
        },
        {
            questionNum: 4,
            question: "How often do you eat carbohydrates (eg. chapati, rice)?",
            type: "radio",
            required: true,
            options: ["Never", "1-2 times a month", "1-3 times weekly", "4-5 times weekly", "Once a day", "More than once daily"]
        },
        {
            questionNum: 5,
            question: "How often do you eat vegetables (eg. gobhi, patta gobhi, saag)?",
            type: "radio",
            required: true,
            options: ["Never", "1-2 times a month", "1-3 times weekly", "4-5 times weekly", "Once a day", "More than once daily"]
        },
        {
            questionNum: 6,
            question: "How often do you eat sweets/desserts (eg. gulab jamun)?",
            type: "radio",
            required: true,
            options: ["Never", "1-2 times a month", "1-3 times weekly", "4-5 times weekly", "Once a day", "More than once daily"]
        },
   ],
   "BMI" : [
       {
           questionNum: 1,
           question: "Height (m)",
           type: "text",
           required: true
       },
       {
           questionNum: 2,
           question: "Weight (kg)",
           type: "text",
           required: true
       }, 
       {
           questionNum: 3,
           question: "Waist circumference (cm)",
           type: "text",
           required: true
       }
   ]    
    }
}

export default getTestQuestions;
