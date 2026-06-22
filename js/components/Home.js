// NutriLife Home Screen View Component (ES MODULE VIA BABEL)

 function Home({ setActiveRoute }) {
  const [tipIndex, setTipIndex] = React.useState(0);

  // Structural default data fallbacks to guarantee uptime on slow async mounts
  const dailyTips = window.NutritionData?.dailyTips || [
    {
      title: "Optimized Hydration Habits",
      text: "Consuming 500ml of clean water immediately upon waking helps fire up metabolic metabolic pathways."
    },
    {
      title: "The Balanced Plate Blueprint",
      text: "Aim to fulfill 50% of your meal plates with micronutrient-dense leafy greens and cruciferous vegetables."
    },
    {
      title: "Sustained Energy Synthesis",
      text: "Swapping out refined grains for fiber-dense complex carbohydrates provides sustained glycogen release without insulin spikes."
    }
  ];

  React.useEffect(() => {
    if (dailyTips.length === 0) return;

    const timer = setInterval(() => {
      setTipIndex(prev => (prev + 1) % dailyTips.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [dailyTips.length]);

  return (
    <div className="space-y-16 page-transition">
      {/* HERO CALLOUT CONTEXT PANEL */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 md:p-12 overflow-hidden shadow-lg shadow-emerald-500/10">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 pointer-events-none">
          <i className="fa-solid fa-leaf text-[300px]"></i>
        </div>

        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
            Welcome to NutriLife Ecosystem
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Optimize Your Vitality Through Precision Nutrition.
          </h1>
          <p className="text-emerald-500/10 text-sm md:text-base text-emerald-50/90 max-w-lg leading-relaxed">
            Harness evidence-based metric calculators, customized dietary planners, and metabolic tracking engines to reach your ultimate health baseline.
          </p>
          <div className="pt-4 flex flex-wrap gap-3">
            <button 
              onClick={() => setActiveRoute("planner")}
              className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
            >
              Initialize AI Diet Plan
            </button>
            <button 
              onClick={() => setActiveRoute("encyclopedia")}
              className="bg-emerald-600/30 text-white border border-white/20 hover:bg-emerald-600/40 font-semibold text-sm px-5 py-3 rounded-xl transition"
            >
              Browse Food Profiles
            </button>
          </div>
        </div>
      </div>

      {/* DYNAMIC METABOLIC DAILY CAROUSEL TIP */}
      {dailyTips.length > 0 && (
        <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <i className="fa-solid fa-lightbulb text-lg"></i>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 uppercase tracking-widest font-black">Daily Physiological Insight</span>
              <h3 className="font-bold text-slate-800 dark:text-white text-base">
                {dailyTips[tipIndex]?.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                {dailyTips[tipIndex]?.text}
              </p>
            </div>
          </div>
          <div className="flex gap-1.5 shrink-0 self-end md:self-auto">
            {dailyTips.map((_, i) => (
              <button
                key={i}
                onClick={() => setTipIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === tipIndex ? "w-6 bg-amber-500" : "w-2 bg-slate-200 dark:bg-slate-800"}`}
                aria-label={`Go to metric slice ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ECOSYSTEM FUNCTIONAL MATRIX SUITE */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Integrated Wellness Ecosystem
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access your cross-functional biological tools engineered to scale your health framework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CARD ITEM 1: DIET PLANNER */}
          <div 
            onClick={() => setActiveRoute("planner")}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500/20 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center transition group-hover:bg-emerald-500 group-hover:text-white">
                <i className="fa-solid fa-wand-magic-sparkles text-base"></i>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-emerald-500 transition-colors">AI Diet Planner</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Generate macro-adjusted, fully customized dietary routines built to match your physiological variables.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-500 group-hover:underline flex items-center gap-1">
              Configure Routine <i className="fa-solid fa-arrow-right text-[9px]"></i>
            </span>
          </div>

          {/* CARD ITEM 2: HABIT TRACKER */}
          <div 
            onClick={() => setActiveRoute("tracker")}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500/20 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center transition group-hover:bg-blue-50 group-hover:text-white">
                <i className="fa-solid fa-calendar-check text-base"></i>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-blue-500 transition-colors">Habit Tracker</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Log target water metrics, workout tracking periods, and consistent micro-habits over extended cycles.
              </p>
            </div>
            <span className="text-[11px] font-bold text-blue-500 group-hover:underline flex items-center gap-1">
              Launch Tracking Monitor <i className="fa-solid fa-arrow-right text-[9px]"></i>
            </span>
          </div>

          {/* CARD ITEM 3: ENCYCLOPEDIA */}
          <div 
            onClick={() => setActiveRoute("encyclopedia")}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500/20 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center transition group-hover:bg-indigo-50 group-hover:text-white">
                <i className="fa-solid fa-seedling text-base"></i>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-indigo-500 transition-colors">Food Encyclopedia</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Deconstruct localized profiles, specific isolated micronutrients, caloric limits, and biological benefits.
              </p>
            </div>
            <span className="text-[11px] font-bold text-indigo-500 group-hover:underline flex items-center gap-1">
              Explore Nutrient Vault <i className="fa-solid fa-arrow-right text-[9px]"></i>
            </span>
          </div>

          {/* CARD ITEM 4: HEALTH ALERTS */}
          <div 
            onClick={() => setActiveRoute("alerts")}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500/20 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center transition group-hover:bg-red-50 group-hover:text-white">
                <i className="fa-solid fa-triangle-exclamation text-base"></i>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-red-500 transition-colors">Prevention Alerts</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Study evidence-based root markers, chronic symptoms maps, food avoidance triggers, and therapeutic guidelines.
              </p>
            </div>
            <span className="text-[11px] font-bold text-red-500 group-hover:underline flex items-center gap-1">
              Read Risk Profiles <i className="fa-solid fa-arrow-right text-[9px]"></i>
            </span>
          </div>

          {/* CARD ITEM 5: METABOLIC CALCULATORS */}
          <div 
            onClick={() => setActiveRoute("calculators")}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500/20 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center transition group-hover:bg-amber-500 group-hover:text-white">
                <i className="fa-solid fa-calculator text-base"></i>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-amber-500 transition-colors">Biometric Engines</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Audit precise body mass values, baseline total daily energy expenditure parameters, and protein thresholds.
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-500 group-hover:underline flex items-center gap-1">
              Compute Active Ratios <i className="fa-solid fa-arrow-right text-[9px]"></i>
            </span>
          </div>

          {/* CARD ITEM 6: SCIENCE ARTICLES */}
          <div 
            onClick={() => setActiveRoute("blog")}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500/20 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center transition group-hover:bg-purple-50 group-hover:text-white">
                <i className="fa-solid fa-newspaper text-base"></i>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-purple-500 transition-colors">Science Hub & Myths</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Debunk common physiological myths through targeted scientific reviews and macro-balanced cooking recipes.
              </p>
            </div>
            <span className="text-[11px] font-bold text-purple-500 group-hover:underline flex items-center gap-1">
              Read Medical Logs <i className="fa-solid fa-arrow-right text-[9px]"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}