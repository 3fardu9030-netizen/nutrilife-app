import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const COLOR_THEME_MAP = {
  blue: { bg: "bg-blue-500", text: "text-blue-500", lightBg: "bg-blue-500/10" },
  emerald: { bg: "bg-emerald-500", text: "text-emerald-500", lightBg: "bg-emerald-500/10" },
  orange: { bg: "bg-orange-500", text: "text-orange-500", lightBg: "bg-orange-500/10" },
  indigo: { bg: "bg-indigo-500", text: "text-indigo-500", lightBg: "bg-indigo-500/10" }
};

function Tracker({ user, habitLogs = [], dbSync }) {
  const [todayLog, setTodayLog] = useState({ water: 5, calories: 1600, sleep: 6.8, exercise: 20 });
  const [chartData, setChartData] = useState({ series: [], options: {} });

  // Sync state
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const existingLog = habitLogs.find(log => log.date === today);
    if (existingLog) setTodayLog(existingLog);

    // Prepare chart data
    const sorted = [...habitLogs].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-7);
    const baseline = sorted.length ? sorted : Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (6 - i));
      return { date: d.toISOString().split("T")[0], water: 4 + i % 2, calories: 1500 + (i * 50), exercise: 15 + (i * 5) };
    });

    const isDark = document.documentElement.classList.contains("dark");
    
    setChartData({
      series: [
        { name: "Water (Cups)", type: "column", data: baseline.map(l => l.water || 0) },
        { name: "Exercise (Min)", type: "area", data: baseline.map(l => l.exercise || 0) },
        { name: "Calories (kcal)", type: "line", data: baseline.map(l => l.calories || 0) }
      ],
      options: {
        chart: { height: 280, type: "line", toolbar: { show: false } },
        stroke: { curve: "smooth", width: [0, 2, 3] },
        colors: ["#3b82f6", "#f97316", "#10b981"],
        xaxis: { categories: baseline.map(l => new Date(l.date).toLocaleDateString("en-US", { weekday: "short" })) },
        yaxis: [
          { title: { text: "Hydration & Movement" } },
          { opposite: true, title: { text: "Energy Intake (kcal)" } }
        ],
        theme: { mode: isDark ? "dark" : "light" }
      }
    });
  }, [habitLogs, todayLog]);

  return (
    <div className="space-y-8">
      {/* Chart Render */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm">
        <Chart options={chartData.options} series={chartData.series} type="line" height={280} />
      </div>
      {/* ... rest of your UI components ... */}
    </div>
  );
}

export default Tracker;