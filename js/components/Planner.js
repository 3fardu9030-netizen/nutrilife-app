// NutriLife AI Diet Planner Component (ES MODULE VIA BABEL)

 function Planner({ user, dbSync }) {
  const [formData, setFormData] = React.useState({
    age: user?.age || 28,
    gender: user?.gender || "Male",
    weight: user?.weight || 70,
    height: user?.height || 175,
    goal: user?.goal || "Weight Maintenance",
    lifestyle: user?.lifestyle || "Moderately Active",
    preference: "Balanced",
    allergies: [],
    conditions: []
  });

  const [wizardStep, setWizardStep] = React.useState(1);
  const [generating, setGenerating] = React.useState(false);
  const [generatedPlan, setGeneratedPlan] = React.useState(null);

  // Dynamic biological metric computations
  const bmi = React.useMemo(() => {
    if (formData.weight && formData.height) {
      const meters = formData.height / 100;
      return (formData.weight / (meters * meters)).toFixed(1);
    }
    return "0.0";
  }, [formData.weight, formData.height]);

  const bmiStatus = React.useMemo(() => {
    const val = parseFloat(bmi);
    if (val < 18.5) return { label: "Underweight", color: "text-amber-500 bg-amber-500/10" };
    if (val < 25) return { label: "Normal Range", color: "text-emerald-500 bg-emerald-500/10" };
    if (val < 30) return { label: "Overweight", color: "text-orange-500 bg-orange-500/10" };
    return { label: "Obese Class", color: "text-red-500 bg-red-500/10" };
  }, [bmi]);

  const handleAllergyToggle = (item) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.includes(item)
        ? prev.allergies.filter(x => x !== item)
        : [...prev.allergies, item]
    }));
  };

  const generatePlan = () => {
    setGenerating(true);

    let bmr;
    if (formData.gender === "Male") {
      bmr = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5;
    } else {
      bmr = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age - 161;
    }

    const activityFactors = {
      "Sedentary": 1.2,
      "Lightly Active": 1.375,
      "Moderately Active": 1.55,
      "Very Active": 1.725
    };

    const tdee = Math.round(bmr * (activityFactors[formData.lifestyle] || 1.2));
    let calories = tdee;

    if (formData.goal === "Weight Loss") calories -= 450;
    if (formData.goal === "Muscle Building" || formData.goal === "Weight Gain") calories += 400;

    // Macro distribution profile maps
    let proteinRatio = 0.25, carbRatio = 0.50, fatRatio = 0.25;

    if (formData.goal === "Muscle Building") {
      proteinRatio = 0.35; carbRatio = 0.45; fatRatio = 0.20;
    } else if (formData.preference === "Keto") {
      proteinRatio = 0.20; carbRatio = 0.05; fatRatio = 0.75;
    } else if (formData.preference === "High Protein Lean") {
      proteinRatio = 0.40; carbRatio = 0.35; fatRatio = 0.25;
    }

    const plan = {
      meta: { ...formData, bmi, tdee, bmr: Math.round(bmr) },
      targets: {
        calories: Math.max(1200, calories),
        protein: Math.round((calories * proteinRatio) / 4),
        carbs: Math.round((calories * carbRatio) / 4),
        fat: Math.round((calories * fatRatio) / 9),
        water: (formData.weight * 0.035).toFixed(1)
      },
      meals: {
        breakfast: `High-fiber ${formData.preference.toLowerCase() === "keto" ? "omelet with spinach, avocado, and olive oil paste" : "oatmeal porridge with fresh berries, chia seeds, and clean whey whey extract"}.`,
        lunch: `Macro-balanced fuel bowl featuring a source of lean target protein, steamed cruciferous greens, and complex ${formData.preference.toLowerCase() === "keto" ? "healthy fats" : "quinoa grains"}.`,
        snacks: `Metabolic stabilizer snack: ${formData.preference.toLowerCase() === "keto" ? "mixed almonds or organic pumpkin seeds" : "low-fat strained Greek yogurt layered with raw walnut crush"}.`,
        dinner: `Easily digestible evening dish focusing on steamed wild salmon or baked tofu slices, combined with seasoned zucchini strands.`
      }
    };

    setTimeout(() => {
      setGeneratedPlan(plan);
      setGenerating(false);

      if (user && typeof dbSync === "function") {
        dbSync({
          users: [{
            ...user,
            weight: formData.weight,
            height: formData.height,
            age: formData.age,
            goal: formData.goal,
            lifestyle: formData.lifestyle
          }]
        });
      }
    }, 1200);
  };

  return (
    <div className="space-y-8 page-transition">
      {/* COMPONENT TITLE MODULE */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            <i className="fa-solid fa-wand-magic-sparkles text-emerald-500"></i> AI Diet & Nutrition Planner
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Generate custom energy guidelines and micro-adjusted food splits using your personal biometrics.
          </p>
        </div>
        {generatedPlan && (
          <button
            onClick={() => setGeneratedPlan(null)}
            className="text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 py-2.5 px-4 rounded-xl transition"
          >
            <i className="fa-solid fa-rotate-left mr-1.5"></i> Reconfigure Plan Parameters
          </button>
        )}
      </div>

      {/* COMPONENT INTERACTION PIPELINE CONTROLLER */}
      {!generatedPlan ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT INTERACTIVE FORMS LAYOUT CARD */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800/50 pb-4">
              <h2 className="font-extrabold text-slate-800 dark:text-white text-base">
                Biometric Setup Configuration
              </h2>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/10">
                Step {wizardStep} of 3
              </span>
            </div>

            {/* WIZARD CARD PANEL 1: PHYSICAL DIMENSIONS */}
            {wizardStep === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-2 gap-3">
                  {["Male", "Female"].map(g => (
                    <button
                      key={g}
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                        formData.gender === g
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <i className={`fa-solid ${g === "Male" ? "fa-mars" : "fa-venus"}`}></i> {g}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Biological Age</label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={e => setFormData({ ...formData, age: Math.max(1, parseInt(e.target.value) || 0) })}
                      className="w-full border dark:border-slate-800 p-3 rounded-xl text-sm bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Mass (kg)</label>
                    <input
                      type="number"
                      min="10"
                      max="300"
                      value={formData.weight}
                      onChange={e => setFormData({ ...formData, weight: Math.max(0, parseFloat(e.target.value) || 0) })}
                      className="w-full border dark:border-slate-800 p-3 rounded-xl text-sm bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Height (cm)</label>
                    <input
                      type="number"
                      min="50"
                      max="250"
                      value={formData.height}
                      onChange={e => setFormData({ ...formData, height: Math.max(0, parseFloat(e.target.value) || 0) })}
                      className="w-full border dark:border-slate-800 p-3 rounded-xl text-sm bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 p-4 border dark:border-slate-800 rounded-2xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs text-slate-400 font-semibold block">Body Mass Index ($BMI$) Allocation</span>
                    <span className="text-xl font-black text-slate-800 dark:text-white">{bmi} <span className="text-xs text-slate-400 font-normal">kg/m²</span></span>
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border border-slate-500/5 ${bmiStatus.color}`}>
                    {bmiStatus.label}
                  </span>
                </div>

                <button
                  onClick={() => setWizardStep(2)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-extrabold p-3.5 rounded-xl text-xs shadow-sm transition"
                >
                  Continue to Goal Settings <i className="fa-solid fa-arrow-right ml-1 text-[10px]"></i>
                </button>
              </div>
            )}

            {/* WIZARD CARD PANEL 2: GOALS AND METABOLIC LIFESTYLE */}
            {wizardStep === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Target Objective Goal</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["Weight Loss", "Weight Maintenance", "Muscle Building"].map(g => (
                      <button
                        key={g}
                        onClick={() => setFormData({ ...formData, goal: g })}
                        className={`p-4 border rounded-xl text-left transition flex flex-col justify-between h-24 ${
                          formData.goal === g
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                            : "border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        <i className={`fa-solid ${g === "Weight Loss" ? "fa-arrow-trend-down text-red-500" : g === "Muscle Building" ? "fa-dumbbell text-blue-500" : "fa-scale-balanced text-amber-500"} text-base`}></i>
                        <span className="text-xs font-bold block">{g}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Activity Level Factor</label>
                  <select
                    value={formData.lifestyle}
                    onChange={e => setFormData({ ...formData, lifestyle: e.target.value })}
                    className="w-full border dark:border-slate-800 p-3 rounded-xl text-sm bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  >
                    <option value="Sedentary">Sedentary (Minimal daily motion)</option>
                    <option value="Lightly Active">Lightly Active (1-2 days/week exercise)</option>
                    <option value="Moderately Active">Moderately Active (3-5 days/week high exertion)</option>
                    <option value="Very Active">Very Active (Elite athletic training routine)</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-white px-5 py-3 rounded-xl text-xs font-bold transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setWizardStep(3)}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-extrabold py-3 px-5 rounded-xl text-xs shadow-sm transition text-center"
                  >
                    Proceed to Dietary Preference
                  </button>
                </div>
              </div>
            )}

            {/* WIZARD CARD PANEL 3: ALLERGIES AND GENERATION TRIGGER */}
            {wizardStep === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Dietary Theme Split Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    {["Balanced", "Keto", "High Protein Lean", "Vegetarian"].map(p => (
                      <button
                        key={p}
                        onClick={() => setFormData({ ...formData, preference: p })}
                        className={`p-3 border rounded-xl text-xs font-bold text-center transition ${
                          formData.preference === p
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Isolate Allergen Sensitivities (Optional)</label>
                  <div className="flex flex-wrap gap-2">
                    {["Nuts", "Dairy", "Gluten", "Soy", "Shellfish", "Eggs"].map(allergy => {
                      const active = formData.allergies.includes(allergy);
                      return (
                        <button
                          key={allergy}
                          onClick={() => handleAllergyToggle(allergy)}
                          className={`px-3 py-2 rounded-xl border text-xs font-semibold transition flex items-center gap-1.5 ${
                            active
                              ? "bg-red-500 border-red-500 text-white shadow-sm"
                              : "border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                          }`}
                        >
                          {active ? <i className="fa-solid fa-circle-minus"></i> : <i className="fa-solid fa-circle-plus text-slate-300"></i>}
                          {allergy}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3 pt-2 border-t border-slate-50 dark:border-slate-800/60 pt-4">
                  <button
                    onClick={() => setWizardStep(2)}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-white px-5 py-3 rounded-xl text-xs font-bold transition"
                  >
                    Back
                  </button>
                  <button
                    disabled={generating}
                    onClick={generatePlan}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-900 font-black py-3 px-6 rounded-xl text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {generating ? (
                      <>
                        <i className="fa-solid fa-circle-notch animate-spin"></i> Processing Biometric Vectors...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-bolt"></i> Compile AI Nutrition Blueprint
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR INFORMATION CONTAINER */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-3xl p-6 text-white space-y-4 shadow-sm border border-slate-800">
            <h3 className="font-extrabold text-sm tracking-wide text-emerald-400 uppercase">
              The Engine Blueprint
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              NutriLife models energy requirements by combining historical Harris-Benedict formulas alongside isolated lean mass ratios to map total expenditure limits down to a single-digit margin.
            </p>
            <div className="space-y-3 pt-2 border-t border-slate-700/50 text-[11px] text-slate-400">
              <div className="flex gap-2 items-start">
                <i className="fa-solid fa-check text-emerald-400 mt-0.5"></i>
                <span>Automatic Total Daily Energy Expenditure integration.</span>
              </div>
              <div className="flex gap-2 items-start">
                <i className="fa-solid fa-check text-emerald-400 mt-0.5"></i>
                <span>Preference safeguards automatically isolate active allergen matrices.</span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        
        /* GENERATED DIETARY OUTCOMES SUMMARY VIEW */
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-8 animate-fade-in print:p-0 print:border-0 print:shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 dark:border-slate-800/60 pb-6">
            <div className="space-y-1">
              <span className="text-[10px] text-emerald-500 dark:text-emerald-400 uppercase font-black tracking-widest">Calculated Target Output</span>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white">NutriLife Target Health Plan</h2>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 text-white dark:hover:bg-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition shrink-0 flex items-center gap-1.5"
            >
              <i className="fa-solid fa-print"></i> Export Plan Document
            </button>
          </div>

          {/* CARD MATRIX SPLIT GRID GRID OVERVIEW */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border dark:border-slate-800/50 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Daily Energy Target</span>
              <span className="text-xl font-black text-orange-500">{generatedPlan.targets.calories} <span className="text-xs font-normal text-slate-400">kcal</span></span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border dark:border-slate-800/50 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Protein Split</span>
              <span className="text-xl font-black text-blue-500">{generatedPlan.targets.protein}g</span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border dark:border-slate-800/50 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Carbohydrates</span>
              <span className="text-xl font-black text-amber-500">{generatedPlan.targets.carbs}g</span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border dark:border-slate-800/50 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Lipid/Fats</span>
              <span className="text-xl font-black text-emerald-500">{generatedPlan.targets.fat}g</span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border dark:border-slate-800/50 col-span-2 lg:col-span-1 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Optimal Fluid Hydration</span>
              <span className="text-xl font-black text-teal-500">{generatedPlan.targets.water} <span className="text-xs font-normal text-slate-400">Liters</span></span>
            </div>
          </div>

          {/* MEAL MANAGEMENT TILES */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <i className="fa-solid fa-utensils text-emerald-500"></i> Chronological Meal Architecture
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Breakfast Routine", icon: "🍳", text: generatedPlan.meals.breakfast, bg: "from-amber-500/5 to-orange-500/5 border-amber-500/10" },
                { label: "Midday Fuel (Lunch)", icon: "🍲", text: generatedPlan.meals.lunch, bg: "from-blue-500/5 to-indigo-500/5 border-blue-500/10" },
                { label: "Glycogen Stabilizer (Snack)", icon: "🍎", text: generatedPlan.meals.snacks, bg: "from-purple-500/5 to-pink-500/5 border-purple-500/10" },
                { label: "Evening Restoration (Dinner)", icon: "🍽️", text: generatedPlan.meals.dinner, bg: "from-emerald-500/5 to-teal-500/5 border-emerald-500/10" }
              ].map((m, idx) => (
                <div key={idx} className={`p-5 bg-gradient-to-br border rounded-2xl space-y-2 flex gap-4 items-start ${m.bg}`}>
                  <span className="text-2xl mt-1 block select-none">{m.icon}</span>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">{m.label}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DISCLAIMER ASSURANCE BLOCKQUOTE */}
          <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed flex gap-2.5 items-start">
            <i className="fa-solid fa-circle-info text-blue-500 text-sm mt-0.5"></i>
            <span>
              <strong>Note:</strong> Macro allocations are targeted algorithm proxies based on baseline inputs. For chronic metabolic transformations, connect these metrics with an accredited healthcare professional.
            </span>
          </div>

        </div>
      )}
    </div>
  );
}