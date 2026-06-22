import React, { useState } from "react";

function Schedule() {
  const [activeSegment, setActiveSegment] = useState("All");

  const scheduleEvents = [
    { id: 1, time: "07:30 AM", title: "Wake-up Hydration Boost", category: "Hydration", icon: "fa-glass-water", color: "border-blue-500 text-blue-500 bg-blue-500/10", desc: "Drink 1-2 glasses of warm water." },
    { id: 2, time: "08:15 AM", title: "Premium Balanced Breakfast", category: "Meals", icon: "fa-mug-saucer", color: "border-emerald-500 text-emerald-500 bg-emerald-500/10", desc: "Complex carbohydrates and clean proteins." },
    { id: 3, time: "11:00 AM", title: "Mid-Morning Hydration", category: "Hydration", icon: "fa-droplet", color: "border-blue-500 text-blue-500 bg-blue-500/10", desc: "Herbal teas for stable osmotic pressure." },
    { id: 4, time: "01:15 PM", title: "High Protein Lunch", category: "Meals", icon: "fa-bowl-food", color: "border-emerald-500 text-emerald-500 bg-emerald-500/10", desc: "Cruciferous vegetables and lean protein." },
    { id: 5, time: "03:30 PM", title: "Mineral Hydration", category: "Hydration", icon: "fa-bottle-water", color: "border-blue-500 text-blue-500 bg-blue-500/10", desc: "Pure spring water or electrolyte mixes." },
    { id: 6, time: "04:30 PM", title: "Healthy Snack", category: "Snacks", icon: "fa-apple-whole", color: "border-amber-500 text-amber-500 bg-amber-500/10", desc: "Whole nutrient sources like walnuts." },
    { id: 7, time: "05:30 PM", title: "Workout Window", category: "Exercise", icon: "fa-person-running", color: "border-orange-500 text-orange-500 bg-orange-500/10", desc: "Physical activity for glucose clearance." },
    { id: 8, time: "07:30 PM", title: "Light Dinner", category: "Meals", icon: "fa-utensils", color: "border-emerald-500 text-emerald-500 bg-emerald-500/10", desc: "Easily digestible amino acids." },
    { id: 9, time: "09:30 PM", title: "Sleep Preparation", category: "Sleep", icon: "fa-moon", color: "border-indigo-500 text-indigo-500 bg-indigo-500/10", desc: "Limit blue light for melatonin signaling." },
    { id: 10, time: "10:30 PM", title: "Deep Sleep Recovery", category: "Sleep", icon: "fa-bed", color: "border-indigo-500 text-indigo-500 bg-indigo-500/10", desc: "Supports cellular autophagy and repair." }
  ];

  const segments = ["All", "Meals", "Hydration", "Snacks", "Exercise", "Sleep"];
  const filteredEvents = scheduleEvents.filter(e => activeSegment === "All" || e.category === activeSegment);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
          <i className="fa-solid fa-calendar-days text-emerald-500"></i> Smart Daily Nutrition Schedule
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Chronological metabolic optimization through synchronized inputs.
        </p>
      </header>

      {/* Filters */}
      <nav className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide border-b border-slate-50 dark:border-slate-800/40">
        {segments.map(segment => (
          <button
            key={segment}
            onClick={() => setActiveSegment(segment)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeSegment === segment
                ? "bg-emerald-500 text-white"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            {segment}
          </button>
        ))}
      </nav>

      {/* Timeline */}
      <main className="relative max-w-3xl mx-auto space-y-8 pl-14 pt-4">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>
        {filteredEvents.map((event) => (
          <article key={event.id} className="relative flex flex-col sm:flex-row sm:items-start gap-6 animate-fade-in">
            <div className={`absolute -left-14 w-10 h-10 rounded-xl border-2 flex items-center justify-center ${event.color} dark:bg-slate-950`}>
              <i className={`fa-solid ${event.icon}`}></i>
            </div>
            <div className="w-24 shrink-0 pt-1">
              <p className="font-extrabold text-sm text-slate-800 dark:text-slate-200">{event.time}</p>
              <span className="text-[9px] font-black text-emerald-500 uppercase">{event.category}</span>
            </div>
            <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">{event.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{event.desc}</p>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}

export default Schedule;