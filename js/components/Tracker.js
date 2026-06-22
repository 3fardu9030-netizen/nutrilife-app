// NutriLife Habit Tracker Dashboard Component (ES MODULE VIA BABEL)

// Static utility dictionary maps to bypass Tailwind's dynamic compilation limits
const COLOR_THEME_MAP = {
  blue: { bg: "bg-blue-500", text: "text-blue-500", lightBg: "bg-blue-500/10" },
  emerald: { bg: "bg-emerald-500", text: "text-emerald-500", lightBg: "bg-emerald-500/10" },
  orange: { bg: "bg-orange-500", text: "text-orange-500", lightBg: "bg-orange-500/10" },
  indigo: { bg: "bg-indigo-500", text: "text-indigo-500", lightBg: "bg-indigo-500/10" }
};

 function Tracker({ user, habitLogs = [], dbSync }) {
  const [todayLog, setTodayLog] = React.useState({
    water: 5,
    calories: 1600,
    sleep: 6.8,
    exercise: 20
  });

  const challenges = window.NutritionData?.challenges || [
    { id: "ch_1", title: "Optimal Cell Osmosis", description: "Log 8 or more units of hydration fluids before dusk." },
    { id: "ch_2", title: "Cardio Threshold Activation", description: "Accumulate a continuous 30-minute metabolic output trace." }
  ];

  // Synchronize component state with persistent incoming server array records
  React.useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const existingLog = habitLogs.find(log => log.date === today);

    if (existingLog) {
      setTodayLog({
        water: existingLog.water ?? 0,
        calories: existingLog.calories ?? 1600,
        sleep: existingLog.sleep ?? 7.0,
        exercise: existingLog.exercise ?? 0
      });
    }
  }, [habitLogs]);

  // Integrated Multi-Series Trend Line Optimization Hook
  React.useEffect(() => {
    if (!window.ApexCharts) return;
    const chartElement = document.querySelector("#weekly-trends-chart");
    if (!chartElement) return;

    chartElement.innerHTML = "";

    const sortedLogs = [...habitLogs]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-7);

    // Fallback stub generation if system historical array is empty
    const baselineLogs = sortedLogs.length ? sortedLogs : Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return { date: d.toISOString().split("T")[0], water: 4 + i % 2, calories: 1500 + (i * 50), exercise: 15 + (i * 5) };
    });

    const dates = baselineLogs.map(log =>
      new Date(log.date).toLocaleDateString("en-US", { weekday: "short" })
    );

    const isDark = document.documentElement.classList.contains("dark");

    const chart = new window.ApexCharts(chartElement, {
      series: [
        { name: "Water (Cups)", type: "column", data: baselineLogs.map(l => l.water || 0) },
        { name: "Exercise (Min)", type: "area", data: baselineLogs.map(l => l.exercise || 0) },
        { name: "Calories (kcal)", type: "line", data: baselineLogs.map(l => l.calories || 0) }
      ],
      chart: {
        height: 280,
        type: "line",
        stacked: false,
        background: "transparent",
        toolbar: { show: false }
      },
      stroke: { curve: "smooth", width: [0, 2, 3] },
      colors: ["#3b82f6", "#f97316", "#10b981"],
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: { inverseColors: false, shade: "light", type: "vertical", opacityFrom: 0.5, opacityTo: 0.1 }
      },
      xaxis: {
        categories: dates,
        labels: { style: { colors: isDark ? "#94a3b8" : "#64748b", fontSize: "11px" } }
      },
      yaxis: [
        { title: { text: "Hydration & Movement" }, labels: { style: { colors: isDark ? "#94a3b8" : "#64748b" } } },
        { opposite: true, title: { text: "Energy Intake (kcal)" }, labels: { style: { colors: isDark ? "#94a3b8" : "#64748b" } } }
      ],
      theme: { mode: isDark ? "dark" : "light" },
      tooltip: { shared: true, intersect: false },
      legend: { position: "top", labels: { colors: isDark ? "#f8fafc" : "#334155" } }
    });

    chart.render();
    return () => chart.destroy();
  }, [habitLogs, todayLog]);

  // Unified Habit State Mutation Engine Trigger
  const updateHabit = (key, value) => {
    const sanitizedValue = Math.max(0, parseFloat(value) || 0);
    const today = new Date().toISOString().split("T")[0];

    const updatedLog = {
      ...todayLog,
      [key]: sanitizedValue
    };

    setTodayLog(updatedLog);
    const logs = [...habitLogs];
    const index = logs.findIndex(l => l.date === today);

    if (index >= 0) {
      logs[index] = { ...logs[index], ...updatedLog };
    } else {
      logs.push({ date: today, ...updatedLog });
    }

    let xpBonus = user?.xp || 0;
    if (key === "water" && sanitizedValue >= 8 && todayLog.water < 8) xpBonus += 50;
    if (key === "exercise" && sanitizedValue >= 30 && todayLog.exercise < 30) xpBonus += 60;

    if (typeof dbSync === "function") {
      dbSync({
        habitLogs: logs,
        users: user ? [{ ...user, xp: xpBonus }] : []
      });
    }
  };

  return (
    <div className="space-y-8 page-transition">
      {/* TITLE VIEW SECTION STRIP */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 dark:border-slate-800/60 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Habit Tracker Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Log, visualize, and scale key metabolic biomarkers over active macro recovery schedules.
          </p>
        </div>

        {user && (
          <div className="flex gap-2.5 self-start md:self-auto">
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm">
              <i className="fa-solid fa-fire animate-pulse"></i> {user.streak || 0} Day Streak
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm">
              <i className="fa-solid fa-award"></i> {user.xp || 0} Total XP
            </div>
          </div>
        )}
      </div>

      {/* QUADRANT GRIDS FOR BIOMETRIC HABIT LOGGING */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <TrackerCard
          title="Water Hydration"
          icon="fa-glass-water"
          color="blue"
          value={todayLog.water}
          suffix="/8 cups"
          onIncrement={() => updateHabit("water", todayLog.water + 1)}
          onDecrement={() => updateHabit("water", Math.max(0, todayLog.water - 1))}
        />
        <TrackerCard
          title="Caloric Intake"
          icon="fa-apple-whole"
          color="emerald"
          value={todayLog.calories}
          suffix=" kcal"
          onIncrement={() => updateHabit("calories", todayLog.calories + 100)}
          onDecrement={() => updateHabit("calories", Math.max(0, todayLog.calories - 100))}
        />
        <TrackerCard
          title="Exercise Duration"
          icon="fa-person-running"
          color="orange"
          value={todayLog.exercise}
          suffix=" min"
          onIncrement={() => updateHabit("exercise", todayLog.exercise + 15)}
          onDecrement={() => updateHabit("exercise", Math.max(0, todayLog.exercise - 15))}
        />
        <TrackerCard
          title="Sleep Recovery"
          icon="fa-moon"
          color="indigo"
          value={todayLog.sleep}
          suffix=" hrs"
          onIncrement={() => updateHabit("sleep", Number((todayLog.sleep + 0.5).toFixed(1)))}
          onDecrement={() => updateHabit("sleep", Math.max(0, Number((todayLog.sleep - 0.5).toFixed(1))))}
        />
      </div>

      {/* GRID CONTAINER FOR CHARTS AND ECOSYSTEM ENGAGEMENT CHALLENGES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LINE & AREA CHART MATRIX PANEL */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="mb-4">
            <h3 className="font-bold text-slate-800 dark:text-white text-base">Weekly Dynamic Trends</h3>
            <p className="text-[11px] text-slate-400">Cross-reference active fluid thresholds against caloric load maps.</p>
          </div>
          <div id="weekly-trends-chart" className="w-full"></div>
        </div>

        {/* ECOSYSTEM ADHERENCE MILESTONES TRAY */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-emerald-500 dark:text-emerald-400 text-base flex items-center gap-1.5">
              <i className="fa-solid fa-bullseye text-sm"></i> Daily Active Targets
            </h3>
            <p className="text-[11px] text-slate-400">Unlock XP tokens by checking matching parameters before cutoff.</p>
          </div>

          <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1 invisible-scrollbar">
            {challenges.map(c => (
              <div
                key={c.id}
                className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl transition hover:border-emerald-500/20"
              >
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">{c.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">{c.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Fixed Reusable Metric Tracker Card Sub-Component
function TrackerCard({ title, icon, color, value, suffix, onIncrement, onDecrement }) {
  const theme = COLOR_THEME_MAP[color] || COLOR_THEME_MAP.emerald;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col justify-between transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex gap-3">
          <div className={`w-9 h-9 rounded-xl ${theme.lightBg} ${theme.text} flex items-center justify-center shrink-0`}>
            <i className={`fa-solid ${icon} text-sm`}></i>
          </div>
          <div>
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-xs tracking-tight mt-0.5">{title}</h3>
            <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
              {value}<span className="text-xs font-semibold text-slate-400 ml-0.5">{suffix}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-5 pt-3 border-t border-slate-50 dark:border-slate-800/30">
        <button
          onClick={onDecrement}
          className="flex-1 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg text-xs font-bold transition focus:outline-none"
          title="Decrease Target Log Value"
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <button
          onClick={onIncrement}
          className={`flex-1 py-1.5 ${theme.bg} hover:opacity-90 text-slate-900 rounded-lg text-xs font-black shadow-sm transition focus:outline-none`}
          title="Increase Target Log Value"
        >
          <i className="fa-solid fa-plus text-slate-950"></i>
        </button>
      </div>
    </div>
  );
}