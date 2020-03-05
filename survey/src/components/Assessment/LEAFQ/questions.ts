const questions = {
  pages: [
   {
    name: "page0",
    elements: [
     {
      type: "html",
      name: "question1",
      titleLocation: "hidden"
     }
    ],
    title: "Pittsburgh Sleep Quality Index (PSQI)",
    description: "The following questions relate to your usual sleep habits during the past month only. Your answers should indicate the most accurate reply for the majority of days and nights in the past month. Please answer all questions."
   },
   {
    name: "page1",
    elements: [
     {
      type: "text",
      name: "q1",
      title: "During the past month, what time have you usually gone to bed at night?",
      validators: [
       {
        type: "numeric",
        minValue: 0,
        maxValue: 24
       }
      ],
      inputType: "number",
      maxLength: ""
     },
     {
      type: "radiogroup",
      name: "q2",
      title: "During the past month, how long (in minutes) has it usually taken you to fall asleep each night?",
      isRequired: true,
      choices: [
       {
        value: "0",
        text: "15 minutes or less"
       },
       {
        value: "1",
        text: "16 - 30 minutes"
       },
       {
        value: "2",
        text: "31 - 60 minutes"
       },
       {
        value: "3",
        text: "more then 60 minutes"
       }
      ]
     },
     {
      type: "text",
      name: "q3",
      title: "During the past month, what time have you usually gotten up in the morning?",
      validators: [
       {
        type: "numeric",
        minValue: 0,
        maxValue: 24
       }
      ],
      inputType: "number",
      maxLength: ""
     },
     {
      type: "radiogroup",
      name: "q4",
      title: "During the past month, how many hours of actual sleep did you get at night? (This may be different than the number of hours you spent in bed.)",
      isRequired: true,
      choices: [
       {
        value: "0",
        text: "more then 7 hours"
       },
       {
        value: "1",
        text: "6 - 7 hours"
       },
       {
        value: "2",
        text: "5 - 6 hours"
       },
       {
        value: "3",
        text: "less then 5 hours"
       }
      ]
     }
    ]
   },
   {
    name: "page2",
    elements: [
     {
      type: "matrix",
      name: "q5",
      title: "During the past month, how often have you had trouble sleeping because you...",
      isRequired: true,
      columns: [
       {
        value: "0",
        text: "Not during the past month"
       },
       {
        value: "1",
        text: "Less than once a week"
       },
       {
        value: "2",
        text: "Once or twice a week"
       },
       {
        value: "3",
        text: "Three or more times a week"
       }
      ],
      rows: [
       {
        value: "a",
        text: "... can not get to sleep within 30 minutes"
       },
       {
        value: "b",
        text: "... wake up in the middle of the night or early morning"
       },
       {
        value: "c",
        text: "... have to get up to use the bathroom"
       },
       {
        value: "d",
        text: "... can not breathe comfortably"
       },
       {
        value: "e",
        text: "... cough or snore loudly"
       },
       {
        value: "f",
        text: "... feel too cold"
       },
       {
        value: "g",
        text: "... feel too hot"
       },
       {
        value: "h",
        text: "... have bad dreams"
       },
       {
        value: "i",
        text: "... have pain"
       }
      ]
     },
     {
      type: "radiogroup",
      name: "q6",
      title: "During the past month, how often have you\ntaken medicine to help you sleep (prescribed or\n“over the counter”)?",
      isRequired: true,
      choices: [
       {
        value: "0",
        text: "Not during the past month"
       },
       {
        value: "1",
        text: "Less than once a week"
       },
       {
        value: "2",
        text: "Once or twice a week"
       },
       {
        value: "3",
        text: "Three or more times a week"
       }
      ],
      colCount: 4
     },
     {
      type: "radiogroup",
      name: "q7",
      title: "During the past month, how often have you had\ntrouble staying awake while driving, eating meals,\nor engaging in social activity?",
      isRequired: true,
      choices: [
       {
        value: "0",
        text: "Not during the past month"
       },
       {
        value: "1",
        text: "Less than once a week"
       },
       {
        value: "2",
        text: "Once or twice a week"
       },
       {
        value: "3",
        text: "Three or more times a week"
       }
      ],
      colCount: 4
     }
    ]
   },
   {
    name: "page3",
    elements: [
     {
      type: "radiogroup",
      name: "q8",
      title: "During the past month, how much of a problem\nhas it been for you to keep up enough enthusiasm\nto get things done?",
      isRequired: true,
      choices: [
       {
        value: "0",
        text: "No problem at all"
       },
       {
        value: "1",
        text: "Only a very slight problem"
       },
       {
        value: "2",
        text: "Somewhat of a problem"
       },
       {
        value: "3",
        text: "A very big problem"
       }
      ],
      colCount: 4
     },
     {
      type: "radiogroup",
      name: "q9",
      title: "During the past month, how would you rate\nyour sleep quality overall?",
      isRequired: true,
      choices: [
       {
        value: "0",
        text: "Very good"
       },
       {
        value: "1",
        text: "Fairly good"
       },
       {
        value: "2",
        text: "Fairly bad"
       },
       {
        value: "3",
        text: "Very bad"
       }
      ],
      colCount: 4
     },
     {
      type: "radiogroup",
      name: "q10",
      title: "Do you have a bed partner or room\nmate?",
      isRequired: true,
      choices: [
       {
        value: "0",
        text: "No bed partner or room mate"
       },
       {
        value: "1",
        text: "Partner/room mate in other room"
       },
       {
        value: "2",
        text: "Partner in same room but not same bed"
       },
       {
        value: "3",
        text: "Partner in same bed"
       }
      ],
      colCount: 4
     },
     {
      type: "matrix",
      name: "q10_1",
      visibleIf: "{q10} anyof [2, 3]",
      title: "Ask your partner/room mate how often in the past month you have\nhad...",
      isRequired: true,
      columns: [
       {
        value: "0",
        text: "Not during the past month"
       },
       {
        value: "1",
        text: "Less than once a week"
       },
       {
        value: "2",
        text: "Once or twice a week"
       },
       {
        value: "3",
        text: "Three or more times a week"
       }
      ],
      rows: [
       {
        value: "a",
        text: "... loud snoring"
       },
       {
        value: "b",
        text: "... long pauses between breaths while asleep"
       },
       {
        value: "c",
        text: "... legs twitching or jerking while you sleep"
       },
       {
        value: "d",
        text: "... episodes of disorientation or confusion during sleep"
       }
      ]
     }
    ]
   }
  ]
 };

export default questions;