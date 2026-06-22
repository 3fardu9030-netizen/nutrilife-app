// NutriLife Smart Daily Nutrition Schedule Component (ES MODULE VIA BABEL)

 function Schedule() {
  const [activeSegment, setActiveSegment] = React.useState("All");

  const scheduleEvents = [
    {
      time: "07:30 AM",
      title: "Wake-up Hydration Boost",
      category: "Hydration",
      icon: "fa-glass-water",
      color: "border-blue-500 text-blue-500 bg-blue-500/10 dark:bg-blue-500/20",
      desc: "Drink 1-2 glasses of warm water. Restores body fluids lost overnight and supports fluid balance equilibrium."
    },
    {
      time: "08:15 AM",
      title: "Premium Balanced Breakfast",
      category: "Meals",
      icon: "fa-mug-saucer",
      color: "border-emerald-500 text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20",
      desc: "Start your day with complex carbohydrates and clean proteins like steel-cut oats, fresh fruits, organic seeds, and pastured eggs."
    },
    {
      time: "11:00 AM",
      title: "Mid-Morning Hydration",
      category: "Hydration",
      icon: "fa-droplet",
      color: "border-blue-500 text-blue-500 bg-blue-500/10 dark:bg-blue-500/20",
      desc: "Drink water or antioxidant-rich loose leaf herbal teas to maintain stable osmotic pressure throughout your system cells."
    },
    {
      time: "01:15 PM",
      title: "High Protein Lunch",
      category: "Meals",
      icon: "fa-bowl-food",
      color: "border-emerald-500 text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20",
      desc: "A balanced macro plate featuring high fiber, cruciferous vegetables, complex whole grains, and a clean source of lean muscle-repair proteins."
    },
    {
      time: "03:30 PM",
      title: "Mineral Hydration",
      category: "Hydration",
      icon: "fa-bottle-water",
      color: "border-blue-500 text-blue-500 bg-blue-500/10 dark:bg-blue-500/20",
      desc: "Maintain constant intra-cellular trace mineral levels with pure spring water, electrolyte mixes, or high-water content fruit chunks."
    },
    {
      time: "04:30 PM",
      title: "Healthy Snack",
      category: "Snacks",
      icon: "fa-apple-whole",
      color: "border-amber-500 text-amber-500 bg-amber-500/10 dark:bg-amber-500/20",
      desc: "Opt for whole nutrient sources like apples, raw walnuts, or strained unsweetened plain Greek yogurt to prevent evening glycogen drops."
    },
    {
      time: "05:30 PM",
      title: "Workout Window",
      category: "Exercise",
      icon: "fa-person-running",
      color: "border-orange-500 text-orange-500 bg-orange-500/10 dark:bg-orange-500/20",
      desc: "Physical activity optimizes cardiovascular pathway sensitivity, sparks transient glucose clearance, and anchors structural density."
    },
    {
      time: "07:30 PM",
      title: "Light Dinner",
      category: "Meals",
      icon: "fa-utensils",
      color: "border-emerald-500 text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20",
      desc: "Consume an easily digestible, low-insulinogenic meal focusing on steamed greens and digestible structural amino acids."
    },
    {
      time: "09:30 PM",
      title: "Sleep Preparation",
      category: "Sleep",
      icon: "fa-moon",
      color: "border-indigo-500 text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20",
      desc: "Eliminate short-wavelength artificial blue light exposure. Trigger natural melatonin signaling path mechanics."
    },
    {
      time: "10:30 PM",
      title: "Deep Sleep Recovery",
      category: "Sleep",
      icon: "fa-bed",
      color: "border-indigo-500 text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20",
      desc: "Uninterrupted circadian rest promotes cellular autophagy, balances growth hormone generation cycles, and resets endocrine baselines."
    }
  ];

  const segments = ["All", "Meals", "Hydration", "Snacks", "Exercise", "Sleep"];

  const filteredEvents = scheduleEvents.filter(
    event => activeSegment === "All" || event.category === activeSegment
  );

  return (
    <div className="space-y-8 page-transition">
      {/* HEADER META ROW */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
          <i className="fa-solid fa-calendar-days text-emerald-500"></i> Smart Daily Nutrition Schedule
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Maintain chronological metabolic efficiency by synchronizing nutritional inputs, hydration logs, physical efforts, and restoration gaps.
        </p>
      </div>

      {/* FILTER BUTTON SCROLLER CONTROLLER */}
      <div className="flex space-x-2 overflow-x-auto pb-2 invisible-scrollbar border-b border-slate-50 dark:border-slate-800/40">
        {segments.map(segment => {
          const active = activeSegment === segment;
          return (
            <button
              key={segment}
              onClick={() => setActiveSegment(segment)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                active
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/10"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {segment}
            </button>
          );
        })}
      </div>

      {/* TIMELINE DISPLAY TRACK ENGINE */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center text-slate-400 border border-dashed rounded-2xl max-w-3xl mx-auto">
          No schedule logs grouped inside this vector block.
        </div>
      ) : (
        <div className="relative max-w-3xl mx-auto space-y-8 pl-14 pr-2 pt-4">
          
          {/* TRACK LINE SHAFT BACKGROUND */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

          {filteredEvents.map((event, index) => (
            <div key={index} className="relative flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 animate-fade-in">
              
              {/* FIXED ABSOLUTE FLOATING BULLET TIMELINE ICON CARD */}
              <div className={`absolute -left-14 w-10 h-10 rounded-xl border-2 flex items-center justify-center text-sm shadow-sm transition-transform hover:scale-105 bg-white dark:bg-slate-950 ${event.color}`}>
                <i className={`fa-solid ${event.icon}`}></i>
              </div>

              {/* CHRONO LABEL STAMP COLUMN */}
              <div className="w-32 shrink-0 sm:pt-1">
                <p className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
                  {event.time}
                </p>
                <span className="text-[9px] tracking-wider font-black text-emerald-500 uppercase block mt-0.5">
                  {event.category}
                </span>
              </div>

              {/* CARD BLOCK DESCRIPTION LAYOUT CONTENT */}
              <div className="flex-1">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
                  <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}