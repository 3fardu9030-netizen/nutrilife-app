// NutriLife Habit Tracker Dashboard Component
window.Tracker = function ({ user, habitLogs, dbSync }) {
  const [todayLog, setTodayLog] = React.useState({
    water: 5,
    calories: 1600,
    sleep: 6.8,
    exercise: 20
  });

  const challenges = window.NutritionData.challenges;
  const badges = window.NutritionData.badges;

  // Sync today's log from props on load
  React.useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const log = habitLogs.find(l => l.date === todayStr);
    if (log) {
      setTodayLog(log);
    }
  }, [habitLogs]);

  // Render analytics charts using ApexCharts
  React.useEffect(() => {
    // Collect last 7 logs or pad with dummy values for the chart
    const dates = habitLogs.map(l => {
      const d = new Date(l.date);
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
    });
    const waterData = habitLogs.map(l => l.water);
    const caloriesData = habitLogs.map(l => l.calories);
    const exerciseData = habitLogs.map(l => l.exercise);

    const chartDom = document.querySelector("#weekly-trends-chart");
    if (chartDom) {
      chartDom.innerHTML = ""; // Clear existing
      const options = {
        series: [
          { name: 'Water (cups)', type: 'column', data: waterData },
          { name: 'Calories (kcal)', type: 'line', data: caloriesData },
          { name: 'Exercise (mins)', type: 'area', data: exerciseData }
        ],
        chart: {
          height: 300,
          type: 'line',
          stacked: false,
          fontFamily: 'Outfit, sans-serif',
          toolbar: { show: false }
        },
        stroke: {
          width: [0, 3, 2],
          curve: 'smooth'
        },
        colors: ['#3b82f6', '#10b981', '#f59e0b'],
        fill: {
          opacity: [0.85, 1, 0.15],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55
          }
        },
        labels: dates,
        markers: { size: 4 },
        xaxis: {
          type: 'category',
          labels: {
            style: { colors: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#475569' }
          }
        },
        yaxis: [
          {
            title: { text: "Water (cups) / Workout (mins)", style: { color: '#3b82f6' } },
            labels: { style: { colors: '#3b82f6' } }
          },
          {
            opposite: true,
            title: { text: "Energy (Calories)", style: { color: '#10b981' } },
            labels: { style: { colors: '#10b981' } }
          }
        ],
        tooltip: {
          shared: true,
          intersect: false,
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        },
        legend: {
          position: 'top',
          labels: { colors: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#475569' }
        }
      };

      const chart = new ApexCharts(chartDom, options);
      chart.render();
    }
  }, [habitLogs]);

  // Mutator helpers
  const updateHabit = (habitKey, value) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newLog = { ...todayLog, [habitKey]: value };
    setTodayLog(newLog);

    // Sync state back to parent container
    const logsCopy = [...habitLogs];
    const logIndex = logsCopy.findIndex(l => l.date === todayStr);
    
    if (logIndex > -1) {
      logsCopy[logIndex] = { ...logsCopy[logIndex], ...newLog };
    } else {
      logsCopy.push({ date: todayStr, ...newLog });
    }

    // Proactively check streak logic triggers
    let updatedStreak = user ? user.streak : 0;
    let updatedXp = user ? user.xp : 0;

    // Award XP for logging accomplishments
    if (habitKey === 'water' && value >= 8 && todayLog.water < 8) {
      updatedXp += 50;
    }
    if (habitKey === 'exercise' && value >= 30 && todayLog.exercise < 30) {
      updatedXp += 60;
    }

    dbSync({
      habitLogs: logsCopy,
      users: user ? [{ ...user, streak: updatedStreak, xp: updatedXp }] : []
    });
  };

  return (
    <div className="space-y-8 page-transition">
      
      {/* Tracker Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white font-sans">
            Habit Tracker Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Log your daily metabolic inputs. Fuel your streaks, unlock premium badges, and review weekly graphic analytics.
          </p>
        </div>
        
        {/* Streak Metrics Banner */}
        {user && (
          <div className="flex space-x-3">
            <div className="glass-card px-4 py-2 border border-orange-500/10 flex items-center space-x-2.5 shadow-sm">
              <i className="fa-solid fa-fire text-orange-500 text-lg animate-pulse"></i>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Track Streak</p>
                <p className="text-sm font-bold text-slate-850 dark:text-slate-100">{user.streak} Days</p>
              </div>
            </div>
            <div className="glass-card px-4 py-2 border border-emerald-500/10 flex items-center space-x-2.5 shadow-sm">
              <i className="fa-solid fa-medal text-emerald-500 text-lg"></i>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Experience</p>
                <p className="text-sm font-bold text-slate-850 dark:text-slate-100">{user.xp} XP</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tracker Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Tracker Input Widgets & Weekly Graph */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Logs Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Water Tracker Card */}
            <div className="glass-card p-5 border border-blue-500/5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                    <i className="fa-solid fa-droplet text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Water Hydration</h3>
                    <p className="text-xs text-slate-400">Target: 8 Cups daily</p>
                  </div>
                </div>
                <span className="text-lg font-black text-blue-500">{todayLog.water} / 8</span>
              </div>
              
              {/* Progress Slider Bar */}
              <div className="space-y-3.5">
                <div className="w-full bg-slate-100 dark:bg-slate-850 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (todayLog.water / 8) * 100)}%` }}></div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => updateHabit('water', Math.max(0, todayLog.water - 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-850"
                  >
                    - 1 Cup
                  </button>
                  <button
                    onClick={() => updateHabit('water', todayLog.water + 1)}
                    className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                  >
                    + 1 Cup
                  </button>
                </div>
              </div>
            </div>

            {/* Calorie Tracker Card */}
            <div className="glass-card p-5 border border-emerald-500/5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                    <i className="fa-solid fa-apple-whole text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Calorie Intake</h3>
                    <p className="text-xs text-slate-400">Target: 2000 kcal</p>
                  </div>
                </div>
                <span className="text-lg font-black text-emerald-500">{todayLog.calories} kcal</span>
              </div>
              
              <div className="space-y-3.5">
                <input
                  type="range"
                  min="500"
                  max="4000"
                  step="50"
                  value={todayLog.calories}
                  onChange={(e) => updateHabit('calories', parseInt(e.target.value))}
                  className="custom-slider"
                />
                
                <div className="flex justify-between text-xs text-slate-400 font-semibold">
                  <span>500 kcal</span>
                  <span>4000 kcal</span>
                </div>
              </div>
            </div>

            {/* Workout Tracker Card */}
            <div className="glass-card p-5 border border-orange-500/5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                    <i className="fa-solid fa-person-running text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Exercise Volume</h3>
                    <p className="text-xs text-slate-400">Target: 30 mins</p>
                  </div>
                </div>
                <span className="text-lg font-black text-orange-500">{todayLog.exercise} mins</span>
              </div>
              
              <div className="space-y-3.5">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="180"
                    value={todayLog.exercise}
                    onChange={(e) => updateHabit('exercise', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 glass-input text-xs border border-slate-200 dark:border-slate-800"
                  />
                  <button
                    onClick={() => updateHabit('exercise', todayLog.exercise + 15)}
                    className="px-3 py-2 rounded-lg bg-orange-500 text-white text-xs font-bold shrink-0 shadow-md shadow-orange-500/20"
                  >
                    +15 Min
                  </button>
                </div>
              </div>
            </div>

            {/* Sleep Tracker Card */}
            <div className="glass-card p-5 border border-indigo-500/5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
                    <i className="fa-solid fa-moon text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Rest & Sleep</h3>
                    <p className="text-xs text-slate-400">Target: 7.5 hrs</p>
                  </div>
                </div>
                <span className="text-lg font-black text-indigo-500">{todayLog.sleep} hrs</span>
              </div>
              
              <div className="space-y-3.5">
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="0.5"
                  value={todayLog.sleep}
                  onChange={(e) => updateHabit('sleep', parseFloat(e.target.value))}
                  className="custom-slider"
                />
                
                <div className="flex justify-between text-xs text-slate-400 font-semibold">
                  <span>4.0 hrs</span>
                  <span>12.0 hrs</span>
                </div>
              </div>
            </div>

          </div>

          {/* Weekly Trends Dashboard Graph Container */}
          <div className="glass-card p-6 border border-emerald-500/5 shadow-md space-y-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center">
              <i className="fa-solid fa-chart-simple text-emerald-500 mr-2.5"></i>
              Weekly Comprehensive Trends
            </h3>
            <div id="weekly-trends-chart" className="w-full"></div>
          </div>

        </div>

        {/* Right 1 Col: Challenges & Streak Badges */}
        <div className="space-y-6">
          
          {/* Daily Challenges List */}
          <div className="glass-card p-5 border border-emerald-500/5 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-emerald-500">Daily Health Challenges</h3>
            
            <div className="space-y-3">
              {challenges.map((challenge) => {
                let currentVal = 0;
                if (challenge.id === 'hydrate-8') currentVal = todayLog.water;
                else if (challenge.id === 'active-30') currentVal = todayLog.exercise;
                else if (challenge.id === 'sleep-7') currentVal = todayLog.sleep;

                const isDone = challenge.target === 0 ? todayLog.calories < 2200 : currentVal >= challenge.target;

                return (
                  <div key={challenge.id} className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
                    isDone ? 'bg-emerald-500/5 border-emerald-500/25' : 'bg-transparent border-slate-200 dark:border-slate-805'
                  }`}>
                    <div className="space-y-1">
                      <p className={`text-xs font-bold ${isDone ? 'text-emerald-600 dark:text-emerald-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
                        {challenge.title}
                      </p>
                      <p className="text-[10px] text-slate-400 leading-normal">{challenge.description}</p>
                    </div>
                    {isDone ? (
                      <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg shrink-0">+{challenge.xp} XP</span>
                    ) : (
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg shrink-0">Active</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements / Streaks Badges Panel */}
          <div className="glass-card p-5 border border-emerald-500/5 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-emerald-500">Achievements & Badges</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => {
                // Mock unlocking: first 3 badges unlocked if user streak exists
                const isUnlocked = badge.id === 'streak-3' || badge.id === 'water-hero';
                
                return (
                  <div
                    key={badge.id}
                    title={badge.description}
                    className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center space-y-2 transition-all ${
                      isUnlocked
                        ? 'border-emerald-500/20 bg-emerald-500/[0.02] scale-[1.01]'
                        : 'border-slate-200 dark:border-slate-805 opacity-40'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base shadow-sm ${badge.color}`}>
                      <i className={`fa-solid ${badge.icon}`}></i>
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-750 dark:text-slate-200 leading-tight">{badge.name}</p>
                      <p className="text-[9px] text-slate-400 font-medium leading-normal mt-0.5">{isUnlocked ? 'Unlocked' : 'Locked'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
