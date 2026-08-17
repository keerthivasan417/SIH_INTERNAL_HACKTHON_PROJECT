// 6th to 12th Grade Curriculum Data for Gamified Learning Map
export const GRADE_OPTIONS = [
  { id: 'class6', label: 'Class 6', labelOdia: 'ଷଷ୍ଠ ଶ୍ରେଣୀ', levelRange: '6th Grade' },
  { id: 'class7', label: 'Class 7', labelOdia: 'ସପ୍ତମ ଶ୍ରେଣୀ', levelRange: '7th Grade' },
  { id: 'class8', label: 'Class 8', labelOdia: 'ଅଷ୍ଟମ ଶ୍ରେଣୀ', levelRange: '8th Grade' },
  { id: 'class9', label: 'Class 9', labelOdia: 'ନବମ ଶ୍ରେଣୀ', levelRange: '9th Grade' },
  { id: 'class10', label: 'Class 10', labelOdia: 'ଦଶମ ଶ୍ରେଣୀ', levelRange: '10th Grade' },
  { id: 'class11', label: 'Class 11', labelOdia: 'ଏକାଦଶ ଶ୍ରେଣୀ', levelRange: '11th Grade' },
  { id: 'class12', label: 'Class 12', labelOdia: 'ଦ୍ୱାଦଶ ଶ୍ରେଣୀ', levelRange: '12th Grade' }
];

export const SUBJECT_OPTIONS = [
  { id: 'math', name: 'Mathematics', nameOdia: 'ଗଣିତ', icon: 'Calculator', color: '#FFB703', lightColor: '#FFF9E6' },
  { id: 'science', name: 'Science & Physics', nameOdia: 'ବିଜ୍ଞାନ ଓ ପଦାର୍ଥ', icon: 'Atom', color: '#06D6A0', lightColor: '#E6FAF4' },
  { id: 'chemistry', name: 'Chemistry', nameOdia: 'ରସାୟନ ବିଜ୍ଞାନ', icon: 'FlaskConical', color: '#9D4EDD', lightColor: '#F6EDFC' },
  { id: 'biology', name: 'Biology & Life Sci', nameOdia: 'ଜୀବ ବିଜ୍ଞାନ', icon: 'Dna', color: '#FF4757', lightColor: '#FFEAEA' },
  { id: 'english', name: 'English Literature', nameOdia: 'ଇଂରାଜୀ ସାହିତ୍ୟ', icon: 'BookOpen', color: '#00B4D8', lightColor: '#E6F7FA' },
  { id: 'computer', name: 'AI & Computer Sci', nameOdia: 'ଏଆଇ ଓ କମ୍ପ୍ୟୁଟର', icon: 'Cpu', color: '#5B46F6', lightColor: '#EEECFE' }
];

export const MAP_CHAPTERS_DATA = {
  class6: {
    math: [
      { id: 'c6_m1', step: 1, title: 'Knowing Our Numbers', titleOdia: 'ସଂଖ୍ୟା ପରିଚୟ', status: 'completed', score: 95, xp: 50, gems: 10, time: '15 mins', difficulty: 'Beginner', concept: 'Indian & International Numeral System, Place Values' },
      { id: 'c6_m2', step: 2, title: 'Whole Numbers & Operations', titleOdia: 'ପୂର୍ଣ୍ଣ ସଂଖ୍ୟା ଓ ପ୍ରକ୍ରିୟା', status: 'completed', score: 88, xp: 60, gems: 12, time: '18 mins', difficulty: 'Beginner', concept: 'Predecessor, Successor, Properties of Addition & Multiplication' },
      { id: 'c6_m3', step: 3, title: 'Fractions & Decimals Basics', titleOdia: 'ଭଗ୍ନାଂଶ ଓ ଦଶମିକ ପ୍ରାରମ୍ଭ', status: 'current', score: null, xp: 75, gems: 15, time: '20 mins', difficulty: 'Intermediate', concept: 'Proper, Improper Fractions, Shaded Visual Representations' },
      { id: 'c6_m4', step: 4, title: 'Basic Geometrical Ideas', titleOdia: 'ମୌଳିକ ଜ୍ୟାମିତିକ ଧାରଣା', status: 'locked', score: null, xp: 80, gems: 18, time: '22 mins', difficulty: 'Intermediate', concept: 'Points, Line Segments, Rays, Angles, Triangles, Circles' },
      { id: 'c6_m5', step: 5, title: 'Mensuration & Perimeter', titleOdia: 'ପରିମିତି ଓ ପରିସୀମା', status: 'locked', score: null, xp: 100, gems: 25, time: '25 mins', difficulty: 'Advanced', concept: 'Perimeter of Rectangle, Square, Area of Grid Surfaces' }
    ],
    science: [
      { id: 'c6_s1', step: 1, title: 'Food: Where Does It Come From?', titleOdia: 'ଖାଦ୍ୟ: ଏହା କେଉଁଠାରୁ ଆସେ?', status: 'completed', score: 90, xp: 50, gems: 10, time: '12 mins', difficulty: 'Beginner', concept: 'Plant Sources, Animal Products, Herbivores, Carnivores' },
      { id: 'c6_s2', step: 2, title: 'Components of Food & Vitamins', titleOdia: 'ଖାଦ୍ୟର ଉପାଦାନ ଓ ଭିଟାମିନ୍', status: 'current', score: null, xp: 65, gems: 15, time: '16 mins', difficulty: 'Intermediate', concept: 'Carbohydrates, Proteins, Fats, Balanced Diet & Scurvy' },
      { id: 'c6_s3', step: 3, title: 'Fibre to Fabric', titleOdia: 'ତନ୍ତୁରୁ ଲୁଗା', status: 'locked', score: null, xp: 70, gems: 15, time: '18 mins', difficulty: 'Intermediate', concept: 'Natural Fibres (Cotton, Jute), Ginning & Spinning' },
      { id: 'c6_s4', step: 4, title: 'Sorting Materials into Groups', titleOdia: 'ପଦାର୍ଥର ଶ୍ରେଣୀବିଭାଗ', status: 'locked', score: null, xp: 85, gems: 20, time: '20 mins', difficulty: 'Intermediate', concept: 'Solubility, Transparency, Hardness, Density in Water' },
      { id: 'c6_s5', step: 5, title: 'Light, Shadows & Reflections', titleOdia: 'ଆଲୋକ, ଛାୟା ଓ ପ୍ରତିଫଳନ', status: 'locked', score: null, xp: 110, gems: 30, time: '25 mins', difficulty: 'Advanced', concept: 'Opaque Objects, Pinhole Camera, Straight Line Propagation' }
    ]
  },
  class7: {
    math: [
      { id: 'c7_m1', step: 1, title: 'Integers & Number Line', titleOdia: 'ପୂର୍ଣ୍ଣ ସଂଖ୍ୟା ଓ ସଂଖ୍ୟା ରେଖା', status: 'completed', score: 98, xp: 55, gems: 12, time: '16 mins', difficulty: 'Beginner', concept: 'Positive & Negative Numbers, Addition Rules, Absolute Value' },
      { id: 'c7_m2', step: 2, title: 'Fractions & Sambalpuri Patterns', titleOdia: 'ସମ୍ବଲପୁରୀ ଆକୃତି ଓ ଭଗ୍ନାଂଶ', status: 'current', score: null, xp: 70, gems: 15, time: '20 mins', difficulty: 'Intermediate', concept: 'Multiplication & Division of Fractions, Equivalent Fractions' },
      { id: 'c7_m3', step: 3, title: 'Simple Linear Equations', titleOdia: 'ସରଳ ସମୀକରଣ', status: 'locked', score: null, xp: 85, gems: 20, time: '22 mins', difficulty: 'Intermediate', concept: 'Variable Transposition, LHS = RHS Verification, Word Problems' },
      { id: 'c7_m4', step: 4, title: 'Lines, Angles & Parallel Transversals', titleOdia: 'ରେଖା, କୋଣ ଓ ସମାନ୍ତର ରେଖା', status: 'locked', score: null, xp: 90, gems: 22, time: '24 mins', difficulty: 'Advanced', concept: 'Complementary & Supplementary Angles, Alternate Interior Angles' },
      { id: 'c7_m5', step: 5, title: 'Perimeter & Area of Circle', titleOdia: 'ବୃତ୍ତର ପରିସୀମା ଓ କ୍ଷେତ୍ରଫଳ', status: 'locked', score: null, xp: 120, gems: 30, time: '28 mins', difficulty: 'Master', concept: 'Pi (π) Derivation, Circumference = 2πr, Area = πr²' }
    ],
    science: [
      { id: 'c7_s1', step: 1, title: 'Nutrition in Plants & Photosynthesis', titleOdia: 'ଉଦ୍ଭିଦର ପୋଷଣ ଓ ସାଲୋକ ସଂଶ୍ଲେଷଣ', status: 'completed', score: 92, xp: 60, gems: 14, time: '15 mins', difficulty: 'Beginner', concept: 'Chlorophyll, Stomata, Autotrophic vs Heterotrophic Nutrition' },
      { id: 'c7_s2', step: 2, title: 'Heat & Temperature Measurement', titleOdia: 'ତାପ ଓ ଉତ୍ତାପ ମାପ', status: 'current', score: null, xp: 75, gems: 18, time: '18 mins', difficulty: 'Intermediate', concept: 'Conduction, Convection, Radiation, Clinical Thermometer' },
      { id: 'c7_s3', step: 3, title: 'Acids, Bases & Litmus Indicators', titleOdia: 'ଅମ୍ଳ, କ୍ଷାର ଓ ଲିଟମସ୍ ପ୍ରଦର୍ଶକ', status: 'locked', score: null, xp: 80, gems: 20, time: '20 mins', difficulty: 'Intermediate', concept: 'Litmus Paper, Turmeric Indicator, Neutralization Reaction' },
      { id: 'c7_s4', step: 4, title: 'Water Cycle in Odisha Monsoons', titleOdia: 'ଓଡ଼ିଶାର ବର୍ଷା ଦିନରେ ଜଳ ଚକ୍ର', status: 'locked', score: null, xp: 95, gems: 25, time: '22 mins', difficulty: 'Advanced', concept: 'Evaporation, Condensation, Water Table, Rainwater Harvesting' },
      { id: 'c7_s5', step: 5, title: 'Electric Current & Magnetic Effect', titleOdia: 'ବିଦ୍ୟୁତ୍ ସ୍ରୋତ ଓ ଚୁମ୍ବକୀୟ ପ୍ରଭାବ', status: 'locked', score: null, xp: 120, gems: 35, time: '28 mins', difficulty: 'Master', concept: 'Circuit Diagrams, Electromagnets, Heating Effect of Current' }
    ]
  },
  class8: {
    math: [
      { id: 'c8_m1', step: 1, title: 'Rational Numbers & Closure Property', titleOdia: 'ପରିମେୟ ସଂଖ୍ୟା', status: 'completed', score: 96, xp: 65, gems: 15, time: '18 mins', difficulty: 'Intermediate', concept: 'p/q Form, Distributive Property, Multiplicative Inverse' },
      { id: 'c8_m2', step: 2, title: 'Linear Equations in One Variable', titleOdia: 'ଏକ ଅଜ୍ଞାତ ରାଶି ବିଶିଷ୍ଟ ରୈଖିକ ସମୀକରଣ', status: 'completed', score: 89, xp: 75, gems: 18, time: '22 mins', difficulty: 'Intermediate', concept: 'Solving Equations with Variables on Both Sides, Age Problems' },
      { id: 'c8_m3', step: 3, title: 'Understanding Quadrilaterals & Polygons', titleOdia: 'ଚତୁର୍ଭୁଜ ଓ ବହୁଭୁଜ', status: 'current', score: null, xp: 85, gems: 22, time: '25 mins', difficulty: 'Advanced', concept: 'Parallelogram Properties, Rhombus, Trapezium, Sum of Angles' },
      { id: 'c8_m4', step: 4, title: 'Squares, Square Roots & Pythagoreans', titleOdia: 'ବର୍ଗ, ବର୍ଗମୂଳ ଓ ପାଇଥାଗୋରାସ', status: 'locked', score: null, xp: 100, gems: 25, time: '26 mins', difficulty: 'Advanced', concept: 'Prime Factorisation Method, Long Division for Square Roots' },
      { id: 'c8_m5', step: 5, title: 'Algebraic Expressions & Identities', titleOdia: 'ବୀଜଗାଣିତିକ ଅଭେଦ', status: 'locked', score: null, xp: 130, gems: 40, time: '30 mins', difficulty: 'Master', concept: '(a+b)², (a-b)², (a+b)(a-b) Expansion & Factorisation' }
    ],
    science: [
      { id: 'c8_s1', step: 1, title: 'Crop Production & Agriculture', titleOdia: 'ଫସଲ ଉତ୍ପାଦନ ଓ ପରିଚାଳନା', status: 'completed', score: 94, xp: 70, gems: 16, time: '16 mins', difficulty: 'Beginner', concept: 'Kharif vs Rabi Crops, Sowing, Drip Irrigation, Harvesting' },
      { id: 'c8_s2', step: 2, title: 'Microorganisms: Friend & Foe', titleOdia: 'ଅଣୁଜୀବ: ବନ୍ଧୁ ଓ ଶତ୍ରୁ', status: 'current', score: null, xp: 80, gems: 20, time: '20 mins', difficulty: 'Intermediate', concept: 'Bacteria, Fungi, Nitrogen Fixation, Pasteurisation of Milk' },
      { id: 'c8_s3', step: 3, title: 'Force, Pressure & Friction', titleOdia: 'ବଳ, ଚାପ ଓ ଘର୍ଷଣ', status: 'locked', score: null, xp: 95, gems: 24, time: '24 mins', difficulty: 'Intermediate', concept: 'Contact vs Non-contact Forces, Pressure = Force/Area, Drag' },
      { id: 'c8_s4', step: 4, title: 'Sound Waves & Amplitude', titleOdia: 'ଶବ୍ଦ ତରଙ୍ଗ ଓ ଆୟାମ', status: 'locked', score: null, xp: 110, gems: 30, time: '26 mins', difficulty: 'Advanced', concept: 'Vibrating Strings, Frequency (Hz), Pitch, Human Ear Drum' },
      { id: 'c8_s5', step: 5, title: 'Chemical Effects of Electric Current', titleOdia: 'ବିଦ୍ୟୁତ୍ ସ୍ରୋତର ରସାୟନିକ ପ୍ରଭାବ', status: 'locked', score: null, xp: 140, gems: 45, time: '32 mins', difficulty: 'Master', concept: 'Electroplating, Electrodes, Conduction through Liquids' }
    ]
  },
  class9: {
    math: [
      { id: 'c9_m1', step: 1, title: 'Irrational Numbers & Real Lines', titleOdia: 'ଅପରିମେୟ ସଂଖ୍ୟା', status: 'completed', score: 91, xp: 80, gems: 20, time: '20 mins', difficulty: 'Intermediate', concept: '√2, √3 Proofs, Rationalising the Denominator, Real Number Line' },
      { id: 'c9_m2', step: 2, title: 'Polynomials & Factor Theorem', titleOdia: 'ପଲିନୋମିଆଲ୍ ଓ ଗୁଣନଖଣ୍ଡ ସୂତ୍ର', status: 'current', score: null, xp: 95, gems: 25, time: '24 mins', difficulty: 'Advanced', concept: 'Degree of Polynomial, Remainder Theorem, Cubic Factorisation' },
      { id: 'c9_m3', step: 3, title: 'Coordinate Geometry & Cartesian Plane', titleOdia: 'ସ୍ଥାନାଙ୍କ ଜ୍ୟାମିତି', status: 'locked', score: null, xp: 105, gems: 28, time: '25 mins', difficulty: 'Intermediate', concept: 'Abscissa, Ordinate, 4 Quadrants, Plotting Points' },
      { id: 'c9_m4', step: 4, title: 'Euclid Geometry & Triangle Theorems', titleOdia: 'ୟୁକ୍ଲିଡ୍ ଜ୍ୟାମିତି ଓ ତ୍ରିଭୁଜ', status: 'locked', score: null, xp: 120, gems: 32, time: '28 mins', difficulty: 'Advanced', concept: 'Axioms & Postulates, SAS, ASA, SSS Congruence Criteria' },
      { id: 'c9_m5', step: 5, title: 'Heron’s Formula & Surface Areas', titleOdia: 'ହେରନ୍‌ଙ୍କ ସୂତ୍ର ଓ କ୍ଷେତ୍ରଫଳ', status: 'locked', score: null, xp: 150, gems: 50, time: '34 mins', difficulty: 'Master', concept: 'Area = √(s(s-a)(s-b)(s-c)), Cone & Sphere Surface Volumes' }
    ],
    science: [
      { id: 'c9_s1', step: 1, title: 'Motion, Velocity & Acceleration', titleOdia: 'ଗତି, ବେଗ ଓ ତ୍ୱରଣ', status: 'completed', score: 95, xp: 85, gems: 22, time: '22 mins', difficulty: 'Intermediate', concept: 'Distance vs Displacement, Uniform Motion, Equations of Motion v=u+at' },
      { id: 'c9_s2', step: 2, title: 'Newton’s Laws of Motion & Momentum', titleOdia: 'ନିଉଟନ୍‌ଙ୍କ ଗତି ନିୟମ ଓ ସଂବେଗ', status: 'current', score: null, xp: 100, gems: 26, time: '25 mins', difficulty: 'Advanced', concept: 'Inertia, F = ma, Action & Reaction, Conservation of Momentum' },
      { id: 'c9_s3', step: 3, title: 'Universal Law of Gravitation', titleOdia: 'ମହାକର୍ଷଣ ନିୟମ', status: 'locked', score: null, xp: 115, gems: 30, time: '26 mins', difficulty: 'Advanced', concept: 'F = G(m1*m2)/r², Acceleration due to Gravity (g=9.8m/s²), Mass vs Weight' },
      { id: 'c9_s4', step: 4, title: 'Structure of Atom & Valency', titleOdia: 'ପରମାଣୁର ଗଠନ ଓ ସଂଯୋଜକତା', status: 'locked', score: null, xp: 130, gems: 35, time: '30 mins', difficulty: 'Master', concept: 'Protons, Neutrons, Electrons, Thomson & Rutherford Atomic Models' },
      { id: 'c9_s5', step: 5, title: 'Cell: The Fundamental Unit of Life', titleOdia: 'କୋଷ: ଜୀବନର ମୌଳିକ ଏକକ', status: 'locked', score: null, xp: 160, gems: 50, time: '35 mins', difficulty: 'Master', concept: 'Mitochondria, Nucleus, Endoplasmic Reticulum, Plant vs Animal Cell' }
    ]
  },
  class10: {
    math: [
      { id: 'c10_m1', step: 1, title: 'Real Numbers & Fundamental Theorem', titleOdia: 'ବାସ୍ତବ ସଂଖ୍ୟା', status: 'completed', score: 100, xp: 100, gems: 25, time: '22 mins', difficulty: 'Intermediate', concept: 'Euclid’s Division Lemma, Prime Factorisation HCF * LCM = a * b' },
      { id: 'c10_m2', step: 2, title: 'Quadratic Equations & Discriminant', titleOdia: 'ଦ୍ୱିଘାତ ସମୀକରଣ', status: 'current', score: null, xp: 110, gems: 30, time: '26 mins', difficulty: 'Advanced', concept: 'ax² + bx + c = 0, Quadratic Formula x = (-b ± √(b²-4ac))/2a' },
      { id: 'c10_m3', step: 3, title: 'Arithmetic Progressions (AP)', titleOdia: 'ସମାନ୍ତର ପ୍ରଗତି', status: 'locked', score: null, xp: 125, gems: 35, time: '28 mins', difficulty: 'Advanced', concept: 'nth Term an = a + (n-1)d, Sum of n Terms Sn = n/2[2a + (n-1)d]' },
      { id: 'c10_m4', step: 4, title: 'Introduction to Trigonometry', titleOdia: 'ତ୍ରିକୋଣମିତି', status: 'locked', score: null, xp: 145, gems: 45, time: '32 mins', difficulty: 'Master', concept: 'sin, cos, tan, Trigonometric Identities sin²θ + cos²θ = 1' },
      { id: 'c10_m5', step: 5, title: 'Circles & Tangents Theorem', titleOdia: 'ବୃତ୍ତ ଓ ସ୍ପର୍ଶକ', status: 'locked', score: null, xp: 180, gems: 60, time: '38 mins', difficulty: 'Master', concept: 'Tangent perpendicular to Radius, Length of Tangents from External Point' }
    ],
    science: [
      { id: 'c10_s1', step: 1, title: 'Light: Reflection & Refraction', titleOdia: 'ଆଲୋକ: ପ୍ରତିଫଳନ ଓ ପ୍ରତିସରଣ', status: 'completed', score: 96, xp: 105, gems: 28, time: '24 mins', difficulty: 'Advanced', concept: 'Mirror Formula 1/f = 1/v + 1/u, Snell’s Law n1 sin θ1 = n2 sin θ2' },
      { id: 'c10_s2', step: 2, title: 'Electricity: Ohm’s Law & Resistance', titleOdia: 'ବିଦ୍ୟୁତ୍: ଓମ୍‌ଙ୍କ ନିୟମ ଓ ପ୍ରତିରୋଧ', status: 'current', score: null, xp: 120, gems: 32, time: '28 mins', difficulty: 'Advanced', concept: 'V = IR, Resistivity ρ, Series & Parallel Combinations' },
      { id: 'c10_s3', step: 3, title: 'Chemical Reactions & Balancing', titleOdia: 'ରସାୟନିକ ପ୍ରତିକ୍ରିୟା ଓ ସମତୁଲ', status: 'locked', score: null, xp: 135, gems: 38, time: '30 mins', difficulty: 'Master', concept: 'Combination, Decomposition, Displacement, Redox Reactions' },
      { id: 'c10_s4', step: 4, title: 'Carbon & Its Compounds', titleOdia: 'କାର୍ବନ୍ ଓ ଏହାର ଯୌଗିକ', status: 'locked', score: null, xp: 155, gems: 48, time: '35 mins', difficulty: 'Master', concept: 'Covalent Bonding, Saturated & Unsaturated Hydrocarbons, Functional Groups' },
      { id: 'c10_s5', step: 5, title: 'Life Processes & Respiration', titleOdia: 'ଜୀବନ ପ୍ରକ୍ରିୟା ଓ ଶ୍ୱସନ', status: 'locked', score: null, xp: 190, gems: 65, time: '40 mins', difficulty: 'Master', concept: 'Double Circulation in Heart, Nephron Excretion, ATP Energy Synthesis' }
    ]
  },
  class11: {
    math: [
      { id: 'c11_m1', step: 1, title: 'Sets, Relations & Functions', titleOdia: 'ସେଟ୍, ସମ୍ପର୍କ ଓ ଫଳନ', status: 'completed', score: 94, xp: 120, gems: 30, time: '25 mins', difficulty: 'Advanced', concept: 'Union, Intersection, Venn Diagrams, Domain & Range' },
      { id: 'c11_m2', step: 2, title: 'Trigonometric Functions & Graphs', titleOdia: 'ତ୍ରିକୋଣମିତିକ ଫଳନ', status: 'current', score: null, xp: 135, gems: 35, time: '30 mins', difficulty: 'Master', concept: 'Compound Angles, sin(A+B), Periodicity & Waveforms' },
      { id: 'c11_m3', step: 3, title: 'Complex Numbers & Argand Plane', titleOdia: 'ଜଟିଳ ସଂଖ୍ୟା', status: 'locked', score: null, xp: 150, gems: 40, time: '32 mins', difficulty: 'Master', concept: 'i = √(-1), Polar Form z = r(cos θ + i sin θ), Modulus' },
      { id: 'c11_m4', step: 4, title: 'Permutations & Combinations', titleOdia: 'କ୍ରମଚୟ ଓ ସଂଚୟ', status: 'locked', score: null, xp: 175, gems: 50, time: '36 mins', difficulty: 'Master', concept: 'nPr = n!/(n-r)!, nCr = n!/(r!(n-r)!), Binomial Theorem' },
      { id: 'c11_m5', step: 5, title: 'Calculus: Limits & Derivatives', titleOdia: 'କାଲକୁଲସ୍: ସୀମା ଓ ଅବକଳଜ', status: 'locked', score: null, xp: 210, gems: 70, time: '42 mins', difficulty: 'Legendary', concept: 'lim (x->0) sin(x)/x = 1, Derivative First Principle dy/dx' }
    ],
    science: [
      { id: 'c11_s1', step: 1, title: 'Vectors & 2D Kinematics', titleOdia: 'ଭେକ୍ଟର ଓ ଦ୍ୱି-ମାତ୍ରିକ ଗତି', status: 'completed', score: 93, xp: 125, gems: 32, time: '26 mins', difficulty: 'Advanced', concept: 'Dot Product, Cross Product, Projectile Motion Trajectory' },
      { id: 'c11_s2', step: 2, title: 'Laws of Motion & Rotational Dynamics', titleOdia: 'ଗତି ନିୟମ ଓ ଘୂର୍ଣ୍ଣନ', status: 'current', score: null, xp: 140, gems: 38, time: '30 mins', difficulty: 'Master', concept: 'Moment of Inertia I, Torque τ = r x F, Angular Momentum L' },
      { id: 'c11_s3', step: 3, title: 'Thermodynamics & Heat Engines', titleOdia: 'ତାପଗତି ବିଜ୍ଞାନ', status: 'locked', score: null, xp: 160, gems: 45, time: '34 mins', difficulty: 'Master', concept: 'First & Second Laws of Thermodynamics, Carnot Engine Efficiency' },
      { id: 'c11_s4', step: 4, title: 'Chemical Bonding & Hybridisation', titleOdia: 'ରସାୟନିକ ବନ୍ଧନ', status: 'locked', score: null, xp: 180, gems: 55, time: '38 mins', difficulty: 'Legendary', concept: 'VSEPR Theory, sp, sp², sp³ Hybridisation, Molecular Orbital Theory' },
      { id: 'c11_s5', step: 5, title: 'Biomolecules & DNA Structure', titleOdia: 'ଜୈବ ଅଣୁ ଓ ଡିଏନଏ', status: 'locked', score: null, xp: 220, gems: 75, time: '45 mins', difficulty: 'Legendary', concept: 'Proteins, Double Helix DNA, Enzyme Catalysis Kinetics' }
    ]
  },
  class12: {
    math: [
      { id: 'c12_m1', step: 1, title: 'Matrices & Determinants', titleOdia: 'ମାଟ୍ରିକ୍ସ ଓ ନିର୍ଦ୍ଧାରକ', status: 'completed', score: 97, xp: 140, gems: 35, time: '28 mins', difficulty: 'Master', concept: 'Matrix Multiplication, Inverse A⁻¹ = adj(A)/|A|, Cramer’s Rule' },
      { id: 'c12_m2', step: 2, title: 'Continuity & Differentiability', titleOdia: 'ନିରବଚ୍ଛିନ୍ନତା ଓ ଅବକଳନୀୟତା', status: 'current', score: null, xp: 160, gems: 45, time: '32 mins', difficulty: 'Master', concept: 'Chain Rule, Implicit Differentiation, Mean Value Theorem' },
      { id: 'c12_m3', step: 3, title: 'Indefinite & Definite Integrals', titleOdia: 'ସମାକଳନ (ଇଣ୍ଟିଗ୍ରାଲ୍ସ)', status: 'locked', score: null, xp: 185, gems: 55, time: '38 mins', difficulty: 'Legendary', concept: 'Integration by Parts ∫u dv = uv - ∫v du, Substitution Method' },
      { id: 'c12_m4', step: 4, title: 'Vector Algebra & 3D Geometry', titleOdia: 'ଭେକ୍ଟର ଓ 3D ଜ୍ୟାମିତି', status: 'locked', score: null, xp: 210, gems: 70, time: '42 mins', difficulty: 'Legendary', concept: 'Direction Cosines, Equation of Line in 3D Space, Shortest Distance' },
      { id: 'c12_m5', step: 5, title: 'Differential Equations & Probability', titleOdia: 'ଅବକଳ ସମୀକରଣ ଓ ସମ୍ଭାବ୍ୟତା', status: 'locked', score: null, xp: 250, gems: 90, time: '48 mins', difficulty: 'Legendary', concept: 'Separable Variable Method, Bayes’ Theorem, Binomial Distribution' }
    ],
    science: [
      { id: 'c12_s1', step: 1, title: 'Electric Charges & Gauss’s Law', titleOdia: 'ବିଦ୍ୟୁତ୍ ଆବେଶ ଓ ଗସ୍‌ଙ୍କ ନିୟମ', status: 'completed', score: 96, xp: 150, gems: 40, time: '30 mins', difficulty: 'Master', concept: 'Coulomb’s Law F = k q1 q2/r², Electric Flux Φ = E · A = Q/ε0' },
      { id: 'c12_s2', step: 2, title: 'Electromagnetic Induction & AC Circuits', titleOdia: 'ବିଦ୍ୟୁତ୍ ଚୁମ୍ବକୀୟ ପ୍ରେରଣ', status: 'current', score: null, xp: 175, gems: 50, time: '34 mins', difficulty: 'Master', concept: 'Faraday’s Law, Lenz’s Law, LCR Series Resonance Circuits' },
      { id: 'c12_s3', step: 3, title: 'Ray Optics & Wave Interference', titleOdia: 'ରଶ୍ମି ଆଲୋକ ବିଜ୍ଞାନ ଓ ବ୍ୟତିକରଣ', status: 'locked', score: null, xp: 200, gems: 65, time: '38 mins', difficulty: 'Legendary', concept: 'Lens Maker Formula, Young’s Double Slit Experiment Interference' },
      { id: 'c12_s4', step: 4, title: 'Organic Reaction Mechanisms & Polymers', titleOdia: 'ଜୈବ ପ୍ରତିକ୍ରିୟା ଓ ପଲିମର', status: 'locked', score: null, xp: 230, gems: 80, time: '42 mins', difficulty: 'Legendary', concept: 'SN1 & SN2 Mechanisms, Aldehydes, Ketones, Carboxylic Acids' },
      { id: 'c12_s5', step: 5, title: 'Genetics, Molecular Biology & AI Biotech', titleOdia: 'ଜେନେଟିକ୍ସ ଓ ଜୈବପ୍ରଯୁକ୍ତି', status: 'locked', score: null, xp: 280, gems: 100, time: '50 mins', difficulty: 'Legendary', concept: 'CRISPR Gene Editing, Recombinant DNA, Transcription & Translation' }
    ]
  }
};
