export const generateAIQuizQuestions = async ({
  subject = 'Mathematics',
  class: targetClass = '8',
  topic = 'Fractions',
  difficulty = 'Medium',
  numQuestions = 5,
  language = 'English'
}) => {
  const generated = [];
  const isOdia = language.toLowerCase() === 'odia';
  const normTopic = topic.toLowerCase().trim();

  // Custom libraries for subjects
  const mathFractions = {
    english: [
      { question: "Which of the following is an improper fraction?", options: ["3/4", "5/8", "7/4", "1/2"], correctAnswer: "7/4", explanation: "An improper fraction has a numerator greater than or equal to the denominator." },
      { question: "Simplify: 1/2 + 1/4", options: ["2/6", "3/4", "1/8", "2/4"], correctAnswer: "3/4", explanation: "1/2 + 1/4 = 2/4 + 1/4 = 3/4." },
      { question: "Convert 1.5 to a fraction in lowest terms.", options: ["1/5", "15/10", "3/2", "5/3"], correctAnswer: "3/2", explanation: "1.5 = 15/10 = 3/2." }
    ],
    odia: [
      { question: "ନିମ୍ନଲିଖିତ ମଧ୍ୟରୁ କେଉଁଟି ଏକ ଅପ୍ରକୃତ ଭଗ୍ନାଂଶ?", options: ["୩/୪", "୫/୮", "୭/୪", "୧/୨"], correctAnswer: "୭/୪", explanation: "ଅପ୍ରକୃତ ଭଗ୍ନାଂଶର ଲବ ହରଠାରୁ ବଡ଼ ବା ସମାନ ଅଟେ ।" },
      { question: "ସରଳ କର: ୧/୨ + ୧/୪", options: ["୨/୬", "୩/୪", "୧/୮", "୨/୪"], correctAnswer: "୩/୪", explanation: "୧/୨ + ୧/୪ = ୨/୪ + ୧/୪ = ୩/୪ ।" }
    ]
  };

  const mathDecimals = {
    english: [
      { question: "Convert 0.25 to a fraction in lowest terms.", options: ["1/2", "1/4", "3/4", "1/5"], correctAnswer: "1/4", explanation: "0.25 is equal to 25/100, which reduces to 1/4." },
      { question: "What is the sum of 0.4 and 0.05?", options: ["0.9", "0.45", "0.09", "0.405"], correctAnswer: "0.45", explanation: "0.40 + 0.05 = 0.45." },
      { question: "Solve: 0.1 * 10", options: ["0.1", "1", "10", "0.01"], correctAnswer: "1", explanation: "0.1 multiplied by 10 shifts the decimal right, resulting in 1." }
    ],
    odia: [
      { question: "୦.୨୫ କୁ ଏକ ଲଘିଷ୍ଠ ଭଗ୍ନାଂଶରେ ପରିଣତ କର ।", options: ["୧/୨", "୧/୪", "୩/୪", "୧/୫"], correctAnswer: "୧/୪", explanation: "୦.୨୫ = ୨୫/୧୦୦ = ୧/୪ ।" },
      { question: "୦.୪ ଏବଂ ୦.୦୫ ର ଯୋଗଫଳ କେତେ?", options: ["୦.୯", "୦.୪୫", "୦.୦୯", "୦.୪୦୫"], correctAnswer: "୦.୪୫", explanation: "୦.୪୦ + ୦.୦୫ = ୦.୪୫ ।" }
    ]
  };

  const scienceElectricity = {
    english: [
      { question: "What is the SI unit of electric current?", options: ["Volt", "Ohm", "Ampere", "Watt"], correctAnswer: "Ampere", explanation: "The SI unit of electric current is the Ampere (A)." },
      { question: "Which of the following is a good electrical conductor?", options: ["Copper", "Wood", "Glass", "Rubber"], correctAnswer: "Copper", explanation: "Copper is a metal with free electrons, making it an excellent electrical conductor." },
      { question: "What device is used to measure electrical potential difference?", options: ["Ammeter", "Galvanometer", "Voltmeter", "Ohmmeter"], correctAnswer: "Voltmeter", explanation: "A voltmeter is connected in parallel to measure voltage or potential difference." }
    ],
    odia: [
      { question: "ବିଦ୍ୟୁତ ସ୍ରୋତର SI ଏକକ କେଉଁଟି?", options: ["ଭୋଲ୍ଟ", "ଓମ୍", "ଆମ୍ପିୟର", "ୱାଟ"], correctAnswer: "ଆମ୍ପିୟର", explanation: "ବିଦ୍ୟୁତ ସ୍ରୋତର SI ଏକକ ହେଉଛି ଆମ୍ପିୟର (A) ।" },
      { question: "ନିମ୍ନଲିଖିତ ମଧ୍ୟରୁ କେଉଁଟି ଏକ ପରିବାହୀ ଅଟେ?", options: ["ତମ୍ବା", "କାଠ", "କାଚ", "ରବର"], correctAnswer: "ତମ୍ବା", explanation: "ତମ୍ବା ଏକ ଧାତୁ ହୋଇଥିବାରୁ ଏହା ମଧ୍ୟ ଦେଇ ସହଜରେ ବିଦ୍ୟୁତ ପ୍ରବାହିତ ହୋଇପାରେ ।" }
    ]
  };

  const scienceLight = {
    english: [
      { question: "What is the speed of light in vacuum?", options: ["3 x 10^5 m/s", "3 x 10^8 m/s", "3 x 10^6 m/s", "1.5 x 10^8 m/s"], correctAnswer: "3 x 10^8 m/s", explanation: "Light travels at approximately 300,000 km/s, which is 3 x 10^8 m/s in scientific notation." },
      { question: "Which mirror is used as a rear-view mirror in vehicles?", options: ["Concave mirror", "Plane mirror", "Convex mirror", "Double mirror"], correctAnswer: "Convex mirror", explanation: "Convex mirrors diverge light, providing a wider field of view for drivers." }
    ],
    odia: [
      { question: "ଶୂନ୍ୟରେ ଆଲୋକର ବେଗ କେତେ?", options: ["୩ x ୧୦^୫ ମି./ସେ.", "୩ x ୧୦^୮ ମି./ସେ.", "୩ x ୧୦^୬ ମି./ସେ.", "୧.୫ x ୧୦^୮ ମି./ସେ."], correctAnswer: "୩ x ୧୦^୮ ମି./ସେ.", explanation: "ଶୂନ୍ୟରେ ଆଲୋକର ବେଗ ପ୍ରାୟ ୩ x ୧୦^୮ ମିଟର ପ୍ରତି ସେକେଣ୍ଡ ଅଟେ ।" }
    ]
  };

  // Select appropriate topic template or generate dynamically
  let questionsPool = [];
  if (normTopic.includes('fraction')) {
    questionsPool = isOdia ? mathFractions.odia : mathFractions.english;
  } else if (normTopic.includes('decimal')) {
    questionsPool = isOdia ? mathDecimals.odia : mathDecimals.english;
  } else if (normTopic.includes('electri')) {
    questionsPool = isOdia ? scienceElectricity.odia : scienceElectricity.english;
  } else if (normTopic.includes('light')) {
    questionsPool = isOdia ? scienceLight.odia : scienceLight.english;
  }

  // Fallback dynamic generator if no templates match
  if (questionsPool.length === 0) {
    const defaultEng = [
      {
        question: `Which statement represents a key principle of ${topic}?`,
        options: [
          `It defines the core properties of ${topic} in ${subject}.`,
          `It is unrelated to basic ${subject} concepts.`,
          `It only applies in high-energy laboratory systems.`,
          `It represents a classic misconception of ${topic}.`
        ],
        correctAnswer: `It defines the core properties of ${topic} in ${subject}.`,
        explanation: `This is a fundamental introductory question analyzing the concept of ${topic} under ${subject}.`
      },
      {
        question: `Identify the main application or utility of ${topic}.`,
        options: [
          `Solving structured exercises in ${subject}.`,
          `Increasing network processing speed.`,
          `Testing laboratory instruments.`,
          `Analyzing literary scripts.`
        ],
        correctAnswer: `Solving structured exercises in ${subject}.`,
        explanation: `Understanding ${topic} helps in practical problem solving within ${subject}.`
      },
      {
        question: `What is a common student misconception when learning about ${topic}?`,
        options: [
          `Confusing the foundational formulas of ${topic}.`,
          `Applying direct solutions correctly.`,
          `Recognizing diagram configurations.`,
          `Overestimating classroom time requirements.`
        ],
        correctAnswer: `Confusing the foundational formulas of ${topic}.`,
        explanation: `Identifying common errors in ${topic} helps teachers design better interventions.`
      }
    ];

    const defaultOdia = [
      {
        question: `${topic} ସମ୍ବନ୍ଧରେ କେଉଁ କଥନଟି ସତ୍ୟ ଅଟେ?`,
        options: [
          `ଏହା ${subject} ବିଷୟରେ ${topic} ର ମୌଳିକ ନିୟମକୁ ବୁଝାଇଥାଏ ।`,
          `ଏହାର ${subject} ସହିତ କୌଣସି ସମ୍ବନ୍ଧ ନାହିଁ ।`,
          `ଏହା କେବଳ ଉଚ୍ଚ ଶ୍ରେଣୀ ପାଇଁ ପ୍ରଯୁଜ୍ୟ ।`,
          `ଏହା ଏକ ଭୁଲ ଧାରଣା ଅଟେ ।`
        ],
        correctAnswer: `ଏହା ${subject} ବିଷୟରେ ${topic} ର ମୌଳିକ ନିୟମକୁ ବୁଝାଇଥାଏ ।`,
        explanation: `ଏହି ପ୍ରଶ୍ନଟି ${subject} ଅନ୍ତର୍ଗତ ${topic} ର ମୌଳିକ ଧାରଣାକୁ ଆଧାର କରି ଗଠିତ ।`
      },
      {
        question: `${topic} ର ମୁଖ୍ୟ ବ୍ୟବହାର କେଉଁଠି ଦେଖିବାକୁ ମିଳେ?`,
        options: [
          `${subject} ର ବିଭିନ୍ନ ଗାଣିତିକ ସମସ୍ୟାର ସମାଧାନ ପାଇଁ ।`,
          `କେବଳ କମ୍ପ୍ୟୁଟର ଚଲାଇବା ପାଇଁ ।`,
          `ପରୀକ୍ଷାଗାର ଉପକରଣ ପ୍ରସ୍ତୁତ କରିବା ପାଇଁ ।`,
          `ଇତିହାସ ପାଠ ପଢିବା ପାଇଁ ।`
        ],
        correctAnswer: `${subject} ର ବିଭିନ୍ନ ଗାଣିତିକ ସମସ୍ୟାର ସମାଧାନ ପାଇଁ ।`,
        explanation: `${topic} ର ମୌଳିକ ଜ୍ଞାନ ଆମକୁ ବ୍ୟବହାରିକ କ୍ଷେତ୍ରରେ ସାହାଯ୍ୟ କରିଥାଏ ।`
      }
    ];

    questionsPool = isOdia ? defaultOdia : defaultEng;
  }

  // Populate requested count
  for (let i = 0; i < numQuestions; i++) {
    // Round-robin selection if count exceeds pool size
    const template = questionsPool[i % questionsPool.length];
    generated.push({
      ...template,
      difficulty
    });
  }

  return generated;
};
