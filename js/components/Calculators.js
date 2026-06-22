// NutriLife Health & Metabolic Calculators Component (ES MODULE VIA BABEL)

 function Calculators() {
  // =========================
  // SUPABASE CONFIG / STATE
  // =========================
  const supabase = window.supabaseClient;

  if (!supabase) {
    return (
      <div className="p-10 text-red-500 text-center font-medium bg-red-50 rounded-xl max-w-md mx-auto mt-12 border border-red-100">
        <i className="fa-solid fa-triangle-exclamation mr-2"></i>
        Supabase infrastructure failed to connect.
      </div>
    );
  }

  const [user, setUser] = React.useState(null);
  const [inputs, setInputs] = React.useState({
    weight: "",
    height: "",
    age: "",
    gender: "Male",
    activity: "Moderately Active",
    neck: "",
    waist: "",
    hip: "",
    goal: "Maintenance"
  });

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleInputChange = (key, value) => {
    setInputs(prev => ({
      ...prev,
      [key]: value === "" ? "" : value
    }));
  };

  // =========================
  // METABOLIC MEMO FORMULAS
  // =========================
  const bmi = React.useMemo(() => {
    if (!inputs.height || !inputs.weight) return "0.0";
    const heightM = inputs.height / 100;
    return (inputs.weight / (heightM * heightM)).toFixed(1);
  }, [inputs.height, inputs.weight]);

  const calorieTarget = React.useMemo(() => {
    if (!inputs.weight || !inputs.height || !inputs.age) return 0;

    let bmr;
    if (inputs.gender === "Male") {
      bmr = 10 * inputs.weight + 6.25 * inputs.height - 5 * inputs.age + 5;
    } else {
      bmr = 10 * inputs.weight + 6.25 * inputs.height - 5 * inputs.age - 161;
    }

    const factors = {
      "Sedentary": 1.2,
      "Lightly Active": 1.375,
      "Moderately Active": 1.55,
      "Very Active": 1.725
    };

    let tdee = Math.round(bmr * (factors[inputs.activity] || 1.2));

    if (inputs.goal === "Loss") tdee -= 500;
    if (inputs.goal === "Gain") tdee += 400;

    return tdee;
  }, [inputs]);

  const waterTarget = React.useMemo(() => {
    if (!inputs.weight) return "0.0";
    return (inputs.weight * 0.035 + 0.4).toFixed(1);
  }, [inputs.weight]);

  const proteinTarget = React.useMemo(() => {
    if (!inputs.weight) return 0;
    return Math.round(inputs.weight * 1.6);
  }, [inputs.weight]);

  return (
    <div className="space-y-8 page-transition">
      {/* HEADER PANELS */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-calculator text-emerald-500"></i> Metabolic Calculator Engine
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Calculate your Body Mass Index (BMI), customized baseline macro splits, and water optimization limits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* INPUT PARAMETERS MATRIX */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Biometric Parameters</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Weight (kg)</label>
              <input
                type="number"
                placeholder="e.g. 70"
                className="w-full border dark:border-slate-800 rounded-xl p-2.5 bg-transparent text-sm focus:ring-2 focus:ring-emerald-500/20"
                value={inputs.weight}
                onChange={e => handleInputChange("weight", e.target.value ? Number(e.target.value) : "")}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Height (cm)</label>
              <input
                type="number"
                placeholder="e.g. 175"
                className="w-full border dark:border-slate-800 rounded-xl p-2.5 bg-transparent text-sm focus:ring-2 focus:ring-emerald-500/20"
                value={inputs.height}
                onChange={e => handleInputChange("height", e.target.value ? Number(e.target.value) : "")}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Biological Age</label>
              <input
                type="number"
                placeholder="e.g. 28"
                className="w-full border dark:border-slate-800 rounded-xl p-2.5 bg-transparent text-sm focus:ring-2 focus:ring-emerald-500/20"
                value={inputs.age}
                onChange={e => handleInputChange("age", e.target.value ? Number(e.target.value) : "")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Gender Allocation</label>
              <select
                className="w-full border dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-2.5 text-sm"
                value={inputs.gender}
                onChange={e => handleInputChange("gender", e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Activity Multiplier (TDEE)</label>
              <select
                className="w-full border dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-2.5 text-sm"
                value={inputs.activity}
                onChange={e => handleInputChange("activity", e.target.value)}
              >
                <option value="Sedentary">Sedentary (Office job)</option>
                <option value="Lightly Active">Lightly Active (1-2 days/wk)</option>
                <option value="Moderately Active">Moderately Active (3-5 days/wk)</option>
                <option value="Very Active">Very Active (6-7 days heavy workout)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Primary Wellness Goal</label>
              <select
                className="w-full border dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-2.5 text-sm"
                value={inputs.goal}
                onChange={e => handleInputChange("goal", e.target.value)}
              >
                <option value="Maintenance">Maintenance Splitting</option>
                <option value="Loss">Caloric Deficit (-500 kcal)</option>
                <option value="Gain">Caloric Surplus (+400 kcal)</option>
              </select>
            </div>
          </div>
        </div>

        {/* RESULTS METRIC BOXES */}
        <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
            <i className="fa-solid fa-square-poll-vertical text-emerald-500"></i> Calculated Output Profile
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* BMI CARD */}
            <div className="bg-white dark:bg-slate-900 border p-4 rounded-xl shadow-sm text-center">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Body Mass Index</span>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">{bmi}</p>
              <span className="text-[10px] text-emerald-500 font-medium">
                {Number(bmi) === 0 ? "Pending" : Number(bmi) < 18.5 ? "Underweight" : Number(bmi) < 25 ? "Normal Range" : "Overweight"}
              </span>
            </div>

            {/* TOTAL CALORIES TDEE CARD */}
            <div className="bg-white dark:bg-slate-900 border p-4 rounded-xl shadow-sm text-center">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Daily Calorie Target</span>
              <p className="text-2xl font-extrabold text-emerald-500 mt-1">{calorieTarget || "—"}</p>
              <span className="text-[10px] text-slate-400 font-medium">kcal / day allocation</span>
            </div>

            {/* WATER TARGET CARD */}
            <div className="bg-white dark:bg-slate-900 border p-4 rounded-xl shadow-sm text-center">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Hydration Threshold</span>
              <p className="text-2xl font-extrabold text-blue-500 mt-1">{waterTarget}</p>
              <span className="text-[10px] text-slate-400 font-medium">Liters / day limit</span>
            </div>

            {/* PROTEIN CARD */}
            <div className="bg-white dark:bg-slate-900 border p-4 rounded-xl shadow-sm text-center">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Recommended Protein</span>
              <p className="text-2xl font-extrabold text-indigo-500 mt-1">{proteinTarget || "—"}</p>
              <span className="text-[10px] text-slate-400 font-medium">grams / day threshold</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}