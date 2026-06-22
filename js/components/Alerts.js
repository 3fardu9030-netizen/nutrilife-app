// NutriLife Health Alerts Component (ES MODULE VIA BABEL)

 function Alerts() {
  // Use global data if available, or fall back to an empty array to prevent crash
  const alertsData = window.NutritionData?.healthAlerts || [
    {
      id: "obesity",
      name: "Obesity Management",
      color: "from-amber-500 to-orange-600",
      icon: "fa-weight-scale",
      description: "Chronic condition characterized by excess body fat build-up affecting overall metabolic health.",
      symptoms: ["High BMI indicator", "Fatigue during minimal activity", "Joint discomfort"],
      causes: ["Sedentary lifestyle", "Caloric surplus", "High processed sugar intake"],
      recommendedFoods: ["Leafy greens", "Lean poultry", "Oats", "Berries"],
      avoidFoods: ["Carbonated sodas", "Deep fried items", "Refined flour white bread"],
      warnings: ["Increases long-term cardiovascular risks.", "Monitor visceral body fat ratios."],
      tips: ["Engage in 30 minutes of aerobic exercise daily.", "Prioritize low-glycemic index whole foods."]
    }
  ];

  const [activeAlertId, setActiveAlertId] = React.useState(
    alertsData[0] ? alertsData[0].id : "obesity"
  );

  const selectedAlert = alertsData.find(a => a.id === activeAlertId) || alertsData[0];

  return (
    <div className="space-y-8 page-transition">
      {/* HEADER SECTION */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation text-amber-500"></i> Nutrition & Disease Prevention Alerts
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Explore wellness alerts, structural roots, symptoms, targeted preventions, and therapeutic dietary guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDE BAR ALERTS ITERATION */}
        <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 border-b lg:border-b-0 pb-3 lg:pb-0">
          {alertsData.map((alert) => {
            const active = activeAlertId === alert.id;

            return (
              <button
                key={alert.id}
                onClick={() => setActiveAlertId(alert.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all min-w-[180px] lg:min-w-0 ${
                  active
                    ? "border-emerald-500 bg-emerald-500/10 shadow-sm shadow-emerald-500/5"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${alert.color} shadow-sm`}>
                    <i className={`fa-solid ${alert.icon}`}></i>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[110px] lg:max-w-none">
                      {alert.name}
                    </p>
                    <p className="text-[10px] text-slate-400">Prevention Guide</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* DETAILS DYNAMIC PANEL VIEW */}
        {selectedAlert && (
          <div className="lg:col-span-3 space-y-6">
            {/* HERO OVERVIEW */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex gap-3 items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${selectedAlert.color}`}>
                  <i className={`fa-solid ${selectedAlert.icon} text-lg`}></i>
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">{selectedAlert.name}</h2>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedAlert.description}
              </p>
            </div>

            {/* SYMPTOMS & CAUSES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-xl shadow-sm">
                <h3 className="font-bold text-sm text-red-500 mb-3 flex items-center gap-1">
                  <i className="fa-solid fa-circle-exclamation"></i> Common Symptoms
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  {selectedAlert.symptoms?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-xl shadow-sm">
                <h3 className="font-bold text-sm text-amber-500 mb-3 flex items-center gap-1">
                  <i className="fa-solid fa-bolt"></i> Chronic Causes
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  {selectedAlert.causes?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FOOD MAP GUIDES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <h3 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1">
                  <i className="fa-solid fa-circle-check"></i> Recommended Foods
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.recommendedFoods?.map((food, index) => (
                    <span key={index} className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                      🍏 {food}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10">
                <h3 className="font-bold text-sm text-red-500 mb-3 flex items-center gap-1">
                  <i className="fa-solid fa-circle-xmark"></i> Foods To Avoid
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.avoidFoods?.map((food, index) => (
                    <span key={index} className="px-3 py-1.5 rounded-xl bg-red-500/10 text-red-700 dark:text-red-300 text-xs font-medium">
                      🚫 {food}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CRITICAL ACTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/10 text-slate-700 dark:text-slate-300 space-y-2">
                <h3 className="font-bold text-sm text-red-500 flex items-center gap-1 mb-1">
                  <i className="fa-solid fa-triangle-exclamation"></i> Warning Signs
                </h3>
                {selectedAlert.warnings?.map((w, index) => (
                  <p key={index} className="text-xs leading-relaxed flex items-start gap-1.5">
                    <span>⚠️</span> {w}
                  </p>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/10 text-slate-700 dark:text-slate-300 space-y-2">
                <h3 className="font-bold text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1 mb-1">
                  <i className="fa-solid fa-lightbulb"></i> Prevention Tips
                </h3>
                {selectedAlert.tips?.map((t, index) => (
                  <p key={index} className="text-xs leading-relaxed flex items-start gap-1.5">
                    <span>✦</span> {t}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}