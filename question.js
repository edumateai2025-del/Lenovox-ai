export default function handler(req, res) {
  const questions = [
    // 1
    { q: "If 2x + 5 = 17, what is the value of x?", options: ["6", "5", "7", "12"], answer: "6" },
    // 2
    { q: "Which of the following is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
    // 3
    { q: "The rate of reaction increases when:", options: ["Temperature increases", "Concentration decreases", "Surface area decreases", "Pressure decreases"], answer: "Temperature increases" },
    // 4
    { q: "Which of these is a non-renewable energy source?", options: ["Coal", "Wind", "Solar", "Hydropower"], answer: "Coal" },
    // 5
    { q: "Which of the following is NOT a function of the human liver?", options: ["Detoxification", "Storage of glycogen", "Oxygen transport", "Production of bile"], answer: "Oxygen transport" },
    // 6
    { q: "Who is the author of 'Things Fall Apart'?", options: ["Chinua Achebe", "Wole Soyinka", "Ngugi wa Thiong'o", "Chimamanda Adichie"], answer: "Chinua Achebe" },
    // 7
    { q: "Which chemical is used in the hardening of cement?", options: ["Calcium oxide", "Magnesium chloride", "Sodium hydroxide", "Potassium nitrate"], answer: "Calcium oxide" },
    // 8
    { q: "Which of the following best describes an ecosystem?", options: ["Interaction of living and non-living things", "A group of animals only", "A type of soil", "A water body only"], answer: "Interaction of living and non-living things" },
    // 9
    { q: "The derivative of x^3 is:", options: ["3x^2", "x^2", "2x^3", "3x"], answer: "3x^2" },
    // 10
    { q: "In economics, the law of demand states:", options: ["Quantity demanded increases as price decreases", "Quantity demanded decreases as price decreases", "Price and demand are unrelated", "Demand is always constant"], answer: "Quantity demanded increases as price decreases" },
    // 11
    { q: "What is the SI unit of electric current?", options: ["Ampere", "Volt", "Ohm", "Coulomb"], answer: "Ampere" },
    // 12
    { q: "Which vitamin is essential for blood clotting?", options: ["Vitamin K", "Vitamin C", "Vitamin D", "Vitamin B12"], answer: "Vitamin K" },
    // 13
    { q: "Which of these rivers is the longest in the world?", options: ["Nile", "Amazon", "Yangtze", "Mississippi"], answer: "Nile" },
    // 14
    { q: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Mercury"], answer: "Mars" },
    // 15
    { q: "Which organ is primarily responsible for filtering blood?", options: ["Kidney", "Liver", "Lungs", "Heart"], answer: "Kidney" },
    // 16
    { q: "Which acid is found in the human stomach?", options: ["Hydrochloric acid", "Sulfuric acid", "Nitric acid", "Acetic acid"], answer: "Hydrochloric acid" },
    // 17
    { q: "The largest desert in the world is:", options: ["Sahara", "Gobi", "Kalahari", "Arabian"], answer: "Sahara" },
    // 18
    { q: "Which of these is a primary function of the human skeleton?", options: ["Support and protection", "Digestion", "Respiration", "Circulation"], answer: "Support and protection" },
    // 19
    { q: "If the speed of a car is 72 km/h, what is its speed in m/s?", options: ["20 m/s", "25 m/s", "18 m/s", "30 m/s"], answer: "20 m/s" },
    // 20
    { q: "Which of these metals is liquid at room temperature?", options: ["Mercury", "Gold", "Silver", "Iron"], answer: "Mercury" },

    // 21
    { q: "What is the chemical formula of table salt?", options: ["NaCl", "KCl", "CaCO3", "H2O"], answer: "NaCl" },
    // 22
    { q: "The mitochondria in cells are responsible for:", options: ["Energy production", "Protein synthesis", "DNA storage", "Waste disposal"], answer: "Energy production" },
    // 23
    { q: "The author of 'Macbeth' is:", options: ["William Shakespeare", "John Milton", "Jane Austen", "Mark Twain"], answer: "William Shakespeare" },
    // 24
    { q: "Which of these is the main gas responsible for global warming?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"], answer: "Carbon dioxide" },
    // 25
    { q: "Which of the following is a noble gas?", options: ["Neon", "Oxygen", "Nitrogen", "Hydrogen"], answer: "Neon" },
    // 26
    { q: "Who discovered penicillin?", options: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Gregor Mendel"], answer: "Alexander Fleming" },
    // 27
    { q: "The first law of motion was formulated by:", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"], answer: "Isaac Newton" },
    // 28
    { q: "What is the chemical symbol for potassium?", options: ["K", "P", "Pt", "Po"], answer: "K" },
    // 29
    { q: "Which of these is the hardest natural substance?", options: ["Diamond", "Gold", "Iron", "Platinum"], answer: "Diamond" },
    // 30
    { q: "The powerhouse of the cell is:", options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"], answer: "Mitochondria" },

    // 31
    { q: "Which planet has the largest number of moons?", options: ["Saturn", "Jupiter", "Earth", "Mars"], answer: "Saturn" },
    // 32
    { q: "The study of fungi is called:", options: ["Mycology", "Botany", "Zoology", "Ecology"], answer: "Mycology" },
    // 33
    { q: "The main component of natural gas is:", options: ["Methane", "Ethane", "Propane", "Butane"], answer: "Methane" },
    // 34
    { q: "The Battle of Hastings occurred in:", options: ["1066", "1215", "1492", "1776"], answer: "1066" },
    // 35
    { q: "The currency of the United Kingdom is:", options: ["Pound Sterling", "Euro", "Dollar", "Franc"], answer: "Pound Sterling" },
    // 36
    { q: "Which of these is NOT a renewable resource?", options: ["Coal", "Solar energy", "Wind energy", "Hydropower"], answer: "Coal" },
    // 37
    { q: "The atomic number of carbon is:", options: ["6", "12", "14", "8"], answer: "6" },
    // 38
    { q: "Which organ produces insulin?", options: ["Pancreas", "Liver", "Kidney", "Spleen"], answer: "Pancreas" },
    // 39
    { q: "Which country is the largest by land area?", options: ["Russia", "Canada", "China", "USA"], answer: "Russia" },
    // 40
    { q: "What is the main language spoken in Brazil?", options: ["Portuguese", "Spanish", "French", "English"], answer: "Portuguese" },

    // ... continued until 200
  ];

  res.status(200).json(questions);
    }
