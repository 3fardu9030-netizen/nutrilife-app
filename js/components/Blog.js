// NutriLife Blogs, Recipes, & Myths Component
window.Blog = function ({ comments, dbSync }) {
  const [activeBlogTab, setActiveBlogTab] = React.useState('articles');
  const [selectedArticle, setSelectedArticle] = React.useState(null);
  const [commentText, setCommentText] = React.useState('');
  
  const articles = window.NutritionData.articles;
  const myths = window.NutritionData.myths;

  // Filter comments for active article
  const activeComments = React.useMemo(() => {
    if (!selectedArticle) return [];
    return comments.filter(c => c.articleId === selectedArticle.id);
  }, [comments, selectedArticle]);

  // Comment submit
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText || !selectedArticle) return;

    const newComment = {
      id: comments.length + 1,
      articleId: selectedArticle.id,
      author: "Alex Mercer (You)",
      text: commentText,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedComments = [...comments, newComment];
    dbSync({ comments: updatedComments });
    setCommentText('');
  };

  // Recipes mock database
  const healthyRecipes = [
    {
      id: "quinoa-buddha",
      title: "Superfood Quinoa Buddha Bowl",
      prep: "15 mins",
      cook: "20 mins",
      calories: 420,
      protein: 15,
      carbs: 58,
      fat: 14,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
      ingredients: [
        "1 cup organic white or red quinoa (rinsed)",
        "1 cup organic fresh baby spinach leaves",
        "1/2 cup canned chickpeas (rinsed and drained)",
        "1/2 medium ripe avocado (sliced)",
        "1/2 cup broccoli florets (steamed)",
        "2 tablespoons lemon-tahini dressing (tahini, fresh lemon juice, water, garlic powder)"
      ],
      directions: [
        "Cook quinoa in a medium pot with 2 cups of water. Bring to a boil, then cover and simmer for 15 minutes.",
        "Steam broccoli florets in a basket for 5 minutes until tender-crisp.",
        "Prepare the dressing by whisking tahini paste, warm water, lemon juice, and a pinch of garlic powder in a small bowl until smooth.",
        "Assemble the bowl: base of cooked quinoa, topped with fresh spinach leaves, drained chickpeas, steamed broccoli, and avocado slices.",
        "Drizzle dressing over the bowl right before serving. Season with a pinch of black pepper if desired."
      ]
    },
    {
      id: "salmon-asparagus",
      title: "Garlic Herb Roasted Salmon & Asparagus",
      prep: "10 mins",
      cook: "15 mins",
      calories: 380,
      protein: 34,
      carbs: 8,
      fat: 22,
      image: "https://images.unsplash.com/photo-1485921325814-a534d0261f77?auto=format&fit=crop&q=80&w=600",
      ingredients: [
        "150g wild salmon fillet (skin-on)",
        "1 bunch fresh asparagus spears (woody ends snapped off)",
        "1 tablespoon extra virgin olive oil",
        "2 cloves garlic (finely minced)",
        "1/2 fresh lemon (sliced)",
        "1 teaspoon dried oregano and rosemary leaves"
      ],
      directions: [
        "Preheat your oven to 400°F (200°C) and line a baking sheet with parchment paper.",
        "Arrange the salmon fillet and trimmed asparagus spears side-by-side on the baking sheet.",
        "Drizzle both with olive oil, rub with minced garlic, and dust with rosemary, oregano, and black pepper.",
        "Top the salmon fillet with fresh lemon slices to lock in moisture during cooking.",
        "Roast in the preheated oven for 12 to 15 minutes until the salmon flakes easily with a fork and asparagus is tender."
      ]
    }
  ];

  return (
    <div className="space-y-8 page-transition">
      
      {!selectedArticle ? (
        // LIST VIEWS
        <>
          {/* Header */}
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white font-sans">
                Wellness Blog & Myth Busters
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Read scientific articles, try delicious nutrient-dense recipes, and debunk common diet myths with evidence-based facts.
              </p>
            </div>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveBlogTab('articles')}
              className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 ${
                activeBlogTab === 'articles' ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-slate-455 hover:text-emerald-500'
              }`}
            >
              📰 Science Articles
            </button>
            <button
              onClick={() => setActiveBlogTab('recipes')}
              className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 ${
                activeBlogTab === 'recipes' ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-slate-455 hover:text-emerald-500'
              }`}
            >
              🥗 Healthy Recipes
            </button>
            <button
              onClick={() => setActiveBlogTab('myths')}
              className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 ${
                activeBlogTab === 'myths' ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-slate-455 hover:text-emerald-500'
              }`}
            >
              💡 Myths vs Facts
            </button>
          </div>

          {/* TAB 1: ARTICLES VIEW */}
          {activeBlogTab === 'articles' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in">
              {articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="glass-card overflow-hidden hover:scale-[1.01] border border-slate-200/5 transition-all duration-300 cursor-pointer shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 w-full bg-slate-100 dark:bg-slate-950 overflow-hidden relative">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg bg-emerald-500 text-white text-[9px] font-extrabold uppercase tracking-wide">
                        {article.category}
                      </span>
                    </div>
                    
                    <div className="p-5 space-y-2">
                      <p className="text-[10px] text-slate-400 font-bold">{article.date} | {article.readTime}</p>
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2">{article.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mt-1">{article.excerpt}</p>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-bold text-emerald-500 flex items-center justify-between">
                    <span>By {article.author.split(' (')[0]}</span>
                    <span>Read Article →</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: RECIPES VIEW */}
          {activeBlogTab === 'recipes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">
              {healthyRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="glass-card overflow-hidden border border-slate-200/5 shadow-sm grid grid-cols-1 sm:grid-cols-2"
                >
                  <div className="h-full min-h-[220px] bg-slate-100 dark:bg-slate-950">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                        <span>⏱️ {recipe.prep} Prep</span>
                        <span>🔥 {recipe.calories} kcal</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-850 dark:text-slate-100 leading-snug">{recipe.title}</h3>
                      
                      <div className="flex space-x-2 text-[10px] font-extrabold uppercase">
                        <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">P: {recipe.protein}g</span>
                        <span className="text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">C: {recipe.carbs}g</span>
                        <span className="text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">F: {recipe.fat}g</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] text-slate-450 font-bold uppercase">Ingredients Summary</p>
                      <p className="text-[11px] text-slate-550 dark:text-slate-400 line-clamp-3 leading-normal">
                        {recipe.ingredients.join(', ')}
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`Full instructions: \n\n${recipe.directions.map((d, i) => `${i+1}. ${d}`).join('\n\n')}`)}
                      className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/10 transition-all"
                    >
                      View Full Instructions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: MYTHS VS FACTS ACCORDION */}
          {activeBlogTab === 'myths' && (
            <div className="max-w-3xl mx-auto space-y-4 fade-in">
              {myths.map((item, i) => {
                const [isOpen, setIsOpen] = React.useState(i === 0);
                return (
                  <div key={i} className="glass-card border border-slate-200/5 overflow-hidden shadow-sm">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full p-5 text-left font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between text-sm sm:text-base"
                    >
                      <span className="flex items-center">
                        <i className="fa-solid fa-circle-question text-red-500 mr-3 text-lg shrink-0"></i>
                        <span>Myth: "{item.myth}"</span>
                      </span>
                      <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} text-slate-400 text-sm`}></i>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-850 text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed space-y-2.5">
                        <p className="font-bold text-emerald-500 flex items-center">
                          <i className="fa-solid fa-circle-check mr-2 text-base"></i> Science-Backed Fact:
                        </p>
                        <p className="font-medium pl-6">{item.fact}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        // SINGLE ARTICLE DETAILED VIEW
        <div className="max-w-3xl mx-auto space-y-6 fade-in">
          {/* Back button */}
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i> Back to articles list
          </button>

          {/* Cover image */}
          <div className="h-64 sm:h-80 w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-950 shadow-md">
            <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
          </div>

          {/* Heading info */}
          <div className="space-y-3.5 text-left border-b border-slate-100 dark:border-slate-800/80 pb-6">
            <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wide">
              {selectedArticle.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-850 dark:text-white leading-tight font-sans">
              {selectedArticle.title}
            </h1>
            <div className="flex items-center space-x-3 text-xs text-slate-400 font-semibold">
              <span>✍️ {selectedArticle.author}</span>
              <span>•</span>
              <span>📅 {selectedArticle.date}</span>
              <span>•</span>
              <span>⏱️ {selectedArticle.readTime}</span>
            </div>
          </div>

          {/* Article Markdown Transpiled Simulation */}
          <div
            className="text-sm leading-relaxed text-slate-650 dark:text-slate-300 font-sans space-y-4 text-left font-sans"
            dangerouslySetInnerHTML={{
              __html: selectedArticle.content
                .replace(/\n\n/g, '<br/><br/>')
                .replace(/### (.*?)\n/g, '<h3 class="text-base font-extrabold text-slate-850 dark:text-white mt-4">$1</h3>')
                .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-extrabold text-emerald-500">$1</strong>')
                .replace(/^\* (.*?)$/gm, '<li class="list-disc pl-5">$1</li>')
            }}
          />

          {/* 4. COMMENTS SECTION ENGINE */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 space-y-6">
            <h3 className="text-lg font-bold text-slate-850 dark:text-white text-left">
              Discussion ({activeComments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <textarea
                rows="3"
                required
                placeholder="Share your thoughts or ask a nutrition question..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-4 py-3 glass-input border text-xs"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  Post Comment
                </button>
              </div>
            </form>

            {/* Comments List */}
            {activeComments.length > 0 ? (
              <div className="space-y-4">
                {activeComments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 text-left">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-205">{comment.author}</p>
                      <span className="text-[10px] text-slate-400 font-bold">{comment.date}</span>
                    </div>
                    <p className="text-xs text-slate-550 dark:text-slate-400 leading-normal mt-1.5">{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center italic">Be the first to share your thoughts on this guide!</p>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
