// NutriLife Food Encyclopedia Component (ES MODULE VIA BABEL)

 function Encyclopedia() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedFood, setSelectedFood] = React.useState(null);
  const [voiceListening, setVoiceListening] = React.useState(false);

  const categories = [
    "All",
    "Fruits",
    "Vegetables",
    "Grains",
    "Protein sources",
    "Dairy products",
    "Nuts & seeds",
    "Traditional healthy foods",
    "Superfoods"
  ];

  // Robust mock matrix data fallback if asynchronous database hasn't loaded immediately
  const allFoods = window.NutritionData?.foods || [
    {
      id: "avocado",
      name: "Avocado",
      category: "Fruits",
      calories: 160,
      protein: 2,
      carbs: 9,
      fat: 15,
      vitamins: ["Vitamin K", "Vitamin C", "Potassium", "Vitamin E"],
      benefits: ["Supports cardiovascular pathways", "Rich in healthy monounsaturated monolipids"],
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578"
    },
    {
      id: "blueberries",
      name: "Blueberries",
      category: "Superfoods",
      calories: 57,
      protein: 1,
      carbs: 14,
      fat: 0,
      vitamins: ["Vitamin C", "Vitamin K", "Manganese"],
      benefits: ["Extremely high anti-oxidant profile", "Enhances neural cognitive responses"],
      image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e"
    },
    {
      id: "spinach",
      name: "Spinach",
      category: "Vegetables",
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      vitamins: ["Vitamin A", "Vitamin C", "Iron", "Calcium"],
      benefits: ["Boosts oxygenation efficiency", "Supports bone structural longevity"],
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb"
    }
  ];

  // RENDERING THE MACRONUTRIENT CHART MATRIX
  React.useEffect(() => {
    if (selectedFood) {
      setTimeout(() => {
        const chartDom = document.querySelector("#macro-donut-chart");

        if (chartDom && window.ApexCharts) {
          chartDom.innerHTML = "";

          const chart = new ApexCharts(chartDom, {
            series: [
              Number(selectedFood.protein) || 0,
              Number(selectedFood.carbs) || 0,
              Number(selectedFood.fat) || 0
            ],
            labels: ["Protein (g)", "Carbs (g)", "Fats (g)"],
            chart: {
              type: "donut",
              height: 220
            },
            colors: ["#3b82f6", "#f59e0b", "#10b981"],
            legend: {
              position: "bottom",
              labels: {
                colors: document.documentElement.classList.contains("dark") ? "#cbd5e1" : "#334155"
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return Math.round(val) + "%";
              }
            }
          });

          chart.render();
        }
      }, 120);
    }
  }, [selectedFood]);

  // NATIVE VOICE RECOGNITION PIPELINE ENGINE
  const handleVoiceSearch = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Voice speech recognition interfaces are not configured inside this browser architecture.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setVoiceListening(true);
    };

    recognition.onend = () => {
      setVoiceListening(false);
    };

    recognition.onresult = (event) => {
      if (event.results?.[0]?.[0]?.transcript) {
        setSearchTerm(event.results[0][0].transcript);
      }
    };

    recognition.start();
  };

  const filteredFoods = allFoods.filter(food => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      food.name.toLowerCase().includes(search) ||
      food.benefits?.some(b => b.toLowerCase().includes(search)) ||
      food.vitamins?.some(v => v.toLowerCase().includes(search));

    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 page-transition">
      {/* HEADER SECTION CONTAINER */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-seedling text-emerald-500"></i> Food Nutrition Encyclopedia
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Deconstruct metabolic baselines, macronutrient splits, vitamins profiles, and targeted physiological benefits.
        </p>
      </div>

      {/* SEARCH AND CAPTURE ROW ELEMENTS */}
      <div className="relative group">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-4 text-slate-400 group-focus-within:text-emerald-500 transition"></i>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items by name, isolated target micro-nutrients or physical health benefits..."
          className="w-full border dark:border-slate-800 rounded-2xl pl-11 pr-12 py-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
        />
        <button
          onClick={handleVoiceSearch}
          className={`absolute right-4 top-3.5 transition ${
            voiceListening ? "text-red-500 scale-110 animate-pulse" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          }`}
          title="Voice Search"
        >
          <i className={`fa-solid ${voiceListening ? "fa-microphone-lines" : "fa-microphone"}`}></i>
        </button>
      </div>

      {/* HORIZONTAL CATEGORIES ROW SCROLLER */}
      <div className="flex gap-2 overflow-x-auto pb-2 invisible-scrollbar border-b border-slate-100 dark:border-slate-800/60">
        {categories.map(cat => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                active
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* GRID SYSTEM DISPLAY ENGINE */}
      {filteredFoods.length === 0 ? (
        <div className="p-12 text-center text-slate-400 dark:text-slate-500 border border-dashed rounded-2xl">
          <i className="fa-solid fa-shrimp text-2xl mb-2 block"></i> No food catalog assets found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map(food => (
            <div
              key={food.id}
              onClick={() => setSelectedFood(food)}
              className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden cursor-pointer bg-white dark:bg-slate-900 hover:shadow-md hover:border-emerald-500/20 transition-all group shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="overflow-hidden h-44">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-slate-800 dark:text-white text-base group-hover:text-emerald-500 transition">
                    {food.name}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1 italic">
                    {food.benefits?.[0] || "Nutrient dense profiles"}
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><i className="fa-solid fa-fire text-orange-500"></i> {food.calories} kcal</span>
                    <span className="flex items-center gap-1"><i className="fa-solid fa-dumbbell text-blue-500"></i> {food.protein}g Prot</span>
                    <span className="flex items-center gap-1"><i className="fa-solid fa-wheat-awn text-amber-500"></i> {food.carbs}g Carb</span>
                    <span className="flex items-center gap-1"><i className="fa-solid fa-olive-oil text-emerald-500"></i> {food.fat}g Fat</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* OVERLAY SYSTEM BLOCKING DIALOG VIEW MODAL */}
      {selectedFood && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 space-y-6 invisible-scrollbar">
            {/* DISMISS BUTTON */}
            <button
              onClick={() => setSelectedFood(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-red-500 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <img
              src={selectedFood.image}
              alt={selectedFood.name}
              className="w-full h-52 object-cover rounded-xl shadow-sm"
            />

            <div>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                {selectedFood.category}
              </span>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white mt-2">{selectedFood.name}</h2>
            </div>

            {/* DYNAMIC APEXCHARTS ELEMENT */}
            <div className="bg-slate-50 dark:bg-slate-950/40 p-4 border dark:border-slate-800 rounded-xl flex flex-col items-center">
              <span className="text-xs text-slate-400 font-bold mb-2">Macronutrient Distribution Profile</span>
              <div id="macro-donut-chart"></div>
            </div>

            {/* METABOLIC BENEFIT RECAPS */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <i className="fa-solid fa-circle-nodes text-emerald-500"></i> Metabolic Path Benefits
              </h3>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pl-1">
                {selectedFood.benefits?.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <i className="fa-solid fa-square-check text-emerald-500 mt-0.5"></i> <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* MICRONUTRIENT ALLOCATIONS */}
            <div className="space-y-2.5">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <i className="fa-solid fa-vial text-blue-500"></i> Micro-Nutrients & Vitamins
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedFood.vitamins?.map((v, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-xl"
                  >
                    ✨ {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}