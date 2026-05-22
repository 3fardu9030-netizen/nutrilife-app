// NutriLife Health Alerts Component
window.Alerts = function () {
  const alertsData = window.NutritionData.healthAlerts;
  const [activeAlertId, setActiveAlertId] = React.useState(alertsData[0] ? alertsData[0].id : 'obesity');

  const selectedAlert = alertsData.find(a => a.id === activeAlertId) || alertsData[0];

  return (
    <div className="space-y-8 page-transition">
      {/* Title Header */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white font-sans">
          Nutrition & Disease Prevention Alerts
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore comprehensive clinical-grade wellness alerts. Understand causes, warning triggers, recommended ingredients, and avoidance strategies for metabolic conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Column: Vertical tabs selector */}
        <div className="lg:col-span-1 space-y-2">
          {alertsData.map((alert) => {
            const isActive = activeAlertId === alert.id;
            return (
              <button
                key={alert.id}
                onClick={() => setActiveAlertId(alert.id)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center space-x-3.5 transition-all ${
                  isActive
                    ? 'border-emerald-500 bg-gradient-to-r from-emerald-500/10 to-transparent shadow-sm'
                    : 'border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900 hover:border-emerald-500/30'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white bg-gradient-to-br ${alert.color}`}>
                  <i className={`fa-solid ${alert.icon} text-sm`}></i>
                </div>
                <div className="truncate">
                  <p className={`text-xs font-bold ${isActive ? 'text-emerald-500' : 'text-slate-700 dark:text-slate-200'}`}>{alert.name.split(' & ')[0]}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Prevention Guide</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Columns: Active Alert Data display */}
        {selectedAlert && (
          <div className="lg:col-span-3 space-y-6">
            
            {/* Description Banner */}
            <div className="glass-card p-6 border border-slate-200/5 shadow-sm space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${selectedAlert.color}`}>
                  <i className={`fa-solid ${selectedAlert.icon} text-lg`}></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-850 dark:text-white">{selectedAlert.name} Awareness</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Metabolic Education Series</p>
                </div>
              </div>
              <p className="text-sm text-slate-650 dark:text-slate-305 leading-relaxed">
                {selectedAlert.description}
              </p>
            </div>

            {/* Causes vs Symptoms tabbed breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Symptoms */}
              <div className="glass-card p-5 border border-slate-200/5 shadow-sm space-y-3.5">
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-red-500 flex items-center">
                  <i className="fa-solid fa-triangle-exclamation mr-2 text-xs"></i> Common Symptoms
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-350">
                  {selectedAlert.symptoms.map((s, i) => (
                    <li key={i} className="flex items-start">
                      <i className="fa-solid fa-circle-dot text-red-500 mr-2.5 mt-0.5 shrink-0 text-[10px]"></i>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Causes */}
              <div className="glass-card p-5 border border-slate-200/5 shadow-sm space-y-3.5">
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-amber-500 flex items-center">
                  <i className="fa-solid fa-circle-question mr-2 text-xs"></i> Chronic Causes
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-350">
                  {selectedAlert.causes.map((c, i) => (
                    <li key={i} className="flex items-start">
                      <i className="fa-solid fa-circle-chevron-right text-amber-500 mr-2.5 mt-0.5 shrink-0 text-[10px]"></i>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Recommended Foods vs Foods to Avoid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Foods to eat */}
              <div className="p-5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/10 space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 flex items-center">
                  <i className="fa-solid fa-circle-check mr-2 text-xs"></i> Recommended Whole Foods
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.recommendedFoods.map((f, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                      🍏 {f}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                  These items are dense in critical vitamins, fibers, or trace minerals that clinically strengthen cells against this disease.
                </p>
              </div>

              {/* Foods to avoid */}
              <div className="p-5 rounded-2xl bg-red-500/[0.03] border border-red-500/10 space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-red-500 flex items-center">
                  <i className="fa-solid fa-circle-xmark mr-2 text-xs"></i> Ingredients to Strictly Avoid
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.avoidFoods.map((f, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold">
                      🚫 {f}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                  These foods cause inflammatory spikes, glycemic stress, or cellular dehydration, speeding up condition complications.
                </p>
              </div>

            </div>

            {/* Critical Warning Signs & Prevention Tips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Warning signs */}
              <div className="md:col-span-2 p-5 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-3.5">
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-red-600 dark:text-red-400 flex items-center">
                  <i className="fa-solid fa-circle-exclamation mr-2 text-sm animate-pulse text-red-500"></i> Emergency Warning Signs
                </h3>
                <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-650 dark:text-slate-350">
                  {selectedAlert.warnings.map((w, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-red-500/[0.02] border border-red-500/5 flex items-start space-x-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                      <p className="font-semibold leading-normal">{w}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick tips */}
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-3">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center">
                  <i className="fa-solid fa-lightbulb text-amber-500 mr-2 text-xs animate-bounce"></i> Prevention Tips
                </h3>
                <div className="space-y-3.5 text-xs text-slate-500 dark:text-slate-400 font-sans">
                  {selectedAlert.tips.map((t, i) => (
                    <div key={i} className="flex items-start">
                      <span className="text-emerald-500 mr-2 font-bold font-sans">✦</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
