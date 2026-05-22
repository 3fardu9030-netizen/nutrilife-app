// NutriLife Health Calculators Suite
window.Calculators = function () {
  const [activeTab, setActiveTab] = React.useState('bmi');

  // Unified State for calculators
  const [inputs, setInputs] = React.useState({
    weight: 70,
    height: 175,
    age: 28,
    gender: 'Male',
    activity: 'Moderately Active',
    neck: 38,
    waist: 84,
    hip: 94, // Female specific
    goal: 'Maintenance'
  });

  const handleInputChange = (key, val) => {
    setInputs({ ...inputs, [key]: val });
  };

  // BMI CALCULATOR OUTPUTS
  const bmi = React.useMemo(() => {
    const heightM = inputs.height / 100;
    return (inputs.weight / (heightM * heightM)).toFixed(1);
  }, [inputs.weight, inputs.height]);

  const bmiStatus = React.useMemo(() => {
    const val = parseFloat(bmi);
    if (val < 18.5) return { name: 'Underweight', color: 'text-blue-500 bg-blue-500/10', dial: '15%' };
    if (val < 25.0) return { name: 'Normal', color: 'text-emerald-500 bg-emerald-500/10', dial: '45%' };
    if (val < 30.0) return { name: 'Overweight', color: 'text-amber-500 bg-amber-500/10', dial: '75%' };
    return { name: 'Obese', color: 'text-red-500 bg-red-500/10', dial: '92%' };
  }, [bmi]);

  // DAILY CALORIE OUTPUTS
  const calorieTarget = React.useMemo(() => {
    let bmr = 0;
    if (inputs.gender === 'Male') {
      bmr = 10 * inputs.weight + 6.25 * inputs.height - 5 * inputs.age + 5;
    } else {
      bmr = 10 * inputs.weight + 6.25 * inputs.height - 5 * inputs.age - 161;
    }
    const factorMap = {
      'Sedentary': 1.2,
      'Lightly Active': 1.375,
      'Moderately Active': 1.55,
      'Very Active': 1.725
    };
    const tdee = Math.round(bmr * (factorMap[inputs.activity] || 1.2));
    
    if (inputs.goal === 'Loss') return tdee - 500;
    if (inputs.goal === 'Gain') return tdee + 400;
    return tdee;
  }, [inputs.weight, inputs.height, inputs.age, inputs.gender, inputs.activity, inputs.goal]);

  // WATER ESTIMATOR OUTPUT
  const waterTarget = React.useMemo(() => {
    // 35ml per kg of bodyweight + exercise multiplier pad
    const baseline = inputs.weight * 0.035; 
    return (baseline + 0.4).toFixed(1); // litres
  }, [inputs.weight]);

  // BODY FAT ESTIMATOR (US Navy Formula)
  const bodyFat = React.useMemo(() => {
    // Height, waist, neck, hip in inches for formula
    const h = inputs.height / 2.54;
    const w = inputs.waist / 2.54;
    const n = inputs.neck / 2.54;
    const hip = inputs.hip / 2.54;

    try {
      if (inputs.gender === 'Male') {
        const val = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
        return isNaN(val) ? 18.0 : parseFloat(val.toFixed(1));
      } else {
        const val = 163.205 * Math.log10(w + hip - n) - 97.684 * Math.log10(h) - 78.387;
        return isNaN(val) ? 24.5 : parseFloat(val.toFixed(1));
      }
    } catch {
      return inputs.gender === 'Male' ? 18.0 : 25.0;
    }
  }, [inputs]);

  // PROTEIN TARGET
  const proteinTarget = React.useMemo(() => {
    // Based on bodyweight and goals
    let multiplier = 1.2; // Sedentary baseline g/kg
    if (inputs.activity === 'Moderately Active') multiplier = 1.6;
    else if (inputs.activity === 'Very Active') multiplier = 2.0;

    return Math.round(inputs.weight * multiplier);
  }, [inputs.weight, inputs.activity]);

  return (
    <div className="space-y-8 page-transition">
      {/* Title Header */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white font-sans">
          BMI & Metabolic Health Calculators
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Perform clinical sports-dietetics calculations. View body mass indexes, required hydration, lean protein multipliers, and estimated body fat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Form Inputs (Unified for all calculators) */}
        <div className="glass-card p-6 border border-slate-200/5 shadow-md space-y-6">
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-emerald-500 flex items-center">
            <i className="fa-solid fa-sliders mr-2"></i> Adjust Parameters
          </h3>

          <div className="space-y-4 text-xs font-sans">
            
            {/* Height Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">Height</span>
                <span className="text-slate-800 dark:text-slate-200">{inputs.height} cm</span>
              </div>
              <input
                type="range"
                min="120"
                max="220"
                value={inputs.height}
                onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                className="custom-slider"
              />
            </div>

            {/* Weight Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">Weight</span>
                <span className="text-slate-800 dark:text-slate-200">{inputs.weight} kg</span>
              </div>
              <input
                type="range"
                min="40"
                max="150"
                value={inputs.weight}
                onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
                className="custom-slider"
              />
            </div>

            {/* Age */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500">Age</label>
                <input
                  type="number"
                  value={inputs.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 28)}
                  className="w-full px-3 py-2 glass-input border border-slate-200 dark:border-slate-805"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500">Gender</label>
                <select
                  value={inputs.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 glass-input border border-slate-200 dark:border-slate-805 bg-transparent dark:bg-slate-900"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* Activity Level */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-500">Daily Exercise Level</label>
              <select
                value={inputs.activity}
                onChange={(e) => handleInputChange('activity', e.target.value)}
                className="w-full px-3 py-2 glass-input border border-slate-200 dark:border-slate-805 bg-transparent dark:bg-slate-900"
              >
                <option value="Sedentary">Sedentary (desk job)</option>
                <option value="Lightly Active">Lightly Active (1-2 days/wk)</option>
                <option value="Moderately Active">Moderately Active (3-5 days/wk)</option>
                <option value="Very Active">Very Active (heavy weight sessions)</option>
              </select>
            </div>

            {/* Body Fat specific metrics */}
            {activeTab === 'fat' && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 fade-in">
                <p className="text-[10px] text-amber-500 font-extrabold uppercase tracking-wide">US Navy Tape measurements</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-400">Neck (cm)</label>
                    <input
                      type="number"
                      value={inputs.neck}
                      onChange={(e) => handleInputChange('neck', parseFloat(e.target.value) || 38)}
                      className="w-full px-2 py-1.5 glass-input border text-center text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-400">Waist (cm)</label>
                    <input
                      type="number"
                      value={inputs.waist}
                      onChange={(e) => handleInputChange('waist', parseFloat(e.target.value) || 84)}
                      className="w-full px-2 py-1.5 glass-input border text-center text-xs"
                    />
                  </div>
                  {inputs.gender === 'Female' && (
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-400">Hip (cm)</label>
                      <input
                        type="number"
                        value={inputs.hip}
                        onChange={(e) => handleInputChange('hip', parseFloat(e.target.value) || 94)}
                        className="w-full px-2 py-1.5 glass-input border text-center text-xs"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right 2 Columns: Outputs Tabbed Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Calculators Tabs Bar */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
            <button
              onClick={() => setActiveTab('bmi')}
              className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'bmi' ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-slate-450 hover:text-emerald-500'
              }`}
            >
              📊 BMI Indicator
            </button>
            <button
              onClick={() => setActiveTab('calorie')}
              className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'calorie' ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-slate-450 hover:text-emerald-500'
              }`}
            >
              🔥 Calorie Target
            </button>
            <button
              onClick={() => setActiveTab('water')}
              className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'water' ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-slate-450 hover:text-emerald-500'
              }`}
            >
              💧 Water Intake
            </button>
            <button
              onClick={() => setActiveTab('protein')}
              className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'protein' ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-slate-450 hover:text-emerald-500'
              }`}
            >
              💪 Protein Multiplier
            </button>
            <button
              onClick={() => setActiveTab('fat')}
              className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'fat' ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-slate-450 hover:text-emerald-500'
              }`}
            >
              ⚖️ Body Fat tape
            </button>
          </div>

          {/* TAB 1: BMI VIEW */}
          {activeTab === 'bmi' && (
            <div className="glass-card p-6 border border-emerald-500/5 shadow-md space-y-6 fade-in">
              
              {/* Large Metric Gauge */}
              <div className="flex flex-col items-center justify-center space-y-3.5 py-4 text-center">
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Your Body Mass Index</p>
                <h2 className="text-5xl sm:text-6xl font-black text-slate-800 dark:text-white font-sans tracking-tight">
                  {bmi}
                </h2>
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${bmiStatus.color}`}>
                  {bmiStatus.name}
                </span>
              </div>

              {/* Graphical Scale */}
              <div className="space-y-2">
                <div className="w-full bg-slate-100 dark:bg-slate-850 h-3 rounded-full relative">
                  {/* Slider pin */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 shadow-md transition-all duration-300"
                    style={{ left: bmiStatus.dial }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-4 text-[10px] text-slate-400 font-extrabold text-center uppercase">
                  <span>&lt;18.5 (Under)</span>
                  <span>18.5-24.9 (Norm)</span>
                  <span>25-29.9 (Over)</span>
                  <span>30+ (Obese)</span>
                </div>
              </div>

              {/* Informative block */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                A healthy BMI range sits between **18.5 and 24.9**. Maintaining a normal index drastically reduces physiological loads on joints, arteries, insulin receptors, and kidneys.
              </div>
            </div>
          )}

          {/* TAB 2: CALORIES */}
          {activeTab === 'calorie' && (
            <div className="glass-card p-6 border border-emerald-500/5 shadow-md space-y-6 fade-in">
              
              {/* Select Goal */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Adjustment Goal</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Loss', 'Maintenance', 'Gain'].map((g) => (
                    <button
                      key={g}
                      onClick={() => handleInputChange('goal', g)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all uppercase ${
                        inputs.goal === g
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'border-slate-200 dark:border-slate-805 bg-transparent'
                      }`}
                    >
                      {g === 'Loss' ? '📉 Fat Loss' : g === 'Gain' ? '📈 Surplus' : '⚖️ Maintain'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Daily Calorie Target</p>
                <h2 className="text-5xl font-black text-slate-800 dark:text-white font-sans tracking-tight">
                  {calorieTarget} <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Kcal</span>
                </h2>
                <p className="text-xs text-emerald-500 font-semibold mt-1">Adjusted for {inputs.activity.toLowerCase()} lifestyles</p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Carbs (50%)</p>
                  <p className="text-sm font-extrabold text-blue-500">{Math.round((calorieTarget * 0.50) / 4)}g</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Protein (25%)</p>
                  <p className="text-sm font-extrabold text-emerald-500">{Math.round((calorieTarget * 0.25) / 4)}g</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Fats (25%)</p>
                  <p className="text-sm font-extrabold text-amber-500">{Math.round((calorieTarget * 0.25) / 9)}g</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WATER */}
          {activeTab === 'water' && (
            <div className="glass-card p-6 border border-blue-500/5 shadow-md space-y-6 fade-in">
              <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2">
                  <i className="fa-solid fa-droplet text-3xl animate-bounce"></i>
                </div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Daily Water Target</p>
                <h2 className="text-5xl font-black text-blue-500 font-sans tracking-tight">
                  {waterTarget} <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest text-slate-400">Liters</span>
                </h2>
                <p className="text-xs text-slate-400 font-semibold">Roughly equivalent to **{Math.round(waterTarget * 4)} large glasses**</p>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs leading-relaxed text-slate-600 dark:text-slate-350">
                Proper fluid volumes protect glomerular filtration structures in kidneys, ensure high circulatory volume (diluting sodium), and promote high neural clarity.
              </div>
            </div>
          )}

          {/* TAB 4: PROTEIN */}
          {activeTab === 'protein' && (
            <div className="glass-card p-6 border border-emerald-500/5 shadow-md space-y-6 fade-in">
              <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
                  <i className="fa-solid fa-dumbbell text-3xl"></i>
                </div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Lean Protein target</p>
                <h2 className="text-5xl font-black text-emerald-500 font-sans tracking-tight">
                  {proteinTarget} <span className="text-xs font-extrabold text-slate-455 uppercase tracking-widest text-slate-400">Grams</span>
                </h2>
                <p className="text-xs text-slate-450 font-semibold">Equivalent to **{Math.round(proteinTarget / 22)} salmon fillets** or **{Math.round(proteinTarget / 6)} eggs**</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-xs leading-relaxed text-slate-650 dark:text-slate-350">
                Protein intake should scale with muscular strain. Athletes or highly active adults require closer to **1.6 - 2.0g per kg of bodyweight** to support muscular repair.
              </div>
            </div>
          )}

          {/* TAB 5: BODY FAT */}
          {activeTab === 'fat' && (
            <div className="glass-card p-6 border border-slate-200/5 shadow-md space-y-6 fade-in">
              <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Estimated Body Fat %</p>
                <h2 className="text-5xl font-black text-slate-800 dark:text-white font-sans tracking-tight">
                  {bodyFat}%
                </h2>
                <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-500 text-[10px] font-extrabold uppercase tracking-wider">
                  US Navy Estimator
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border">
                  <p className="font-bold text-slate-400">Lean Body Mass</p>
                  <p className="text-base font-black text-slate-700 dark:text-slate-100">{((1 - (bodyFat / 100)) * inputs.weight).toFixed(1)} kg</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border">
                  <p className="font-bold text-slate-400">Fat Body Mass</p>
                  <p className="text-base font-black text-red-500">{((bodyFat / 100) * inputs.weight).toFixed(1)} kg</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
