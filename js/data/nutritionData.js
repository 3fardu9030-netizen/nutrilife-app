// NutriLife Nutrition Database & Educational Resources Dataset
window.NutritionData = {
  foods: [
    // Fruits
    {
      id: "apple",
      name: "Apple",
      category: "Fruits",
      calories: 52,
      carbs: 14,
      protein: 0.3,
      fat: 0.2,
      vitamins: ["Vitamin C", "Vitamin K", "Potassium", "Fiber"],
      benefits: [
        "Rich in antioxidant flavonoids",
        "Supports heart health and blood sugar regulation",
        "High soluble fiber (pectin) improves digestion"
      ],
      bestTime: "Morning / Mid-Day Snack",
      quantity: "1 medium sized (approx. 180g) daily",
      sideEffects: "Excess consumption may cause digestive discomfort due to high fructose and fiber.",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "blueberries",
      name: "Blueberries",
      category: "Superfoods",
      calories: 57,
      carbs: 14.5,
      protein: 0.7,
      fat: 0.3,
      vitamins: ["Vitamin C", "Vitamin K", "Manganese", "Anthocyanins"],
      benefits: [
        "Highest antioxidant capacity of all popular fruits",
        "Improves cognitive function and memory recall",
        "Helps lower blood pressure and cholesterol levels"
      ],
      bestTime: "Breakfast / Pre-workout",
      quantity: "1 cup (approx. 150g) daily",
      sideEffects: "Can cause teeth staining and minor stool color changes. Mild blood-thinning effect in extreme quantities.",
      image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "avocado",
      name: "Avocado",
      category: "Superfoods",
      calories: 160,
      carbs: 8.5,
      protein: 2,
      fat: 15, // healthy monounsaturated
      vitamins: ["Vitamin K", "Vitamin E", "Folate", "Potassium"],
      benefits: [
        "Packed with heart-healthy monounsaturated fats (oleic acid)",
        "Enhances absorption of fat-soluble vitamins from other vegetables",
        "Provides more potassium than bananas, supporting blood pressure regulation"
      ],
      bestTime: "Breakfast / Lunch",
      quantity: "1/2 to 1 medium avocado daily",
      sideEffects: "High energy density (caloric) - excessive intake may impact weight gain if unchecked.",
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600"
    },
    // Vegetables
    {
      id: "spinach",
      name: "Spinach",
      category: "Vegetables",
      calories: 23,
      carbs: 3.6,
      protein: 2.9,
      fat: 0.4,
      vitamins: ["Vitamin A", "Vitamin C", "Vitamin K1", "Iron", "Calcium"],
      benefits: [
        "Reduces oxidative stress and improves eye health",
        "High dietary nitrate levels help regulate blood pressure",
        "Rich in plant-based iron (non-heme) and folate"
      ],
      bestTime: "Lunch / Dinner",
      quantity: "1 to 2 cups cooked or raw daily",
      sideEffects: "High oxalates can interfere with calcium absorption and may contribute to kidney stones in predisposed individuals.",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "broccoli",
      name: "Broccoli",
      category: "Vegetables",
      calories: 34,
      carbs: 7,
      protein: 2.8,
      fat: 0.4,
      vitamins: ["Vitamin C", "Vitamin K", "Folate", "Sulforaphane"],
      benefits: [
        "Contains sulforaphane, which exhibits powerful anti-cancer properties",
        "Improves bone strength due to high levels of Calcium and Vitamin K",
        "Supports liver detoxification processes"
      ],
      bestTime: "Lunch / Dinner",
      quantity: "1 cup (approx. 90g) cooked daily",
      sideEffects: "Contains goitrogens which can interfere with thyroid function in high amounts if iodine deficient. May cause gas.",
      image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&q=80&w=600"
    },
    // Grains
    {
      id: "quinoa",
      name: "Quinoa",
      category: "Grains",
      calories: 120, // cooked
      carbs: 21,
      protein: 4.4,
      fat: 1.9,
      vitamins: ["Magnesium", "B-Vitamins", "Iron", "Zinc", "Fiber"],
      benefits: [
        "Complete protein containing all nine essential amino acids",
        "Gluten-free grain with a very low glycemic index",
        "Extremely high fiber content compared to other grains"
      ],
      bestTime: "Lunch / Post-workout",
      quantity: "1/2 to 1 cup cooked daily",
      sideEffects: "Contains saponins on the outer layer, which can cause digestive discomfort if not rinsed thoroughly before cooking.",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "oats",
      name: "Oatmeal",
      category: "Grains",
      calories: 389, // raw 100g
      carbs: 66,
      protein: 16.9,
      fat: 6.9,
      vitamins: ["Beta-Glucan", "Manganese", "Phosphorus", "Iron"],
      benefits: [
        "Beta-glucan soluble fiber significantly lowers LDL cholesterol",
        "Provides long-lasting energy and controls cravings",
        "Contains unique avenanthramides antioxidants that protect blood vessels"
      ],
      bestTime: "Breakfast / Early Morning",
      quantity: "1/2 cup dry oats (approx. 40-50g) daily",
      sideEffects: "High starch load. Consuming massive portions without adequate water can cause mild bloat.",
      image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600"
    },
    // Protein Sources
    {
      id: "salmon",
      name: "Wild Salmon",
      category: "Protein sources",
      calories: 208, // 100g cooked
      carbs: 0,
      protein: 22,
      fat: 13,
      vitamins: ["Omega-3 EPA/DHA", "Vitamin B12", "Selenium", "Vitamin D"],
      benefits: [
        "Outstanding source of inflammation-fighting Omega-3 fatty acids",
        "Promotes brain health, nervous system function, and joints wellness",
        "High bio-available complete protein speeds up recovery"
      ],
      bestTime: "Lunch / Dinner",
      quantity: "150g fillet 2-3 times per week",
      sideEffects: "Large-fish wild varieties can carry micro-traces of heavy metals. Moderation is key.",
      image: "https://images.unsplash.com/photo-1485921325814-a534d0261f77?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "eggs",
      name: "Organic Eggs",
      category: "Protein sources",
      calories: 143, // 100g (about 2 large eggs)
      carbs: 0.7,
      protein: 12.6,
      fat: 9.5,
      vitamins: ["Choline", "Lutein", "Vitamin B2", "Vitamin D", "Zinc"],
      benefits: [
        "Choline is essential for brain developmental processes and memory retention",
        "Lutein and Zeaxanthin antioxidants protect retina structure",
        "Gold-standard protein digestibility score"
      ],
      bestTime: "Breakfast / Post-workout",
      quantity: "2-3 eggs daily",
      sideEffects: "Safe for most individuals; high dietary intake should be balanced with cholesterol sensitivity assessments.",
      image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "greek-yogurt",
      name: "Greek Yogurt (Plain)",
      category: "Dairy products",
      calories: 97, // 100g non-fat
      carbs: 3.4,
      protein: 9,
      fat: 5,
      vitamins: ["Calcium", "Vitamin B12", "Probiotics", "Potassium"],
      benefits: [
        "Live bacterial probiotics support microbiome and immune strength",
        "Strained process yields double the protein of regular yogurt",
        "Calcium and phosphorus bolster bone and dental structure"
      ],
      bestTime: "Snacks / Afternoon / Evening",
      quantity: "1 cup (approx. 200g) daily",
      sideEffects: "Not suitable for individuals with severe lactose intolerance or milk allergies.",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600"
    },
    // Nuts & Seeds
    {
      id: "almonds",
      name: "Almonds",
      category: "Nuts & seeds",
      calories: 579, // 100g raw
      carbs: 21.6,
      protein: 21.2,
      fat: 49.9,
      vitamins: ["Vitamin E", "Magnesium", "Riboflavin", "Copper"],
      benefits: [
        "Loaded with Vitamin E, protecting cell walls from oxidative damage",
        "Magnesium controls blood sugar levels and insulin responsiveness",
        "Helps satisfy hunger and prevents impulsive junk snacking"
      ],
      bestTime: "Mid-day Snack / Late Afternoon",
      quantity: "A handful (approx. 23 almonds or 30g) daily",
      sideEffects: "High caloric density. Can trigger nut allergies. Excess raw almonds can cause mild bloating due to phytates.",
      image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "chia-seeds",
      name: "Chia Seeds",
      category: "Nuts & seeds",
      calories: 486, // 100g raw
      carbs: 42.1,
      protein: 16.5,
      fat: 30.7,
      vitamins: ["Alpha-Linolenic Acid (Omega-3)", "Fiber", "Calcium", "Magnesium"],
      benefits: [
        "Incredible water absorption capacity (gel-forming) keeps you full",
        "Highest plant source of heart-supporting omega-3 fats",
        "Promotes regular digestive cycles and gut health"
      ],
      bestTime: "Morning (in water or smoothie) / Oats",
      quantity: "1-2 tablespoons (approx. 15-30g) daily soaked",
      sideEffects: "Consuming dry chia seeds without adequate liquid can create swallowing hazards or bowel blockages. Always soak first.",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80&w=600"
    },
    // Traditional Healthy Foods
    {
      id: "turmeric",
      name: "Turmeric (Curcumin)",
      category: "Traditional healthy foods",
      calories: 354, // 100g powder
      carbs: 65,
      protein: 8,
      fat: 10,
      vitamins: ["Curcumin", "Iron", "Manganese", "Vitamin B6"],
      benefits: [
        "Curcumin displays powerful anti-inflammatory effects comparable to pharmaceutical agents",
        "Drastically boosts the antioxidant capacity of the body",
        "Improves brain-derived neurotrophic factor (BDNF) links, slowing aging"
      ],
      bestTime: "Evening (Golden Milk) / Cooking Spice",
      quantity: "1/2 to 1 teaspoon (approx. 2-3g) of spice daily",
      sideEffects: "Mild blood-thinning. Excessive supplementation can trigger acid reflux or upset stomach.",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600"
    }
  ],

  healthAlerts: [
    {
      id: "obesity",
      name: "Obesity & Weight Management",
      icon: "fa-weight-scale",
      color: "from-amber-500 to-red-500",
      description: "Obesity is a complex, progressive condition characterized by excessive body fat accumulation. It significantly elevates risks for type 2 diabetes, heart diseases, and metabolic syndrome.",
      symptoms: [
        "Excessive body fat distribution around the waist",
        "Shortness of breath (dyspnea) during simple physical activities",
        "Excessive sweating and heat intolerance",
        "Chronic fatigue, joint, and lower back pain",
        "Snoring and signs of sleep apnea (disturbed sleep cycles)"
      ],
      causes: [
        "High intake of energy-dense, hyper-processed junk foods and added sugars",
        "Sedentary lifestyle and lack of regular exercise",
        "Hormonal imbalances (e.g., hypothyroidism, high cortisol levels)",
        "Genetic predisposition affecting hunger hormones (leptin and ghrelin)",
        "Chronic stress and sleep deprivation triggering emotional eating"
      ],
      prevention: [
        "Create a daily structured caloric energy balance",
        "Incorporate at least 150 minutes of moderate cardiovascular workout weekly",
        "Prioritize whole, fiber-dense foods that trigger physiological fullness",
        "Minimize liquid calories (sodas, fancy coffees, sweet juices)",
        "Focus on sleep hygiene (7-8 hours) to balance metabolic regulatory hormones"
      ],
      recommendedFoods: ["Spinach", "Broccoli", "Apple", "Quinoa", "Greek Yogurt (Plain)", "Wild Salmon"],
      avoidFoods: ["Sugary soft drinks", "Potato chips and deep-fried fast food", "Refined flour white bread", "Processed meats (sausages)", "Margarine and high trans-fat oils"],
      warnings: [
        "Sudden chest constriction or shortness of breath",
        "Extreme fatigue coupled with severe pain in leg joints",
        "Sleep disruption causing daytime mental blackouts"
      ],
      tips: [
        "Use smaller plates to naturally limit portion sizing",
        "Never skip breakfast; doing so often leads to severe binge eating at lunch",
        "Keep a daily food journal or log water and meals to build mindful habits"
      ]
    },
    {
      id: "diabetes",
      name: "Type 2 Diabetes & Insulin Resistance",
      icon: "fa-droplet",
      color: "from-blue-500 to-indigo-500",
      description: "A chronic metabolic condition marked by high blood glucose levels caused by the body's resistance to insulin or insufficient insulin secretion by the pancreas.",
      symptoms: [
        "Polydipsia (unquenchable, excessive thirst)",
        "Polyuria (frequent, urgent urination, especially at night)",
        "Polyphagia (extreme hunger even after consuming meals)",
        "Blurry vision and chronic fatigue",
        "Slow-healing cuts, bruises, or frequent infections"
      ],
      causes: [
        "Insulin receptor desensitization due to continuous high blood sugar spikes",
        "Excess visceral fat around liver and pancreas organs",
        "Lack of physical activity which prevents muscles from naturally absorbing glucose",
        "Family history and genetic markers",
        "Poor dietary patterns rich in simple sugars and fast carbs"
      ],
      prevention: [
        "Switch from simple refined carbohydrates to complex high-fiber grains",
        "Perform strength/resistance training to boost insulin sensitivity in muscles",
        "Maintain a healthy body mass index (BMI)",
        "Perform regular medical blood checks (A1C, fasting blood glucose)",
        "Keep hydration levels high with pure water"
      ],
      recommendedFoods: ["Spinach", "Broccoli", "Quinoa", "Oatmeal", "Almonds", "Chia Seeds", "Wild Salmon"],
      avoidFoods: ["Cakes, candies, and white sugar", "White rice and regular pasta", "Fruit juices with added syrups", "Sweetened breakfast cereals", "Deep-fried starches"],
      warnings: [
        "Confusion, dizziness, or shaking (extreme hypoglycemia)",
        "Acetone-smelling breath, nausea, and rapid breathing (diabetic ketoacidosis)",
        "Loss of consciousness or seizures"
      ],
      tips: [
        "Always pair carbohydrates with a protein or healthy fat to curb immediate glucose absorption",
        "Walk for 10-15 minutes immediately after large meals to help clear blood sugar",
        "Check glycemic indexes before trying new exotic fruits"
      ]
    },
    {
      id: "hypertension",
      name: "Hypertension & Heart Health",
      icon: "fa-heart-pulse",
      color: "from-red-500 to-rose-500",
      description: "Also known as high blood pressure. It is a silent killer that causes extreme pressure on artery walls, eventually leading to heart attacks, strokes, or kidney failure.",
      symptoms: [
        "Frequently asymptomatic (silent) until complications arise",
        "Dull morning headaches and dizziness",
        "Occasional nosebleeds or ringing in ears (tinnitus)",
        "Chest tightness, palpitations, or erratic pulse",
        "Visual changes or double vision under high strain"
      ],
      causes: [
        "High dietary sodium (salt) intake triggering fluid retention",
        "Chronic psychological stress activating the sympathetic nervous system",
        "Excessive alcohol intake and smoking",
        "Arterial stiffening due to aging and high-cholesterol plaque buildup",
        "Sedentary lifestyle and obesity"
      ],
      prevention: [
        "Adopt the DASH (Dietary Approaches to Stop Hypertension) food guidelines",
        "Restrict daily sodium intake to less than 2,300 mg (approx. 1 teaspoon of salt)",
        "Maximize dietary potassium, magnesium, and calcium to naturally dilate blood vessels",
        "Limit caffeine and completely avoid nicotine/tobacco products",
        "Incorporate daily stress-reduction practices (meditation, deep breathing)"
      ],
      recommendedFoods: ["Avocado", "Spinach", "Broccoli", "Oatmeal", "Almonds", "Chia Seeds", "Blueberries"],
      avoidFoods: ["Canned soups and salted snacks", "Pickles and soy sauce", "Frozen processed dinners", "Fast-food burgers and fries", "Excessive red meat and butter"],
      warnings: [
        "Sudden, crushing chest pain radiating to left arm or neck",
        "Difficulty speaking, facial drooping, or sudden weakness on one side (Stroke)",
        "Severe, blinding headache accompanied by extreme anxiety and breathlessness"
      ],
      tips: [
        "Season your food with garlic, herbs, lemon, and spices instead of salt",
        "Read nutrition labels carefully: search for 'low sodium' or 'no added salt' icons",
        "Track your blood pressure at home using an automated cuff weekly"
      ]
    },
    {
      id: "junk-food",
      name: "Junk Food Risks & Metabolic Damage",
      icon: "fa-pizza-slice",
      color: "from-yellow-500 to-orange-500",
      description: "Continuous intake of ultra-processed foods loaded with trans-fats, chemical additives, and refined sugars disrupts the body's natural metabolic signaling, leading to chronic low-grade inflammation.",
      symptoms: [
        "Severe energy crashes 1-2 hours after eating (reactive hypoglycemia)",
        "Frequent sugar or salt cravings that resist natural full signals",
        "Persistent brain fog and lack of mental focus",
        "Skin issues like acne breakouts and eczema flares",
        "Poor digestion, bloating, and irregular bowel movements"
      ],
      causes: [
        "The hyper-palatability design of processed foods which overrides brain satiety signals",
        "Cheap vegetable oils (soybean, canola) high in pro-inflammatory Omega-6 fats",
        "Lack of essential vitamins, minerals, and enzymes in processed calories",
        "Destruction of healthy gut microbiome by preservatives and artificial sweeteners",
        "Convenience and heavy marketing of fast food options"
      ],
      prevention: [
        "Practice the 80/20 rule: 80% whole single-ingredient foods, 20% flexible",
        "Cook meals at home using healthy fats like olive oil or avocado oil",
        "Avoid buying snacks packaged in boxes, bags, or cans with long chemical names",
        "Pack healthy portable snacks (raw nuts, fresh fruits) when traveling",
        "Rebuild your gut flora with fermented foods (kefir, kimchi, organic yogurt)"
      ],
      recommendedFoods: ["Apple", "Blueberries", "Avocado", "Greek Yogurt (Plain)", "Almonds", "Quinoa", "Broccoli"],
      avoidFoods: ["Packaged potato chips", "Store-bought cookies and donuts", "Sugary fizzy drinks", "Microwave instant noodles", "Commercial fast food burgers"],
      warnings: [
        "Frequent, extreme thirst and excessive urination",
        "Severe, persistent abdominal cramping or blood in stool",
        "Chronic joint inflammation and sudden severe fatigue"
      ],
      tips: [
        "Never go grocery shopping on an empty stomach; you are far more likely to buy impulse junk",
        "Prep your weekly meals on Sunday to avoid quick, unhealthy lunch orders at work",
        "Drink a full glass of water before deciding to indulge in a junk food craving"
      ]
    }
  ],

  myths: [
    {
      myth: "Eating fat makes you fat.",
      fact: "Dietary fat is essential for hormone production, brain health, and nutrient absorption. While fats are calorie-dense, healthy fats (like those in avocados, nuts, and salmon) actually promote satiety and help regulate weight."
    },
    {
      myth: "Carbs are the enemy and must be avoided.",
      fact: "Complex carbohydrates (quinoa, oats, brown rice) provide essential fiber, vitamins, and energy. The key is avoiding refined carbs (white bread, sugar, pastries) which cause rapid insulin spikes."
    },
    {
      myth: "Detox teas and cleanses are necessary to flush toxins.",
      fact: "Your body already has a highly sophisticated detoxification system: your liver and kidneys. Staying hydrated and eating fiber-rich cruciferous vegetables (like broccoli and spinach) is all you need to support them."
    },
    {
      myth: "You must eat protein within 30 minutes of a workout.",
      fact: "While post-workout nutrition is important, the 'anabolic window' is much wider than 30 minutes. Total daily protein intake and consistent distribution across meals matter far more for muscle repair."
    },
    {
      myth: "Skipping meals helps you lose weight faster.",
      fact: "Skipping meals can crash your metabolism, increase cortisol (stress hormone) levels, and lead to intense cravings or binge eating later in the day. Consistent, balanced meals are far more effective."
    }
  ],

  articles: [
    {
      id: 1,
      title: "The Ultimate Guide to Macro & Micro Nutrients",
      excerpt: "Understand the structural building blocks of food. Learn the difference between energy-giving macros and health-regulating vital micros.",
      category: "Nutrition Basics",
      author: "Dr. Evelyn Reed (PhD Nutrition)",
      date: "2026-05-18",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600",
      content: `Balanced nutrition is founded on two core pillars: **Macronutrients** and **Micronutrients**. 

### 1. Macronutrients: The Energy Providers
Macros are nutrients our bodies need in large quantities to generate fuel (measured in Calories).
* **Proteins (4 kcal/g)**: The building blocks of cells, muscles, and enzymes. Excellent sources include organic eggs, wild salmon, Greek yogurt, and legumes.
* **Carbohydrates (4 kcal/g)**: The primary fuel source for our brain and muscles. Prioritize complex carbs (oats, quinoa) over refined sugars.
* **Fats (9 kcal/g)**: Crucial for hormone synthesis, cell membrane structure, and brain health. Avocado, chia seeds, and almonds are top choices.

### 2. Micronutrients: The Wellness Regulators
Micros are vitamins and minerals required in smaller amounts, but essential for chemical reactions, immune function, and structural maintenance.
* **Vitamin C**: Promotes skin elasticity and immune defense. Found in citrus, apples, and broccoli.
* **Vitamin K**: Essential for blood clotting and bone strength. Found abundantly in leafy greens like spinach.
* **Iron**: Key for oxygen transport in blood cells.
* **Magnesium**: Regulates over 300 biochemical reactions including muscle contraction and sleep control.

**Actionable tip**: Aim for a colorful plate (the 'rainbow diet') to guarantee a natural spectrum of micronutrients in every meal.`
    },
    {
      id: 2,
      title: "5 Superfoods to Supercharge Your Immunity Naturally",
      excerpt: "Discover the scientific backing behind nature's most nutrient-dense foods and how they boost your immune defenses.",
      category: "Superfoods",
      author: "Coach Marcus Vance",
      date: "2026-05-20",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
      content: `Superfoods are nature's heavyweights, offering an exceptionally high nutrient-to-calorie ratio. Incorporating these five items into your diet can significantly bolster your biological defense systems.

### 1. Blueberries: The Antioxidant Shields
Blueberries are packed with anthocyanins, which neutralise free radicals, protecting your cells from premature aging and DNA damage.

### 2. Spinach: The Leafy Powerhouse
Rich in Vitamin C, beta-carotene, and numerous antioxidants, spinach increases our immune system's infection-fighting ability when cooked minimally.

### 3. Avocado: The Healthy Fat Booster
Fats are needed to absorb vitamins A, D, E, and K. Avocado's monounsaturated fats make sure your immune system can actually utilize the nutrients you consume.

### 4. Chia Seeds: The Omega-3 Specialists
Alpha-linolenic acid (ALA) in chia seeds is converted to active anti-inflammatory compounds, reducing chronic cellular stress.

### 5. Turmeric: The Golden Healer
Curcumin, the active compound in turmeric, is a potent modulator of T-cells, B-cells, and natural killer cells, boosting immune response.

**Actionable tip**: Add a tablespoon of chia seeds and a handful of blueberries to your morning oatmeal for an instant superfood defense bowl.`
    },
    {
      id: 3,
      title: "Hydration Hacks: The Science of Cell Health",
      excerpt: "Why drinking water is not enough. Learn how electrolytes, timings, and custom hydration schedules maximize cellular energy.",
      category: "Lifestyle & Hydration",
      author: "Dr. Evelyn Reed (PhD)",
      date: "2026-05-22",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=600",
      content: `Water accounts for roughly 60% of our body weight, acting as the solvent for every biochemical process in our cells. However, simple volume hydration is only half the battle.

### The Electrolyte Balance
Pure distilled water can dilute bodily salts if consumed excessively without mineral replenishment. Essential minerals like **Sodium, Potassium, and Magnesium** act as biological gates, pulling water inside the cell walls. Eating mineral-rich foods like avocados and bananas is vital for proper hydration.

### Ideal Timings for Cellular Intake
* **Upon Waking**: Drink 1-2 glasses of warm water. This replaces fluids lost overnight and immediately triggers bowel movement.
* **Before Meals**: Drink 1 glass of water 30 minutes prior. This prepares the stomach lining and prevents overeating.
* **Before Exercise**: Hydrate 1 hour prior to prevent cramping and maintain joint lubrication.
* **Before Sleep**: Limit large volumes to avoid interrupting your circadian rhythm for bathroom runs.

**Actionable tip**: If you experience a sudden mid-afternoon energy drop, drink a glass of water first. Mild dehydration is the leading cause of midday fatigue, often mistaken for hunger.`
    }
  ],

  dailyTips: [
    "Drink a glass of warm water immediately upon waking to kickstart your metabolism.",
    "Swap your afternoon sweet snack for a handful of almonds and a fresh apple.",
    "Walk for 10 minutes right after your largest meal to improve blood sugar clearance.",
    "Include leafy greens like spinach in at least one meal today to boost Vitamin K intake.",
    "Avoid drinking liquids during large meals to prevent diluting natural digestive enzymes.",
    "Ensure your dinner is consumed at least 2.5 to 3 hours before you head to bed.",
    "Use turmeric and a pinch of black pepper in your cooking to trigger anti-inflammatory benefits."
  ],

  challenges: [
    {
      id: "hydrate-8",
      title: "Hydration Champion",
      description: "Log at least 8 cups (2.0 Liters) of water today.",
      xp: 50,
      target: 8,
      unit: "cups"
    },
    {
      id: "active-30",
      title: "Daily Stride",
      description: "Perform and log at least 30 minutes of physical exercise.",
      xp: 60,
      target: 30,
      unit: "mins"
    },
    {
      id: "sleep-7",
      title: "Circadian Recharge",
      description: "Achieve and log at least 7.5 hours of restful sleep.",
      xp: 40,
      target: 7.5,
      unit: "hours"
    },
    {
      id: "no-junk",
      title: "Clean Eating",
      description: "Keep daily processed/junk calorie count below 100 kcal.",
      xp: 80,
      target: 0,
      unit: "processed items"
    }
  ],

  badges: [
    {
      id: "streak-3",
      name: "Habit Pioneer",
      description: "Maintain a 3-day tracking streak",
      icon: "fa-fire-flame-curved",
      color: "text-orange-500 bg-orange-100 dark:bg-orange-950/40"
    },
    {
      id: "streak-7",
      name: "Consistency Master",
      description: "Maintain a 7-day tracking streak",
      icon: "fa-crown",
      color: "text-yellow-500 bg-yellow-100 dark:bg-yellow-950/40"
    },
    {
      id: "water-hero",
      name: "Hydration Hero",
      description: "Reach your water target 5 days in a row",
      icon: "fa-droplet",
      color: "text-blue-500 bg-blue-100 dark:bg-blue-950/40"
    },
    {
      id: "green-god",
      name: "Veggie Emperor",
      description: "Eat 5 different leafy green categories",
      icon: "fa-seedling",
      color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-950/40"
    },
    {
      id: "kcal-perfect",
      name: "Calorie Zen",
      description: "Hit your exact calorie target (+/- 50 kcal)",
      icon: "fa-bullseye",
      color: "text-red-500 bg-red-100 dark:bg-red-950/40"
    }
  ]
};
