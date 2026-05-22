// NutriLife Home Screen View Component
window.Home = function ({ setActiveRoute }) {
  const [tipIndex, setTipIndex] = React.useState(0);
  const dailyTips = window.NutritionData.dailyTips;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % dailyTips.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [dailyTips.length]);

  return (
    <div className="space-y-16 page-transition">
      {/* 1. HERO SECTION WITH TAGLINE AND ILLUSTRATIONS */}
      <section className="relative overflow-hidden pt-8 md:pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="space-y-6 text-left relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
              <i className="fa-solid fa-sparkles text-xs"></i>
              <span>Next-Gen Health-Tech Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-[1.1] font-sans">
              Eat Smart,<br />
              <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                Live Healthy
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Empower your body with science-backed nutrition awareness. Calculate diagnostics, design smart personalized diets, track daily habits, and get instant guidance from our AI Nutrition Coach.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => setActiveRoute('planner')}
                className="flex items-center justify-center space-x-2 px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/25 transition-all text-sm group"
              >
                <span>Launch AI Diet Planner</span>
                <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"></i>
              </button>
              <button
                onClick={() => setActiveRoute('encyclopedia')}
                className="flex items-center justify-center space-x-2 px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm"
              >
                <span>Explore Food Database</span>
                <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
              </button>
            </div>
            
            {/* Key stats banner */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800/80">
              <div>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">100%</p>
                <p className="text-xs text-slate-400 font-medium">Evidence Based</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">1.2s</p>
                <p className="text-xs text-slate-400 font-medium">AI Diet Generation</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">Free</p>
                <p className="text-xs text-slate-400 font-medium">Unlimited Access</p>
              </div>
            </div>
          </div>

          {/* Interactive Floating Graphic Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Background glowing circle */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-emerald-500/10 blur-[60px] animate-pulse"></div>
            
            {/* Core Card with premium health stats mockup */}
            <div className="relative glass-card border border-emerald-500/10 w-full max-w-[420px] p-6 shadow-2xl animated-float z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-extrabold uppercase tracking-wide text-emerald-500">Live Nutrition Sync</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              
              {/* Macro graph simulation */}
              <div className="space-y-4 font-sans">
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                      <i className="fa-solid fa-apple-whole text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Apple Snacking</p>
                      <p className="text-xs text-slate-400 font-medium">+52 kcal | Healthy Carb</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">Morning</span>
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                      <i className="fa-solid fa-droplet text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Water Logged</p>
                      <p className="text-xs text-slate-400 font-medium">Goal: 8 cups | Logged: 6</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-lg">75% Done</span>
                </div>

                <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                      <i className="fa-solid fa-fire text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Active Streak</p>
                      <p className="text-xs text-slate-400 font-medium">Habits unlocked and consistent</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-lg">🔥 5 Days</span>
                </div>
              </div>

              {/* Float-out tags */}
              <div className="absolute -top-6 -right-6 glass-card px-4 py-2 border border-emerald-200/20 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center shadow-lg">
                🥑 <span className="ml-1.5">Monounsaturated Fats</span>
              </div>
              <div className="absolute -bottom-6 -left-6 glass-card px-4 py-2 border border-blue-200/20 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center shadow-lg">
                💧 <span className="ml-1.5">Hydration Tracked</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. AUTO-SLIDING DAILY NUTRITION TIPS SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-6 border-l-4 border-l-emerald-500 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-lightbulb text-2xl animate-bounce"></i>
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-500 font-sans">Daily Nutrition Tip</h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium mt-0.5 fade-in">
                "{dailyTips[tipIndex]}"
              </p>
            </div>
          </div>
          <div className="flex space-x-1 shrink-0">
            {dailyTips.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTipIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === tipIndex ? 'bg-emerald-500 w-6' : 'bg-slate-300 dark:bg-slate-700 hover:bg-emerald-400'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITION: WHY NUTRITION MATTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-emerald-500 font-sans">The Core Science</h2>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white leading-tight font-sans">Why Balanced Nutrition Matters</p>
          <p className="text-sm text-slate-500 leading-relaxed">
            Consuming balanced nutrients acts as a biological shield against chronic illnesses, improves longevity, regulates circadian cycles, and boosts cellular performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass-card p-6 border border-emerald-500/5 hover:border-emerald-500/20 hover:scale-[1.02] transition-all duration-300 flex flex-col space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner">
              <i className="fa-solid fa-shield-halved text-xl"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Chronic Illness Prevention</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Consuming complex, high-fiber, and low-glycemic foods significantly lowers risk rates for Obesity, Type-2 Diabetes, and Hypertension.
            </p>
          </div>

          <div className="glass-card p-6 border border-emerald-500/5 hover:border-emerald-500/20 hover:scale-[1.02] transition-all duration-300 flex flex-col space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-inner">
              <i className="fa-solid fa-brain text-xl"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Mental Clarity & Focus</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Healthy monounsaturated fats (like omega-3s in avocados and salmon) build strong brain cell walls, boosting concentration and memory.
            </p>
          </div>

          <div className="glass-card p-6 border border-emerald-500/5 hover:border-emerald-500/20 hover:scale-[1.02] transition-all duration-300 flex flex-col space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shadow-inner">
              <i className="fa-solid fa-bolt text-xl"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Sustained Daily Energy</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Swapping processed junk sugars for whole grains provides consistent slow-release fuel, eliminating energy spikes and afternoon crashes.
            </p>
          </div>

          <div className="glass-card p-6 border border-emerald-500/5 hover:border-emerald-500/20 hover:scale-[1.02] transition-all duration-300 flex flex-col space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shadow-inner">
              <i className="fa-solid fa-heart-pulse text-xl"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Cardiovascular Longevity</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Reducing dietary sodium and saturated fats protects blood vessel dilation, drastically lowering cardiac pressure and stroke risks.
            </p>
          </div>
        </div>
      </section>

      {/* 4. PREMIUM TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-emerald-500 font-sans">Community Stories</h2>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white leading-tight font-sans">Success Stories From NutriLife Users</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card p-6 border border-emerald-100/5 flex flex-col justify-between space-y-6 shadow-md relative">
            <div className="text-emerald-400 text-3xl absolute top-4 right-6 opacity-25">“</div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic z-10">
              "Using the AI Diet Planner, I customized my morning meal habits to control my pre-diabetic sugar levels. The 7-day schedule is incredibly simple to cook and print!"
            </p>
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 dark:border-slate-850">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center">JD</div>
              <div>
                <p className="text-xs font-extrabold text-slate-700 dark:text-slate-200">John Davis</p>
                <p className="text-[10px] text-emerald-500 font-bold">Managed Pre-Diabetes</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border border-emerald-100/5 flex flex-col justify-between space-y-6 shadow-md relative">
            <div className="text-emerald-400 text-3xl absolute top-4 right-6 opacity-25">“</div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic z-10">
              "The habit tracker completely gamified my hydration routine. Seeing my daily water streaks climb unlocked badges that made drinking 3L of water actually fun!"
            </p>
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 dark:border-slate-850">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center">MS</div>
              <div>
                <p className="text-xs font-extrabold text-slate-700 dark:text-slate-200">Melanie Smith</p>
                <p className="text-[10px] text-blue-500 font-bold">Hydration Advocate</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border border-emerald-100/5 flex flex-col justify-between space-y-6 shadow-md relative">
            <div className="text-emerald-400 text-3xl absolute top-4 right-6 opacity-25">“</div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic z-10">
              "I check the food encyclopedia before every grocery trip now. The interactive macro charts make comparing complex carbohydrates like oats vs quinoa completely intuitive."
            </p>
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 dark:border-slate-850">
              <div className="w-10 h-10 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center">RK</div>
              <div>
                <p className="text-xs font-extrabold text-slate-700 dark:text-slate-200">Ryan Kincaid</p>
                <p className="text-[10px] text-purple-500 font-bold">Fitness Athlete</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CALL TO ACTION BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-500 dark:from-emerald-950/80 dark:to-teal-900/50 p-8 sm:p-12 text-center text-white shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]"></div>
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans">Ready to Optimize Your Lifestyle?</h2>
            <p className="text-sm sm:text-base text-emerald-50 leading-relaxed">
              Join thousands of individuals using NutriLife daily to log hydration, balance macronutrients, track sleep routines, and plan delicious, energy-sustaining wellness schedules.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveRoute('planner')}
                className="px-8 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-600 font-extrabold transition-all text-sm shadow-md"
              >
                Generate Free Meal Plan
              </button>
              <button
                onClick={() => setActiveRoute('calculators')}
                className="px-8 py-3.5 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-white border border-white/20 font-bold transition-all text-sm"
              >
                Calculate My BMI & Calories
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
