// NutriLife - Core Application Container
const { useState, useEffect } = React;

function App() {
  const [activeRoute, setActiveRoute] = useState('home');
  const [user, setUser] = useState(null);
  const [habitLogs, setHabitLogs] = useState([]);
  const [customFoods, setCustomFoods] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);

  // Accessibility & System Preferences States
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('en');
  const [accessible, setAccessible] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Initializer: fetch data from python API /api/db
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/db');
        const db = await res.json();
        
        setUser(db.users[0]);
        setHabitLogs(db.habitLogs);
        setCustomFoods(db.customFoods);
        setBlogs(db.blogs);
        setComments(db.comments);

        // Prepend custom foods and blogs to window global datasets so encyclopedia and blogs see them
        if (db.customFoods && db.customFoods.length > 0) {
          db.customFoods.forEach(food => {
            if (!window.NutritionData.foods.some(f => f.id === food.id)) {
              window.NutritionData.foods.unshift(food);
            }
          });
        }
        if (db.blogs && db.blogs.length > 0) {
          db.blogs.forEach(blog => {
            if (!window.NutritionData.articles.some(a => a.id === blog.id)) {
              window.NutritionData.articles.unshift(blog);
            }
          });
        }

      } catch (err) {
        console.error("Database connection failed. Falling back to local storage...", err);
      } finally {
        // Slow down slightly to show off our gorgeous animated loader
        setTimeout(() => {
          setLoading(false);
          const loader = document.getElementById("initial-loader");
          if (loader) loader.remove();
        }, 0);
      }
    }
    loadData();
  }, []);

  // 2. Synchronization engine writeback helper to /api/save
  const dbSync = async (updates) => {
    // 1. Mutate React states immediately
    if (updates.users) setUser(updates.users[0]);
    if (updates.habitLogs) setHabitLogs(updates.habitLogs);
    if (updates.customFoods) setCustomFoods(updates.customFoods);
    if (updates.blogs) setBlogs(updates.blogs);
    if (updates.comments) setComments(updates.comments);
};

  // 3. Theme & dark class injection listener
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark-mode');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  // 4. Accessibility text resize class injection
  useEffect(() => {
    const body = document.body;
    if (accessible) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
  }, [accessible]);

  if (loading) {
    return null; // Loader handles initial display
  }

  // Router emulator
  const renderActiveRoute = () => {
    switch (activeRoute) {
      case 'home':
        return <window.Home setActiveRoute={setActiveRoute} />;
      case 'encyclopedia':
        return <window.Encyclopedia />;
      case 'planner':
        return <window.Planner user={user} dbSync={dbSync} />;
      case 'tracker':
        return <window.Tracker user={user} habitLogs={habitLogs} dbSync={dbSync} />;
      case 'schedule':
        return <window.Schedule />;
      case 'calculators':
        return <window.Calculators />;
      case 'alerts':
        return <window.Alerts />;
      case 'blog':
        return <window.Blog comments={comments} dbSync={dbSync} />;
      case 'admin':
        return <window.Admin user={user} customFoods={customFoods} blogs={blogs} comments={comments} dbSync={dbSync} />;
      default:
        return <window.Home setActiveRoute={setActiveRoute} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between ${accessible ? 'text-base-accessible' : ''}`}>
      
      {/* Dynamic sticky Navigation */}
      <window.Navbar
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
        user={user}
        theme={theme}
        setTheme={setTheme}
        lang={lang}
        setLang={setLang}
        accessible={accessible}
        setAccessible={setAccessible}
      />

      {/* Main Content Wrapper with dynamic transition */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {renderActiveRoute()}
      </main>

      {/* Premium responsive Footer */}
      <window.Footer setActiveRoute={setActiveRoute} />

      {/* AI Nutritionist Chatbot bubble */}
      <window.Chat />

    </div>
  );
}

// Mount the App
const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);
root.render(<App />);