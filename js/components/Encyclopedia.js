// NutriLife Food Encyclopedia Component
window.Encyclopedia = function () {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedFood, setSelectedFood] = React.useState(null);
  const [voiceListening, setVoiceListening] = React.useState(false);

  const categories = ['All', 'Fruits', 'Vegetables', 'Grains', 'Protein sources', 'Dairy products', 'Nuts & seeds', 'Traditional healthy foods', 'Superfoods'];
  const allFoods = window.NutritionData.foods;

  // Render macro chart in modal when selectedFood changes
  React.useEffect(() => {
    if (selectedFood) {
      // Delay slightly to ensure modal DOM is mounted
      const timer = setTimeout(() => {
        const chartDom = document.querySelector("#macro-donut-chart");
        if (chartDom) {
          chartDom.innerHTML = ""; // Clear existing
          const options = {
            series: [selectedFood.protein, selectedFood.carbs, selectedFood.fat],
            labels: ['Protein (g)', 'Carbs (g)', 'Fats (g)'],
            chart: {
              type: 'donut',
              height: 220,
              fontFamily: 'Outfit, sans-serif'
            },
            colors: ['#10b981', '#3b82f6', '#f59e0b'],
            legend: {
              position: 'bottom',
              labels: {
                colors: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#475569'
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val, opts) {
                return opts.w.config.series[opts.seriesIndex] + "g"
              }
            },
            plotOptions: {
              pie: {
                donut: {
                  size: '65%',
                  labels: {
                    show: true,
                    name: {
                      show: true,
                      color: '#64748b',
                      fontSize: '12px'
                    },
                    value: {
                      show: true,
                      color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
                      fontSize: '16px',
                      fontWeight: '700',
                      formatter: function (val) {
                        return val + "g"
                      }
                    },
                    total: {
                      show: true,
                      label: 'Total Macros',
                      color: '#10b981',
                      formatter: function (w) {
                        return (selectedFood.protein + selectedFood.carbs + selectedFood.fat).toFixed(1) + "g"
                      }
                    }
                  }
                }
              }
            }
          };
          const chart = new ApexCharts(chartDom, options);
          chart.render();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedFood]);

  // Voice Search Trigger using Web Speech API
  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice speech recognition is not supported in this browser. Try Google Chrome.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setVoiceListening(true);
    };

    recognition.onerror = (e) => {
      console.error(e);
      setVoiceListening(false);
    };

    recognition.onend = () => {
      setVoiceListening(false);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setSearchTerm(speechToText);
    };

    recognition.start();
  };

  // Filter foods
  const filteredFoods = allFoods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          food.benefits.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          food.vitamins.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 page-transition">
      {/* Title & Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white font-sans">
            Food Nutrition Encyclopedia
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse through hundreds of whole foods, superfoods, and grains. View granular vitamins, recommended servings, and macro-nutritional balances.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        {/* Search Bar */}
        <div className="relative flex-grow">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-3.5 text-slate-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search foods, vitamins, minerals, or benefits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-12 py-3 glass-input border border-slate-200 dark:border-slate-800 text-sm font-sans"
          />
          {/* Voice Search Button */}
          <button
            onClick={handleVoiceSearch}
            title="Search with Voice"
            className={`absolute right-3 top-2 p-1.5 rounded-lg transition-all ${
              voiceListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10'
            }`}
          >
            <i className="fa-solid fa-microphone text-sm"></i>
          </button>
        </div>
      </div>

      {/* Category Pills List */}
      <div className="flex space-x-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 border shrink-0 ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Foods Grid */}
      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              onClick={() => setSelectedFood(food)}
              className="glass-card overflow-hidden hover:scale-[1.02] border border-slate-200/5 hover:border-emerald-500/25 transition-all duration-300 cursor-pointer shadow-sm group flex flex-col justify-between"
            >
              <div>
                {/* Food Image */}
                <div className="h-44 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-slate-900/80 text-white text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    {food.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{food.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {food.benefits[0]}
                  </p>
                  
                  {/* Macro Badges bar */}
                  <div className="grid grid-cols-4 gap-2 pt-2 text-center border-t border-slate-100 dark:border-slate-800/80">
                    <div className="py-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Kcal</p>
                      <p className="text-xs font-extrabold text-slate-700 dark:text-slate-300">{food.calories}</p>
                    </div>
                    <div className="py-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Prot</p>
                      <p className="text-xs font-extrabold text-emerald-500">{food.protein}g</p>
                    </div>
                    <div className="py-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Carbs</p>
                      <p className="text-xs font-extrabold text-blue-500">{food.carbs}g</p>
                    </div>
                    <div className="py-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Fat</p>
                      <p className="text-xs font-extrabold text-amber-500">{food.fat}g</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Servings hint */}
              <div className="px-5 py-3.5 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <span>⏱️ {food.bestTime.split(' / ')[0]}</span>
                <span>Serv: {food.quantity.split(' daily')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass-card border border-dashed border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            <i className="fa-solid fa-lemon"></i>
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">No foods found</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            We couldn't match your search "{searchTerm}". Try entering a vitamin like "Vitamin C", a benefit like "immune", or category "Superfoods".
          </p>
        </div>
      )}

      {/* 5. FOOD DETAIL MODAL */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-[680px] max-h-[90vh] overflow-y-auto border border-emerald-500/10 shadow-2xl relative animate-slide-up flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedFood(null)}
              className="absolute right-4 top-4 z-10 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-red-500 text-white flex items-center justify-center transition-colors"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>

            {/* Modal Image Header */}
            <div className="h-52 w-full relative shrink-0 bg-slate-200 dark:bg-slate-950">
              <img
                src={selectedFood.image}
                alt={selectedFood.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500 text-white text-[9px] font-extrabold uppercase tracking-widest">{selectedFood.category}</span>
                <h2 className="text-2xl font-bold text-white mt-1">{selectedFood.name} Detailed Profile</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Macro breakdown grid with donut chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* Stats block */}
                <div className="space-y-4">
                  <h3 className="text-sm font-extrabold uppercase tracking-wide text-emerald-500">Nutritional Densities (100g)</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Energy</p>
                      <p className="text-lg font-black text-slate-800 dark:text-slate-100">{selectedFood.calories} kcal</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Protein</p>
                      <p className="text-lg font-black text-emerald-500">{selectedFood.protein}g</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Carbs</p>
                      <p className="text-lg font-black text-blue-500">{selectedFood.carbs}g</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Healthy Fats</p>
                      <p className="text-lg font-black text-amber-500">{selectedFood.fat}g</p>
                    </div>
                  </div>

                  {/* Vitamins pills */}
                  <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Micronutrients & Vitamins</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFood.vitamins.map((v, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                          ✦ {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Donut Chart Mount */}
                <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Macronutrient Ratio</p>
                  <div id="macro-donut-chart" className="w-full"></div>
                </div>

              </div>

              {/* Health Benefits and Intake guides */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                
                {/* Benefits */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Biological Benefits</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {selectedFood.benefits.map((b, i) => (
                      <li key={i} className="flex items-start">
                        <i className="fa-solid fa-circle-check text-emerald-500 mr-2 mt-0.5 shrink-0"></i>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Consuming advice */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-1">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">⏱️ Ideal Sched timings</p>
                    <p className="text-slate-500 dark:text-slate-300 font-medium">{selectedFood.bestTime}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-1">
                    <p className="font-bold text-blue-600 dark:text-blue-400">⚖️ Serving quantity</p>
                    <p className="text-slate-500 dark:text-slate-300 font-medium">{selectedFood.quantity}</p>
                  </div>
                </div>

                {/* Side effects warning */}
                {selectedFood.sideEffects && (
                  <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs flex items-start space-x-3.5">
                    <i className="fa-solid fa-triangle-exclamation text-amber-500 text-sm mt-0.5 shrink-0"></i>
                    <div>
                      <p className="font-bold text-amber-600 dark:text-amber-400">Excess Warning</p>
                      <p className="text-slate-500 dark:text-slate-300 leading-relaxed mt-0.5">{selectedFood.sideEffects}</p>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedFood(null)}
                className="px-5 py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
