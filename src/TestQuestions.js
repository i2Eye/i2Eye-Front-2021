const getTestQuestions = () => {
    return {
        "eyeScreening" : [
            {
                questionNum: 1,
                question: "SNC ID",
                type: "text",
                required: true
            }
        ],
        "doctorConsult" : [
            {
                questionNum: 1,
                question: "Urgent doctor's consult: Reason for consultation/chief complaint",
                type: "text",
                required: true
            },
            {
                questionNum: 2,
                question: "Urgent doctor's consult: Others (include prescriptions if any)",
                type: "text",
                required: true
            },
            {
                questionNum: 3,
                question: "Standard doctor's consult: Reason for consultation/chief complaint",
                type: "text",
                required: true
            },
            {
                questionNum: 4,
                question: "Standard doctor's consult: Others (include prescriptions if any)",
                type: "text",
                required: true
            },
        ],
       "bloodPressure" : [
            {
                questionNum: 1,
                question: "Is patient > 18 years old?",
                type: "radio",
                required: true,
                options: ["Yes", "No"]
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
   "bmi" : [
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
   ],
   "oralHealth": [
       { 
           questionNum: 1,
           question: "Dental ID", 
           type: "text",
           required: true
        },
        { 
            questionNum: 2,
            question: "Have you ever consumed in the past/present any form of intoxications e.g. tobacco beedit, cigarettes (include chewing/smoking)?", 
            type: "radio",
            required: true,
            options: ["Yes", "No"]
         },
         { 
            questionNum: 3,
            question: "If Y to having consumed, what do you consume?", 
            type: "text",
            required: false
         },
         { 
            questionNum: 4,
            question: "If Y to having consumed, how many pieces/sticks on average do you consume a day?", 
            type: "radio",
            required: false,
            options: ["<1 a day", "1-10 a day", ">10 a day"]
         },
         { 
            questionNum: 5,
            question: "If Y to having consumed, for how long have you been consuming?", 
            type: "text",
            required: false
         },
         { 
            questionNum: 6,
            question: "If Y to having consumed, why do you still consume?", 
            type: "text",
            required: false
         },
         { 
            questionNum: 7,
            question: "Are you still consuming?", 
            type: "radio",
            required: false,
            options: ["Yes", "No"]
         },
         { 
            questionNum: 8,
            question: "If N to consuming now, when did you stop consuming?", 
            type: "text",
            required: false
         },
         { 
            questionNum: 9,
            question: "If N to consuming now, why did you choose to stop?", 
            type: "text",
            required: false
         },
         { 
            questionNum: 10,
            question: "If Y to consuming now, have you tried quitting?", 
            type: "radio",
            required: false,
            options: ["Yes", "No"]
         },
         { 
            questionNum: 11,
            question: "If Y, for how long?", 
            type: "text",
            required: false
         },
         { 
            questionNum: 12,
            question: "If Y to having tried quitting, what made you consume again?", 
            type: "text",
            required: false
         },
   ],
   "phlebotomy": [
        {
           questionNum: 1,
           question: "Are you 40 years old or above?",
           type: "radio",
           required: true,
           options: ["Yes", "No"],
           helper: "If Yes, proceed with test. If No, check the following conditions.",
        },
        {
            questionNum: 3,
            question: "Vimta Registration No.",
            type: "text",
            required: false,
            helper: "Indicate NIL if did not fulfil any of the criteria for test.",
         },
         //add in checkbox question
   ],
   "fingerstickRCBG" : [
       { 
           questionNum: 1,
           question: "Is patient > 18 years old?", 
           type: "radio",
           required: true,
           options: ["Yes", "No"],
           helper: "If Yes, proceed. If No, skip RCBG station."
        },
        { 
            questionNum: 2,
            question: "Random capillary blood glucose (mg/dL)", 
            type: "text",
            required: false
     },
   ]
    }
}

export default getTestQuestions;
