export const aiApi = {
  askDoubt: async ({ query, language }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isOdia = language === 'or';
        const lowerQ = query.toLowerCase();
        
        let ansEn = "That's a great question! Here is a simple explanation for you: ";
        let ansOr = "ଏହା ଏକ ବହୁତ ଭଲ ପ୍ରଶ୍ନ! ଆପଣଙ୍କ ପାଇଁ ଏକ ସରଳ ବୁଝାମଣା ଏଠାରେ ଅଛି: ";
        
        if (lowerQ.includes('3/4') || lowerQ.includes('fraction')) {
          ansEn += "3/4 is greater than 1/2 because if you have a pizza cut into 4 slices, 3 slices (3/4) is more than 2 slices (which is 1/2).";
          ansOr += "3/4 1/2 ଠାରୁ ବଡ କାରଣ ଯଦି ଆପଣ ଏକ ପିଜାକୁ 4 ଖଣ୍ଡରେ କାଟିବେ, 3 ଖଣ୍ଡ (3/4) 2 ଖଣ୍ଡ (ଯାହା 1/2) ଠାରୁ ଅଧିକ ଅଟେ।";
        } else if (lowerQ.includes('water cycle') || lowerQ.includes('rain')) {
          ansEn += "The water cycle happens when the sun heats lakes (like Chilika) turning water into vapor. It goes up, forms clouds, and falls as rain!";
          ansOr += "ଜଳ ଚକ୍ର ଘଟେ ଯେତେବେଳେ ସୂର୍ଯ୍ୟ ହ୍ରଦ (ଚିଲିକା ପରି) ଗରମ କରି ଜଳକୁ ବାଷ୍ପରେ ପରିଣତ କରେ। ଏହା ଉପରକୁ ଯାଇ ମେଘ ସୃଷ୍ଟି କରେ ଏବଂ ବର୍ଷା ଭଳି ଖସିଯାଏ!";
        } else {
          ansEn += "Always remember to break down complex problems into smaller parts. You are doing great!";
          ansOr += "ସର୍ବଦା ମନେରଖନ୍ତୁ ଜଟିଳ ସମସ୍ୟାଗୁଡ଼ିକୁ ଛୋଟ ଅଂଶରେ ବିଭକ୍ତ କରିବାକୁ। ଆପଣ ବହୁତ ଭଲ କରୁଛନ୍ତି!";
        }
        
        resolve({
          answer: ansEn,
          answerOdia: ansOr,
          example: "Imagine sharing a cake with your friends.",
          exampleOdia: "ଆପଣଙ୍କ ସାଙ୍ଗମାନଙ୍କ ସହିତ ଏକ କେକ୍ ବାଣ୍ଟିବା କଳ୍ପନା କରନ୍ତୁ।",
          encouragement: "Keep asking brilliant questions!",
          encouragementOdia: "ଚମତ୍କାର ପ୍ରଶ୍ନ ପଚାରିବା ଜାରି ରଖନ୍ତୁ!",
          newDifficultyLevel: "Explorer Level 2"
        });
      }, 1500); // 1.5s delay to simulate network
    });
  },
  
  speakText: (text, lang) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang || 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  },
  
  stopSpeech: () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};

export default aiApi;
