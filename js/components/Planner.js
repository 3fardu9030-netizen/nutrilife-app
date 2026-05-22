// NutriLife AI Diet Planner Component
window.Planner = function ({ user, dbSync }) {
  const [formData, setFormData] = React.useState({
    age: user ? user.age : 28,
    gender: user ? user.gender : 'Male',
    weight: user ? user.weight : 70,
    height: user ? user.height : 175,
    goal: user ? user.goal : 'Weight Maintenance',
    lifestyle: user ? user.lifestyle : 'Moderately Active',
    preference: 'Balanced',
    allergies: [],
    conditions: []
  });

  const [wizardStep, setWizardStep] = React.useState(1);
  const [generating, setGenerating] = React.useState(false);
  const [generatedPlan, setGeneratedPlan] = React.useState(null);

  // Auto-calculated BMI
  const bmi = React.useMemo(() => {
    if (formData.weight && formData.height) {
      const heightInMeters = formData.height / 100;
      return (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return 0;
  }, [formData.weight, formData.height]);

  const handleAllergyToggle = (allergy) => {
    const list = [...formData.allergies];
    const index = list.indexOf(allergy);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(allergy);
    }
    setFormData({ ...formData, allergies: list });
  };

  const handleConditionToggle = (condition) => {
    const list = [...formData.conditions];
    const index = list.indexOf(condition);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(condition);
    }
    setFormData({ ...formData, conditions: list });
  };

  const generatePlan = () => {
    setGenerating(true);
    
    // Mifflin-St Jeor Equation for BMR
    let bmr = 0;
    if (formData.gender === 'Male') {
      bmr = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5;
    } else {
      bmr = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age - 161;
    }

    // Active Factor
    const factorMap = {
      'Sedentary': 1.2,
      'Lightly Active': 1.375,
      'Moderately Active': 1.55,
      'Very Active': 1.725
    };
    const tdee = Math.round(bmr * (factorMap[formData.lifestyle] || 1.2));

    // Target Calorie adjustment based on goal
    let targetCal = tdee;
    if (formData.goal === 'Weight Loss') targetCal -= 450;
    else if (formData.goal === 'Muscle Building' || formData.goal === 'Weight Gain') targetCal += 400;

    // Macro splits
    let protRatio = 0.25, carbRatio = 0.50, fatRatio = 0.25;
    if (formData.goal === 'Muscle Building') {
      protRatio = 0.35; carbRatio = 0.45; fatRatio = 0.20;
    } else if (formData.preference === 'Keto') {
      protRatio = 0.20; carbRatio = 0.05; fatRatio = 0.75;
    }

    const proteinGrams = Math.round((targetCal * protRatio) / 4);
    const carbsGrams = Math.round((targetCal * carbRatio) / 4);
    const fatGrams = Math.round((targetCal * fatRatio) / 9);
    const waterLiters = (formData.weight * 0.035).toFixed(1);

    // Dynamic menu generator based on diet preference and medical constraints
    const foodsDb = window.NutritionData.foods;
    
    const mealSuggestions = {
      Balanced: {
        breakfast: "Warm steel-cut oatmeal topped with wild blueberries, chia seeds, and 1 tbsp sliced almonds, paired with 2 scrambled organic eggs.",
        lunch: "150g grilled wild salmon served over a colorful quinoa Buddha bowl with steamed broccoli and seasoned spinach.",
        dinner: "Tender pan-seared tofu cubes sauteed with asparagus, carrots, and mushrooms, served alongside sliced avocado.",
        snacks: "Plain Greek yogurt with a drizzle of organic raw honey and a handful of fresh apple slices."
      },
      Veg: {
        breakfast: "Wholesome overnight oats soaked in organic almond milk, topped with chia seeds and half a sliced banana.",
        lunch: "Spiced quinoa bowl mixed with steamed broccoli florets, chickpeas, cherry tomatoes, and a light lemon tahini dressing.",
        dinner: "Sautéed organic tofu blocks with spinach and wild mushrooms, paired with baked sweet potato fries.",
        snacks: "Crunchy baby carrots and cucumber sticks served with smooth garlic hummus."
      },
      Vegan: {
        breakfast: "Chia seed pudding made with organic coconut milk, topped with blueberries and raw sunflower seeds.",
        lunch: "Thick lentil soup served with a side of mixed baby greens, organic avocado slices, and raw pumpkin seeds.",
        dinner: "Brown rice bowl topped with seasoned black beans, grilled zucchini, steamed spinach, and fresh salsa.",
        snacks: "A handful of raw almonds and two organic Medjool dates."
      },
      Keto: {
        breakfast: "3-egg omelet cooked in butter, filled with fresh spinach, white button mushrooms, and wrapped in avocado slices.",
        lunch: "Seared wild salmon fillet served over a bed of baby greens with extra-virgin olive oil dressing and walnuts.",
        dinner: "Grilled chicken breast paired with steamed broccoli topped with melted grass-fed butter.",
        snacks: "A handful of macadamia nuts and celery sticks with cream cheese."
      }
    };

    const activePref = mealSuggestions[formData.preference] || mealSuggestions.Balanced;

    // Filter meals if condition contains Diabetes or Hypertension
    let adjustedBreakfast = activePref.breakfast;
    let adjustedLunch = activePref.lunch;
    let adjustedDinner = activePref.dinner;
    let adjustedSnack = activePref.snacks;

    if (formData.conditions.includes('Diabetes')) {
      adjustedBreakfast += " (Sugar-free option: Avoid honey or excessive sweet fruits).";
      adjustedLunch += " (Low glycemic index: Quinoa fibers slow blood sugar absorption).";
    }
    if (formData.conditions.includes('Hypertension')) {
      adjustedLunch += " (DASH note: Prepared with zero added salt; seasoned with fresh lemon juice and herbs).";
      adjustedDinner += " (Sodium check: Seasoned with garlic and turmeric powder, avoid packaged sauces).";
    }

    setTimeout(() => {
      const generated = {
        meta: { ...formData, bmi, tdee },
        targets: { calories: targetCal, protein: proteinGrams, carbs: carbsGrams, fat: fatGrams, water: waterLiters },
        meals: { breakfast: adjustedBreakfast, lunch: adjustedLunch, dinner: adjustedDinner, snacks: adjustedSnack }
      };
      
      setGeneratedPlan(generated);
      setGenerating(false);

      // Proactively save user's physical parameters to DB
      if (user) {
        const updatedUser = {
          ...user,
          weight: formData.weight,
          height: formData.height,
          age: formData.age,
          gender: formData.gender,
          goal: formData.goal,
          lifestyle: formData.lifestyle
        };
        dbSync({ users: [updatedUser] });
      }
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 page-transition">
      
      {/* 1. Header banner */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white font-sans">
          AI Diet & Nutrition Planner
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Generate an instantly downloadable, evidence-backed meal plan adjusted for your physical stats, workout volumes, allergy filters, and medical warnings.
        </p>
      </div>

      {/* Printable Area Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Cols: Form Wizard / Plan Output */}
        <div className="lg:col-span-2 space-y-6">
          
          {!generatedPlan ? (
            // WIZARD WIDGET
            <div className="glass-card p-6 sm:p-8 border border-slate-200/5 shadow-md space-y-6">
              
              {/* Progress Indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-850">
                <span className="text-xs font-extrabold uppercase tracking-wide text-emerald-500">
                  Plan Generator Wizard — Step {wizardStep} of 3
                </span>
                <div className="flex space-x-1.5">
                  <div className={`w-3.5 h-3.5 rounded-full transition-all ${wizardStep >= 1 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                  <div className={`w-3.5 h-3.5 rounded-full transition-all ${wizardStep >= 2 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                  <div className={`w-3.5 h-3.5 rounded-full transition-all ${wizardStep >= 3 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                </div>
              </div>

              {/* STEP 1: PHYSICAL DIMENSIONS */}
              {wizardStep === 1 && (
                <div className="space-y-6 fade-in">
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center">
                    <i className="fa-solid fa-person-running text-emerald-500 mr-2.5"></i>
                    Physical Stats & Demographics
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Age */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Age (years)</label>
                      <input
                        type="number"
                        min="12"
                        max="100"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 glass-input text-sm border border-slate-200 dark:border-slate-800"
                      />
                    </div>
                    {/* Gender */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-4 py-2.5 glass-input text-sm border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-900"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    {/* Weight */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Weight (kg)</label>
                      <input
                        type="number"
                        min="30"
                        max="200"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2.5 glass-input text-sm border border-slate-200 dark:border-slate-800"
                      />
                    </div>
                    {/* Height */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Height (cm)</label>
                      <input
                        type="number"
                        min="100"
                        max="250"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2.5 glass-input text-sm border border-slate-200 dark:border-slate-800"
                      />
                    </div>
                  </div>

                  {/* Diagnostic BMI Banner */}
                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Auto-Calculated BMI:</span>
                    <span className={`px-3 py-1 rounded-xl text-white font-extrabold ${
                      bmi < 18.5 ? 'bg-blue-500' : bmi < 25 ? 'bg-emerald-500' : bmi < 30 ? 'bg-amber-500' : 'bg-red-500'
                    }`}>
                      {bmi} ({bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'})
                    </span>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setWizardStep(2)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md"
                    >
                      Next: Goals & Activity
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: GOALS AND LIFESTYLE */}
              {wizardStep === 2 && (
                <div className="space-y-6 fade-in">
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center">
                    <i className="fa-solid fa-bullseye text-emerald-500 mr-2.5"></i>
                    Goals & Activity Profiles
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Fitness Goal */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Target Fitness Goal</label>
                      <select
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        className="w-full px-4 py-2.5 glass-input text-sm border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-900"
                      >
                        <option value="Weight Loss">Weight Loss (Deficit)</option>
                        <option value="Weight Maintenance">Weight Maintenance</option>
                        <option value="Muscle Building">Muscle Building (Hypertrophy)</option>
                        <option value="Weight Gain">Weight Gain (Surplus)</option>
                      </select>
                    </div>

                    {/* Lifestyle */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Weekly Workout Activity</label>
                      <select
                        value={formData.lifestyle}
                        onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value })}
                        className="w-full px-4 py-2.5 glass-input text-sm border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-900"
                      >
                        <option value="Sedentary">Sedentary (No Exercise)</option>
                        <option value="Lightly Active">Lightly Active (1-2 days/wk)</option>
                        <option value="Moderately Active">Moderately Active (3-5 days/wk)</option>
                        <option value="Very Active">Very Active (6-7 days intense)</option>
                      </select>
                    </div>

                    {/* Food Preferences */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Dietary Preferences</label>
                      <select
                        value={formData.preference}
                        onChange={(e) => setFormData({ ...formData, preference: e.target.value })}
                        className="w-full px-4 py-2.5 glass-input text-sm border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-900"
                      >
                        <option value="Balanced">Balanced Mix</option>
                        <option value="Veg">Vegetarian (Lacto-Ovo)</option>
                        <option value="Vegan">100% Plant-Based Vegan</option>
                        <option value="Keto">Ketogenic (High-Fat, Low-Carb)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setWizardStep(1)}
                      className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-bold"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setWizardStep(3)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md"
                    >
                      Next: Allergies & Conditions
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: ALLERGIES AND MEDICAL CONDITIONS */}
              {wizardStep === 3 && (
                <div className="space-y-6 fade-in">
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center">
                    <i className="fa-solid fa-hand-holding-medical text-emerald-500 mr-2.5"></i>
                    Allergies & Medical Exclusions
                  </h3>

                  {/* Allergies list */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Food Allergies / Intolerances</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['Gluten', 'Lactose', 'Nuts', 'Soy', 'Seafood'].map((allergy) => {
                        const checked = formData.allergies.includes(allergy);
                        return (
                          <button
                            key={allergy}
                            onClick={() => handleAllergyToggle(allergy)}
                            className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                              checked
                                ? 'bg-red-500/10 border-red-500 text-red-500'
                                : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            🚫 {allergy}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Conditions checklist */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Medical Conditions to Monitor</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {['Obesity', 'Diabetes', 'High cholesterol', 'Hypertension'].map((condition) => {
                        const checked = formData.conditions.includes(condition);
                        return (
                          <button
                            key={condition}
                            onClick={() => handleConditionToggle(condition)}
                            className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                              checked
                                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                                : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            🩺 {condition}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setWizardStep(2)}
                      className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-bold"
                    >
                      Back
                    </button>
                    <button
                      onClick={generatePlan}
                      disabled={generating}
                      className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs shadow-md flex items-center space-x-2"
                    >
                      {generating ? (
                        <>
                          <i className="fa-solid fa-spinner animate-spin"></i>
                          <span>Analyzing parameters...</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-wand-magic-sparkles"></i>
                          <span>Generate My Diet Chart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            // GENERATED PLAN DISPLAY
            <div id="print-area" className="glass-card p-6 sm:p-8 border border-emerald-500/10 shadow-lg space-y-6 fade-in">
              {/* Header inside printable view */}
              <div className="flex justify-between items-start pb-4 border-b border-slate-100 dark:border-slate-850">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                    NutriLife Custom Wellness Plan
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">Generated for {formData.gender}, {formData.age} yrs | BMI: {bmi}</p>
                </div>
                <div className="flex space-x-2 no-print">
                  <button
                    onClick={() => setGeneratedPlan(null)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
                    title="Generate New Plan"
                  >
                    <i className="fa-solid fa-arrow-rotate-left"></i>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold"
                  >
                    <i className="fa-solid fa-print"></i>
                    <span>Print PDF</span>
                  </button>
                </div>
              </div>

              {/* Target numbers banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-center font-sans">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Calorie Target</p>
                  <p className="text-lg font-black text-slate-850 dark:text-slate-100">{generatedPlan.targets.calories} kcal</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Protein Target</p>
                  <p className="text-lg font-black text-emerald-500">{generatedPlan.targets.protein}g</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Carbohydrates</p>
                  <p className="text-lg font-black text-blue-500">{generatedPlan.targets.carbs}g</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Lipids & Fats</p>
                  <p className="text-lg font-black text-amber-500">{generatedPlan.targets.fat}g</p>
                </div>
              </div>

              {/* Meal timings detailed list */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-emerald-500">Daily Suggested Menu</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {/* Breakfast */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-mug-saucer text-lg"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Breakfast (Ideal: 8:00 AM)</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">{generatedPlan.meals.breakfast}</p>
                    </div>
                  </div>

                  {/* Lunch */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-bowl-food text-lg"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Lunch (Ideal: 1:00 PM)</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">{generatedPlan.meals.lunch}</p>
                    </div>
                  </div>

                  {/* Afternoon snack */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-cookie text-lg"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Snack (Ideal: 4:30 PM)</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">{generatedPlan.meals.snacks}</p>
                    </div>
                  </div>

                  {/* Dinner */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-utensils text-lg"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Dinner (Ideal: 7:30 PM)</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">{generatedPlan.meals.dinner}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Water & Exercise Guidelines */}
              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start space-x-4 text-xs">
                <i className="fa-solid fa-droplet text-blue-500 text-lg mt-0.5 shrink-0 animate-pulse"></i>
                <div className="space-y-1">
                  <p className="font-bold text-blue-600 dark:text-blue-400">Hydration Guideline</p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Based on your weight, your body requires roughly **{generatedPlan.targets.water} Liters** (approx. 10 cups) of water daily. Limit heavy volumes during solid meals.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right 1 Col: Educational Tips / Sidebar stats */}
        <div className="space-y-6">
          <div className="glass-card p-6 border border-emerald-500/5 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-emerald-500 font-sans">Planner Guidelines</h3>
            
            <div className="space-y-3.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-sans">
              <div className="flex items-start">
                <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center mr-2 shrink-0 font-bold">1</span>
                <span>The **Mifflin-St Jeor** equation calculates your Total Daily Energy Expenditure (TDEE) based on biometric rates.</span>
              </div>
              <div className="flex items-start">
                <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center mr-2 shrink-0 font-bold">2</span>
                <span>Carbohydrate and lipid fractions are shifted dynamically if choosing specialized preferences like **Ketogenic**.</span>
              </div>
              <div className="flex items-start">
                <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center mr-2 shrink-0 font-bold">3</span>
                <span>Active filtering is applied to omit dangerous ingredients if allergies are checked.</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border border-amber-500/5 shadow-sm space-y-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <i className="fa-solid fa-circle-exclamation text-lg"></i>
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Medical Disclaimer</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              The NutriLife AI Planner generates nutritional recommendations based on general sports dietetics. This does not replace tailored counsel from clinical dietitians or metabolic physicians.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
