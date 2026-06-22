// NutriLife Blogs, Recipes, & Myths Component (ES MODULE VIA BABEL)

 function Blog({ comments = [], dbSync }) {
  const [activeBlogTab, setActiveBlogTab] = React.useState("articles");
  const [selectedArticle, setSelectedArticle] = React.useState(null);
  const [commentText, setCommentText] = React.useState("");

  // Robust default structural data fallback maps for clean loading
  const articles = window.NutritionData?.articles || [
    {
      id: 1,
      title: "Understanding Macronutrients & Bio-Availability",
      excerpt: "Deep dive into metabolic protein utilization, complex carbs, and clean cellular lipids.",
      content: "Macronutrients are the foundational building blocks of nutritional physiology. Each macro plays a distinct role in keeping your metabolism running efficiently.\n\nProteins provide raw structural amino acids, complex carbohydrates regulate long-term stable glycogen stores, and healthy fats form cellular walls while helping synthesize crucial vitamins.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
    }
  ];

  const myths = window.NutritionData?.myths || [
    {
      myth: "Carbohydrates inherently cause fat storage and should be eliminated.",
      fact: "Carbs are your system's primary and most efficient energy source. Excessive refined sugars cause erratic insulin spikes, but complex carbohydrates supply sustained energy and dietary fiber."
    }
  ];

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
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
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
      image: "https://images.unsplash.com/photo-1485921325814-a534d0261f77"
    }
  ];

  const activeComments = React.useMemo(() => {
    if (!selectedArticle || !comments) return [];
    return comments.filter(c => c.articleId === selectedArticle.id);
  }, [comments, selectedArticle]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedArticle) return;

    const newComment = {
      id: comments.length + 1,
      articleId: selectedArticle.id,
      author: "Alex Mercer (You)",
      text: commentText.trim(),
      date: new Date().toISOString().split("T")[0]
    };

    dbSync({
      comments: [...comments, newComment]
    });
    setCommentText("");
  };

  return (
    <div className="space-y-8 page-transition">
      {!selectedArticle ? (
        <>
          {/* TOP EXPLAINER CONTAINER HEADER */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-book-open text-emerald-500"></i> Wellness Hub & Myth Busters
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Explore evidence-based science articles, macro-balanced recipes, and metabolic truth guides.
            </p>
          </div>

          {/* DYNAMIC TAB CONTROLS SELECTOR */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2">
            {[
              { id: "articles", label: "📰 Science Articles" },
              { id: "recipes", label: "🥗 Healthy Recipes" },
              { id: "myths", label: "💡 Myths vs Facts" }
            ].map(tab => {
              const active = activeBlogTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveBlogTab(tab.id)}
                  className={`px-5 py-3 font-bold text-sm border-b-2 transition -mb-px ${
                    active
                      ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                      : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ARTICLES ACTIVE CORE FRAME */}
          {activeBlogTab === "articles" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="cursor-pointer rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-emerald-500 transition">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* RECIPES SUBSYSTEM LAYOUT */}
          {activeBlogTab === "recipes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {healthyRecipes.map(recipe => (
                <div key={recipe.id} className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">{recipe.title}</h3>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span>🔥 {recipe.calories} kcal</span>
                      <span>💪 P: {recipe.protein}g</span>
                      <span>🌾 C: {recipe.carbs}g</span>
                      <span>🥑 F: {recipe.fat}g</span>
                    </div>

                    <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400 border-t dark:border-slate-800">
                      <span><i className="fa-regular fa-clock"></i> Prep: {recipe.prep}</span>
                      <span><i className="fa-solid fa-fire-burner"></i> Cook: {recipe.cook}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MYTH BUSTER CARD TRACKS */}
          {activeBlogTab === "myths" && (
            <div className="space-y-4">
              {myths.map((item, index) => (
                <div key={index} className="border border-slate-100 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-900 shadow-sm space-y-2">
                  <h3 className="font-bold text-slate-800 dark:text-white flex items-start gap-2 text-base">
                    <span className="text-red-500 shrink-0">❓ Myth:</span> {item.myth}
                  </h3>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 pl-7 font-medium flex items-start gap-2">
                    <span className="shrink-0">✔ Fact:</span> {item.fact}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* SINGLE ARTICLE FULL DETAILED BLOB CONTAINER ENGINE */
        <div className="space-y-6 max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-emerald-500 dark:text-emerald-400 font-bold flex items-center gap-1.5 hover:underline text-sm"
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Hub
          </button>

          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            className="w-full h-80 object-cover rounded-2xl shadow-sm"
          />

          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            {selectedArticle.title}
          </h1>

          <div
            className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-4"
            dangerouslySetInnerHTML={{
              __html: selectedArticle.content?.replace(/\n\n/g, "<br/><br/>")
            }}
          />

          {/* COMMENTS PANEL SUBSTRUCTURE */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Discussion ({activeComments.length})
            </h2>

            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Share your perspective or query..."
                rows="3"
                className="w-full border dark:border-slate-800 p-3 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm"
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-5 py-2 rounded-xl transition shadow-sm">
                Post Comment
              </button>
            </form>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {activeComments.map(comment => (
                <div key={comment.id} className="border dark:border-slate-800 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <b className="text-sm text-slate-800 dark:text-slate-200">{comment.author}</b>
                    <span className="text-[10px] text-slate-400">{comment.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}