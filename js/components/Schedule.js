// NutriLife Smart Daily Nutrition Schedule Component
window.Schedule = function () {
  const [activeSegment, setActiveSegment] = React.useState('All');

  const scheduleEvents = [
    {
      time: "07:30 AM",
      title: "Wake-up Hydration Boost",
      category: "Hydration",
      icon: "fa-glass-water",
      color: "border-blue-500 text-blue-500 bg-blue-500/10",
      desc: "Drink 1-2 glasses of warm water. Restores body fluids lost overnight and naturally wakes up kidney filtration systems."
    },
    {
      time: "08:15 AM",
      title: "Premium Balanced Breakfast",
      category: "Meals",
      icon: "fa-mug-saucer",
      color: "border-emerald-500 text-emerald-500 bg-emerald-500/10",
      desc: "Fuel up with clean complex carbs and proteins (e.g., steel-cut oats with chia seeds and blueberries, plus eggs). Limits subsequent insulin surges."
    },
    {
      time: "11:00 AM",
      title: "Mid-Morning Cellular Hydration",
      category: "Hydration",
      icon: "fa-droplet",
      color: "border-blue-500 text-blue-500 bg-blue-500/10",
      desc: "Consume another glass of water. A great interval for organic herbal green tea to inject antioxidants."
    },
    {
      time: "01:15 PM",
      title: "High-Protein Metabolic Lunch",
      category: "Meals",
      icon: "fa-bowl-food",
      color: "border-emerald-500 text-emerald-500 bg-emerald-500/10",
      desc: "High protein and fiber meal (e.g., grilled wild salmon or tofu Buddha bowl with rich broccoli/spinach). Keeps focus high for the afternoon."
    },
    {
      time: "03:30 PM",
      title: "Cellular Fluid Balance & Minerals",
      category: "Hydration",
      icon: "fa-bottle-water",
      color: "border-blue-500 text-blue-500 bg-blue-500/10",
      desc: "Drink water. If hungry, pair with mineral-dense hydration boosters like cucumber or coconut water."
    },
    {
      time: "04:30 PM",
      title: "Healthy Snack & Brain Power",
      category: "Snacks",
      icon: "fa-apple-whole",
      color: "border-amber-500 text-amber-500 bg-amber-500/10",
      desc: "Consume a handful of raw almonds and an apple. The perfect blend of healthy monounsaturated fats and soluble fibers to bridge the dinner gap."
    },
    {
      time: "05:30 PM",
      title: "Ideal Workout & Sweat Window",
      category: "Exercise",
      icon: "fa-person-running",
      color: "border-orange-500 text-orange-500 bg-orange-500/10",
      desc: "Core strength or cardio interval. Hydrate with small sips during the workout. Exercise increases muscle glucose sensitivity."
    },
    {
      time: "07:30 PM",
      title: "Light & Easy Digest Dinner",
      category: "Meals",
      icon: "fa-utensils",
      color: "border-emerald-500 text-emerald-500 bg-emerald-500/10",
      desc: "Low-fat digestible dinner (e.g., roasted breast of chicken/tofu with mixed veggies). Needs to be consumed at least 2.5-3 hours before bedtime."
    },
    {
      time: "09:30 PM",
      title: "Circadian Wind-Down",
      category: "Sleep",
      icon: "fa-moon",
      color: "border-indigo-500 text-indigo-500 bg-indigo-500/10",
      desc: "Limit blue light screens and solid food. Drink a small cup of warm chamomile tea to relax neuromuscular fibers."
    },
    {
      time: "10:30 PM",
      title: "Restful Deep Sleep Mode",
      category: "Sleep",
      icon: "fa-bed",
      color: "border-indigo-500 text-indigo-500 bg-indigo-500/10",
      desc: "Optimal metabolic recovery interval. Deep sleep cycles clear brain metabolic byproducts and regulate growth hormones."
    }
  ];

  const filteredEvents = scheduleEvents.filter(ev => activeSegment === 'All' || ev.category === activeSegment);

  return (
    <div className="space-y-8 page-transition">
      {/* Title Header */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white font-sans">
          Smart Daily Nutrition Schedule
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Maintain your circadian biology with timed suggestions. Review ideal meal intervals, optimal hydration reminders, workout blocks, and recovery windows.
        </p>
      </div>

      {/* Segment Selector Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {['All', 'Meals', 'Hydration', 'Snacks', 'Exercise', 'Sleep'].map((seg) => (
          <button
            key={seg}
            onClick={() => setActiveSegment(seg)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border shrink-0 ${
              activeSegment === seg
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-805 text-slate-650 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-500'
            }`}
          >
            {seg}
          </button>
        ))}
      </div>

      {/* Vertical Timeline Layout */}
      <div className="relative max-w-3xl mx-auto pl-6 md:pl-10 space-y-6 py-4">
        
        {/* Central Vertical Timeline Line */}
        <div className="absolute left-[30px] md:left-[38px] top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

        {filteredEvents.map((event, idx) => (
          <div key={idx} className="relative flex flex-col md:flex-row md:items-start gap-3 md:gap-6 fade-in group">
            
            {/* Timeline Circle and Icon */}
            <div className={`absolute -left-[30px] md:-left-[38px] w-12 h-12 rounded-2xl border-2 flex items-center justify-center z-10 transition-transform group-hover:scale-105 ${event.color} bg-white dark:bg-slate-950`}>
              <i className={`fa-solid ${event.icon} text-base`}></i>
            </div>

            {/* Time Stamp (Left in desktop) */}
            <div className="pl-10 md:pl-0 md:w-32 shrink-0 md:pt-3">
              <span className="text-sm font-extrabold text-slate-850 dark:text-slate-200 font-sans tracking-wide">
                ⏱️ {event.time}
              </span>
              <p className="text-[10px] text-emerald-500 font-bold uppercase mt-0.5">{event.category}</p>
            </div>

            {/* Card Content (Right) */}
            <div className="pl-10 md:pl-0 flex-grow">
              <div className="glass-card p-5 border border-slate-200/5 hover:border-emerald-500/10 shadow-sm transition-all duration-350">
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  {event.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2 font-sans">
                  {event.desc}
                </p>
              </div>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};
