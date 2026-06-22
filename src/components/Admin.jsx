// src/components/Admin.jsx
import React, { useState, useEffect } from "react";
// ✅ Corrected Named Import from the refactored modular dataset
import { NutritionData } from "../lib/nutritionData";

function Admin({ user, customFoods, blogs, comments, dbSync }) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState("analytics");

  const [foodForm, setFoodForm] = useState({
    name: "",
    category: "Fruits",
    calories: 60,
    carbs: 12,
    protein: 1,
    fat: 0,
    vitamins: "Vitamin C, Fiber",
    benefits: "Highly nutritious, improves metabolism",
    bestTime: "Morning",
    quantity: "1 portion daily",
    sideEffects: "",
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba"
  });

  const [articleForm, setArticleForm] = useState({
    title: "",
    category: "Recipes",
    author: "Dr. Evelyn Reed (PhD)",
    readTime: "5 min read",
    excerpt: "Quick premium wellness recipes...",
    content: "",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
  });

  // ANALYTICS CHART
  useEffect(() => {
    if (activeAdminSubTab === "analytics") {
      const timer = setTimeout(() => {
        const chartDom = document.querySelector("#admin-analytics-chart");

        // Safely check if ApexCharts exists on the window object before calling it
        if (chartDom && window.ApexCharts) {
          chartDom.innerHTML = "";

          const chart = new window.ApexCharts(chartDom, {
            series: [
              {
                name: "Page Interactions",
                data: [450, 620, 580, 890, 1200, 1150, 1400]
              },
              {
                name: "Active Habit Loggers",
                data: [32, 45, 50, 75, 80, 92, 105]
              }
            ],
            chart: {
              height: 280,
              type: "area",
              toolbar: { show: false }
            },
            colors: ["#10b981", "#3b82f6"],
            stroke: {
              curve: "smooth"
            },
            xaxis: {
              categories: ["May 16", "May 17", "May 18", "May 19", "May 20", "May 21", "May 22"]
            }
          });
          chart.render();
        }
      }, 100);

      return () => clearTimeout(timer); // Clean up timeout to prevent memory leaks
    }
  }, [activeAdminSubTab]);

  // ADD FOOD
  const handleFoodSubmit = (e) => {
    e.preventDefault();
    if (!foodForm.name) return alert("Please enter a food name");

    const newFood = {
      id: foodForm.name.toLowerCase().replace(/ /g, "-"),
      ...foodForm,
      calories: Number(foodForm.calories),
      protein: Number(foodForm.protein),
      carbs: Number(foodForm.carbs),
      fat: Number(foodForm.fat),
      vitamins: typeof foodForm.vitamins === "string" ? foodForm.vitamins.split(",").map(v => v.trim()) : foodForm.vitamins,
      benefits: typeof foodForm.benefits === "string" ? foodForm.benefits.split(",").map(b => b.trim()) : foodForm.benefits
    };

    // ✅ Corrected: Safely unshifts directly onto the imported module instance reference array
    if (NutritionData && NutritionData.foods) {
      NutritionData.foods.unshift(newFood);
    }

    dbSync({
      customFoods: [...customFoods, newFood]
    });

    alert(`${foodForm.name} added successfully!`);
    setFoodForm({
      name: "", category: "Fruits", calories: 60, carbs: 12, protein: 1, fat: 0,
      vitamins: "Vitamin C, Fiber", benefits: "Highly nutritious", bestTime: "Morning",
      quantity: "1 portion daily", sideEffects: "", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba"
    });
  };

  // ADD BLOG
  const handleBlogSubmit = (e) => {
    e.preventDefault();
    if (!articleForm.title) return alert("Please enter a title");

    const newBlog = {
      id: blogs.length + 1,
      ...articleForm,
      date: new Date().toISOString().split("T")[0]
    };

    // ✅ Corrected: Safely unshifts directly onto the imported module instance reference array
    if (NutritionData && NutritionData.articles) {
      NutritionData.articles.unshift(newBlog);
    }

    dbSync({
      blogs: [...blogs, newBlog]
    });

    alert("Article published successfully!");
    setArticleForm({
      title: "", category: "Recipes", author: "Dr. Evelyn Reed (PhD)",
      readTime: "5 min read", excerpt: "Quick premium wellness recipes...", content: "",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
    });
  };

  const handleDeleteComment = (id) => {
    dbSync({
      comments: comments.filter(c => c.id !== id)
    });
  };

  return (
    <div className="space-y-8 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-shield-halved text-emerald-500"></i> Secure Control Panel
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage food catalog, articles, and logs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDE NAV TAB SELECTOR */}
        <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 border-b lg:border-b-0 pb-3 lg:pb-0">
          {[
            { id: "analytics", label: "Analytics", icon: "fa-chart-pie" },
            { id: "add-food", label: "Add Food", icon: "fa-apple-whole" },
            { id: "add-blog", label: "Publish Blog", icon: "fa-pen-to-square" },
            { id: "comments", label: "Comments", icon: "fa-comments" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminSubTab(tab.id)}
              className={`p-3 rounded-xl flex items-center gap-3 font-medium text-sm transition whitespace-nowrap w-full min-w-[140px] lg:min-w-0 ${
                activeAdminSubTab === tab.id
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50"
              }`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTAINER MAIN ELEMENT */}
        <div className="lg:col-span-3 min-h-[350px]">
          {activeAdminSubTab === "analytics" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Traffic & Engagement Analytics</h2>
              <div id="admin-analytics-chart" className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800"></div>
            </div>
          )}

          {activeAdminSubTab === "add-food" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Add Database Entry</h2>
              <form onSubmit={handleFoodSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Food Name</label>
                  <input className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-transparent" placeholder="e.g. Avocado" value={foodForm.name} onChange={e => setFoodForm({ ...foodForm, name: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Category</label>
                  <select className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-900" value={foodForm.category} onChange={e => setFoodForm({ ...foodForm, category: e.target.value })}>
                    <option>Fruits</option>
                    <option>Vegetables</option>
                    <option>Grains</option>
                    <option>Protein sources</option>
                    <option>Dairy products</option>
                    <option>Nuts & seeds</option>
                    <option>Traditional healthy foods</option>
                    <option>Superfoods</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Calories (kcal)</label>
                  <input type="number" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-transparent" value={foodForm.calories} onChange={e => setFoodForm({ ...foodForm, calories: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Carbs (g)</label>
                  <input type="number" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-transparent" value={foodForm.carbs} onChange={e => setFoodForm({ ...foodForm, carbs: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Protein (g)</label>
                  <input type="number" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-transparent" value={foodForm.protein} onChange={e => setFoodForm({ ...foodForm, protein: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Fat (g)</label>
                  <input type="number" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-transparent" value={foodForm.fat} onChange={e => setFoodForm({ ...foodForm, fat: e.target.value })} />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Vitamins & Minerals (Comma Separated)</label>
                  <input className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-transparent" placeholder="Vitamin E, Potassium, Iron" value={foodForm.vitamins} onChange={e => setFoodForm({ ...foodForm, vitamins: e.target.value })} />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Health Benefits (Comma Separated)</label>
                  <input className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-transparent" placeholder="Packed with healthy fats, Improves absorption" value={foodForm.benefits} onChange={e => setFoodForm({ ...foodForm, benefits: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-2.5 rounded-xl transition shadow-md shadow-emerald-500/10">Add Food Item</button>
                </div>
              </form>
            </div>
          )}

          {activeAdminSubTab === "add-blog" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Publish Editorial Content</h2>
              <form onSubmit={handleBlogSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Article Title</label>
                  <input className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-transparent" placeholder="The Power of Intermittent Nutrition" value={articleForm.title} onChange={e => setArticleForm({ ...articleForm, title: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Content Body</label>
                  <textarea rows="4" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-transparent resize-none" placeholder="Write full article breakdown here..." value={articleForm.content} onChange={e => setArticleForm({ ...articleForm, content: e.target.value })}></textarea>
                </div>
                <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-2.5 rounded-xl transition shadow-md shadow-emerald-500/10">Publish Entry</button>
              </form>
            </div>
          )}

          {activeAdminSubTab === "comments" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Moderate System Comments ({comments.length})</h2>
              {comments.length === 0 ? (
                <p className="text-sm text-slate-400 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl text-center">No community moderation items found.</p>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {comments.map(comment => (
                    <div key={comment.id} className="border dark:border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/20">
                      <div className="space-y-1">
                        <p className="text-sm text-slate-700 dark:text-slate-300">{comment.text}</p>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1"><i className="fa-regular fa-user"></i> Context ID: {comment.id}</span>
                      </div>
                      <button onClick={() => handleDeleteComment(comment.id)} className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition text-sm flex items-center gap-1 whitespace-nowrap">
                        <i className="fa-solid fa-trash-can"></i> Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;