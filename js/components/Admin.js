// NutriLife Secure Admin Control Center Component
window.Admin = function ({ user, customFoods, blogs, comments, dbSync }) {
  const [activeAdminSubTab, setActiveAdminSubTab] = React.useState('analytics');
  
  // Forms States
  const [foodForm, setFoodForm] = React.useState({
    name: '', category: 'Fruits', calories: 60, carbs: 12, protein: 1, fat: 0,
    vitamins: 'Vitamin C, Fiber', benefits: 'Highly nutritious, improves metabolism',
    bestTime: 'Morning', quantity: '1 portion daily', sideEffects: '',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=600'
  });

  const [articleForm, setArticleForm] = React.useState({
    title: '', category: 'Recipes', author: 'Dr. Evelyn Reed (PhD)', readTime: '5 min read',
    excerpt: 'Quick premium wellness recipes...', content: '',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'
  });

  // Render Admin Analytics Chart using ApexCharts
  React.useEffect(() => {
    if (activeAdminSubTab === 'analytics') {
      const timer = setTimeout(() => {
        const chartDom = document.querySelector("#admin-analytics-chart");
        if (chartDom) {
          chartDom.innerHTML = "";
          const options = {
            series: [{
              name: 'Page Interactions',
              data: [450, 620, 580, 890, 1200, 1150, 1400]
            }, {
              name: 'Active Habit Loggers',
              data: [32, 45, 50, 75, 80, 92, 105]
            }],
            chart: {
              height: 280,
              type: 'area',
              fontFamily: 'Outfit, sans-serif',
              toolbar: { show: false }
            },
            colors: ['#10b981', '#3b82f6'],
            stroke: { curve: 'smooth', width: 3 },
            xaxis: {
              categories: ['May 16', 'May 17', 'May 18', 'May 19', 'May 20', 'May 21', 'May 22'],
              labels: { style: { colors: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#475569' } }
            },
            yaxis: {
              labels: { style: { colors: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#475569' } }
            },
            tooltip: { theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light' }
          };
          const chart = new ApexCharts(chartDom, options);
          chart.render();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeAdminSubTab]);

  // Food Form Mutators
  const handleFoodSubmit = (e) => {
    e.preventDefault();
    const newFood = {
      id: foodForm.name.toLowerCase().replace(/ /g, '-'),
      name: foodForm.name,
      category: foodForm.category,
      calories: parseInt(foodForm.calories) || 0,
      carbs: parseFloat(foodForm.carbs) || 0,
      protein: parseFloat(foodForm.protein) || 0,
      fat: parseFloat(foodForm.fat) || 0,
      vitamins: foodForm.vitamins.split(',').map(s => s.trim()),
      benefits: foodForm.benefits.split(',').map(s => s.trim()),
      bestTime: foodForm.bestTime,
      quantity: foodForm.quantity,
      sideEffects: foodForm.sideEffects,
      image: foodForm.image
    };

    // Prepend to standard foods array (in-memory app state and dbSync writeback)
    window.NutritionData.foods.unshift(newFood);
    const updatedFoodsList = [...customFoods, newFood];
    dbSync({ customFoods: updatedFoodsList });

    // Reset Form
    setFoodForm({
      name: '', category: 'Fruits', calories: 60, carbs: 12, protein: 1, fat: 0,
      vitamins: 'Vitamin C, Fiber', benefits: 'Highly nutritious, improves metabolism',
      bestTime: 'Morning', quantity: '1 portion daily', sideEffects: '',
      image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=600'
    });
    alert("New food item successfully cataloged into database!");
  };

  // Blog Form Mutators
  const handleBlogSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      id: blogs.length + 4, // unique ID
      title: articleForm.title,
      category: articleForm.category,
      author: articleForm.author,
      readTime: articleForm.readTime,
      excerpt: articleForm.excerpt,
      content: articleForm.content,
      image: articleForm.image,
      date: new Date().toISOString().split('T')[0]
    };

    // Prepend to memory dataset & sync
    window.NutritionData.articles.unshift(newBlog);
    const updatedBlogsList = [...blogs, newBlog];
    dbSync({ blogs: updatedBlogsList });

    // Reset Form
    setArticleForm({
      title: '', category: 'Recipes', author: 'Dr. Evelyn Reed (PhD)', readTime: '5 min read',
      excerpt: 'Quick premium wellness recipes...', content: '',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'
    });
    alert("Article successfully published to blogs section!");
  };

  // Comments moderation mutators
  const handleDeleteComment = (cmtId) => {
    const updatedComments = comments.filter(c => c.id !== cmtId);
    dbSync({ comments: updatedComments });
  };

  return (
    <div className="space-y-8 page-transition">
      {/* Title Header */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white font-sans">
          Secure Admin Control Panel
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Catalog fresh whole foods, publish scientific articles, moderate user comment flows, and inspect system traffic metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Column: Side Tabs */}
        <div className="lg:col-span-1 space-y-2">
          <button
            onClick={() => setActiveAdminSubTab('analytics')}
            className={`w-full p-3.5 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
              activeAdminSubTab === 'analytics' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900'
            }`}
          >
            <i className="fa-solid fa-chart-line text-emerald-500 text-sm"></i>
            <span className="text-xs font-bold">Interactions Analytics</span>
          </button>
          <button
            onClick={() => setActiveAdminSubTab('add-food')}
            className={`w-full p-3.5 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
              activeAdminSubTab === 'add-food' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900'
            }`}
          >
            <i className="fa-solid fa-square-plus text-emerald-500 text-sm"></i>
            <span className="text-xs font-bold">Catalog Foods (CRUD)</span>
          </button>
          <button
            onClick={() => setActiveAdminSubTab('add-blog')}
            className={`w-full p-3.5 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
              activeAdminSubTab === 'add-blog' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900'
            }`}
          >
            <i className="fa-solid fa-file-pen text-emerald-500 text-sm"></i>
            <span className="text-xs font-bold">Publish Articles</span>
          </button>
          <button
            onClick={() => setActiveAdminSubTab('comments')}
            className={`w-full p-3.5 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
              activeAdminSubTab === 'comments' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900'
            }`}
          >
            <i className="fa-solid fa-comments text-emerald-500 text-sm"></i>
            <span className="text-xs font-bold">Moderate Comments</span>
          </button>
        </div>

        {/* Right Columns: Active admin panels */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* TAB 1: TRAFFIC ANALYTICS */}
          {activeAdminSubTab === 'analytics' && (
            <div className="space-y-6 fade-in">
              <div className="glass-card p-6 border border-emerald-500/5 shadow-md space-y-4">
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center">
                  <i className="fa-solid fa-chart-area text-emerald-500 mr-2.5"></i> Platform Traffic Overview
                </h3>
                <div id="admin-analytics-chart" className="w-full"></div>
              </div>

              {/* Platform metrics grids */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card p-5 border border-slate-200/5 shadow-sm text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Total Food database</p>
                  <p className="text-3xl font-black text-emerald-500 mt-1">{window.NutritionData.foods.length}</p>
                </div>
                <div className="glass-card p-5 border border-slate-200/5 shadow-sm text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Dynamic Articles</p>
                  <p className="text-3xl font-black text-blue-500 mt-1">{window.NutritionData.articles.length}</p>
                </div>
                <div className="glass-card p-5 border border-slate-200/5 shadow-sm text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Active logs saved</p>
                  <p className="text-3xl font-black text-amber-500 mt-1">{customFoods.length + blogs.length + comments.length + 12}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CATALOG FOODS FORM */}
          {activeAdminSubTab === 'add-food' && (
            <div className="glass-card p-6 border border-emerald-500/5 shadow-md space-y-6 fade-in">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center">
                <i className="fa-solid fa-square-plus text-emerald-500 mr-2.5"></i> Catalog New Nutrient Item
              </h3>

              <form onSubmit={handleFoodSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-500">Food Name</label>
                    <input type="text" required placeholder="e.g. Pineapple" value={foodForm.name} onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })} className="w-full px-3 py-2.5 glass-input border" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-500">Category</label>
                    <select value={foodForm.category} onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })} className="w-full px-3 py-2.5 glass-input border bg-transparent dark:bg-slate-900">
                      <option value="Fruits">Fruits</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Grains">Grains</option>
                      <option value="Protein sources">Protein sources</option>
                      <option value="Dairy products">Dairy products</option>
                      <option value="Nuts & seeds">Nuts & seeds</option>
                      <option value="Superfoods">Superfoods</option>
                      <option value="Traditional healthy foods">Traditional healthy foods</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-400">Calories (kcal)</label>
                    <input type="number" value={foodForm.calories} onChange={(e) => setFoodForm({ ...foodForm, calories: e.target.value })} className="w-full px-2 py-2 glass-input border text-center" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-400">Carbs (g)</label>
                    <input type="number" step="0.1" value={foodForm.carbs} onChange={(e) => setFoodForm({ ...foodForm, carbs: e.target.value })} className="w-full px-2 py-2 glass-input border text-center" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-400">Protein (g)</label>
                    <input type="number" step="0.1" value={foodForm.protein} onChange={(e) => setFoodForm({ ...foodForm, protein: e.target.value })} className="w-full px-2 py-2 glass-input border text-center" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-400">Fat (g)</label>
                    <input type="number" step="0.1" value={foodForm.fat} onChange={(e) => setFoodForm({ ...foodForm, fat: e.target.value })} className="w-full px-2 py-2 glass-input border text-center" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Vitamins (comma separated)</label>
                  <input type="text" placeholder="e.g. Vitamin C, Manganese, Folates" value={foodForm.vitamins} onChange={(e) => setFoodForm({ ...foodForm, vitamins: e.target.value })} className="w-full px-3 py-2.5 glass-input border" />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Health Benefits (comma separated)</label>
                  <input type="text" placeholder="e.g. Increases digest speed, rich in antioxidants" value={foodForm.benefits} onChange={(e) => setFoodForm({ ...foodForm, benefits: e.target.value })} className="w-full px-3 py-2.5 glass-input border" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-500">Best Time to Consume</label>
                    <input type="text" placeholder="Morning / Snacks" value={foodForm.bestTime} onChange={(e) => setFoodForm({ ...foodForm, bestTime: e.target.value })} className="w-full px-3 py-2.5 glass-input border" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-500">Recommended Quantity</label>
                    <input type="text" placeholder="1 slice daily" value={foodForm.quantity} onChange={(e) => setFoodForm({ ...foodForm, quantity: e.target.value })} className="w-full px-3 py-2.5 glass-input border" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Warning of Overconsumption</label>
                  <input type="text" placeholder="Excess can cause mild flatulence..." value={foodForm.sideEffects} onChange={(e) => setFoodForm({ ...foodForm, sideEffects: e.target.value })} className="w-full px-3 py-2.5 glass-input border" />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Food Image Link (Unsplash URL)</label>
                  <input type="url" value={foodForm.image} onChange={(e) => setFoodForm({ ...foodForm, image: e.target.value })} className="w-full px-3 py-2.5 glass-input border" />
                </div>

                <div className="flex justify-end pt-3">
                  <button type="submit" className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-md shadow-emerald-500/20">
                    Add Food to Encyclopedia
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: PUBLISH ARTICLES FORM */}
          {activeAdminSubTab === 'add-blog' && (
            <div className="glass-card p-6 border border-emerald-500/5 shadow-md space-y-6 fade-in">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center">
                <i className="fa-solid fa-file-pen text-emerald-500 mr-2.5"></i> Publish Health & Recipe Article
              </h3>

              <form onSubmit={handleBlogSubmit} className="space-y-4 text-xs font-sans">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Article Title</label>
                  <input type="text" required placeholder="e.g. The Science of Intermittent Fasting" value={articleForm.title} onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })} className="w-full px-3 py-2.5 glass-input border" />
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-505">Category</label>
                    <select value={articleForm.category} onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })} className="w-full px-3 py-2 glass-input border bg-transparent dark:bg-slate-900">
                      <option value="Recipes">Recipes</option>
                      <option value="Nutrition Basics">Nutrition Basics</option>
                      <option value="Superfoods">Superfoods</option>
                      <option value="Lifestyle & Hydration">Lifestyle & Hydration</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-500">Author</label>
                    <input type="text" value={articleForm.author} onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })} className="w-full px-3 py-2 glass-input border" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-500">Read Time (e.g. 5 min)</label>
                    <input type="text" value={articleForm.readTime} onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })} className="w-full px-3 py-2 glass-input border" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Brief Excerpt</label>
                  <input type="text" placeholder="Short summary displayed on cards..." value={articleForm.excerpt} onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })} className="w-full px-3 py-2.5 glass-input border" />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Article Content (Markdown support)</label>
                  <textarea rows="6" placeholder="Write comprehensive guide contents here..." value={articleForm.content} onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })} className="w-full px-3 py-2.5 glass-input border font-mono text-[11px]" />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Cover Image URL</label>
                  <input type="url" value={articleForm.image} onChange={(e) => setArticleForm({ ...articleForm, image: e.target.value })} className="w-full px-3 py-2.5 glass-input border" />
                </div>

                <div className="flex justify-end pt-3">
                  <button type="submit" className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-md shadow-emerald-500/20">
                    Publish Article to Blog
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: COMMENTS MODERATION */}
          {activeAdminSubTab === 'comments' && (
            <div className="glass-card p-6 border border-emerald-500/5 shadow-md space-y-4 fade-in">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Moderate User Comments ({comments.length})
              </h3>
              
              {comments.length > 0 ? (
                <div className="grid grid-cols-1 gap-3.5 text-xs">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-805 flex justify-between items-start">
                      <div className="space-y-1 text-left">
                        <p className="font-bold text-slate-700 dark:text-slate-200">{comment.author} <span className="text-[10px] text-slate-400 font-normal ml-1">on Article #{comment.articleId}</span></p>
                        <p className="text-slate-500 dark:text-slate-400 leading-normal">{comment.text}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="px-2.5 py-1.5 rounded-lg border border-red-500/20 text-red-500 font-bold hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 font-medium">
                  No active comments logged.
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
