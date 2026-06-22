// NutriLife - Core Application Container (ES MODULE VIA BABEL)


// Safe extraction of React hooks from the global window namespace
const { useState, useEffect } = window.React || React;

function App() {
  const [activeRoute, setActiveRoute] = useState("home");
  const [user, setUser] = useState(null);
  const [habitLogs, setHabitLogs] = useState([]);
  const [customFoods, setCustomFoods] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);

  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");
  const [accessible, setAccessible] = useState(false);
  const [loading, setLoading] = useState(true);

  // LOAD DATABASE
  useEffect(() => {
    async function loadData() {
      try {
        // Fetched from root folder structure relative pathing
        const response = await fetch("./data/db.json");

        if (!response.ok) {
          throw new Error("db.json not found");
        }

        const db = await response.json();

        setUser(db.users?.[0] || null);
        setHabitLogs(db.habitLogs || []);
        setCustomFoods(db.customFoods || []);
        setBlogs(db.blogs || []);
        setComments(db.comments || []);
      } catch (error) {
        console.error("Database loading failed:", error);
      } finally {
        setLoading(false);
        // Safely delaying to allow React to paint fallback or DOM nodes
        setTimeout(() => {
          const loader = document.getElementById("initial-loader");
          if (loader) {
            loader.remove();
          }
        }, 50);
      }
    }

    loadData();
  }, []);

  // DATABASE SYNC
  const dbSync = (updates) => {
    if (updates.users) {
      setUser(updates.users[0]);
    }
    if (updates.habitLogs) {
      setHabitLogs(updates.habitLogs);
    }
    if (updates.customFoods) {
      setCustomFoods(updates.customFoods);
    }
    if (updates.blogs) {
      setBlogs(updates.blogs);
    }
    if (updates.comments) {
      setComments(updates.comments);
    }
  };

  // THEME CONTROL
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // ACCESSIBILITY
  useEffect(() => {
    document.body.classList.toggle("high-contrast", accessible);
  }, [accessible]);

  if (loading) {
    return null;
  }

  // ROUTER
  const renderActiveRoute = () => {
    switch (activeRoute) {
      case "home":
        return <Home setActiveRoute={setActiveRoute} />;
      case "encyclopedia":
        return <Encyclopedia />;
      case "planner":
        return <Planner user={user} dbSync={dbSync} />;
      case "tracker":
        return <Tracker user={user} habitLogs={habitLogs} dbSync={dbSync} />;
      case "schedule":
        return <Schedule />;
      case "calculators":
        return <Calculators />;
      case "alerts":
        return <Alerts />;
      case "blog":
        return <Blog comments={comments} dbSync={dbSync} />;
      case "admin":
        return (
          <Admin
            user={user}
            customFoods={customFoods}
            blogs={blogs}
            comments={comments}
            dbSync={dbSync}
          />
        );
      default:
        return <Home setActiveRoute={setActiveRoute} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      <Navbar
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

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8">
        {renderActiveRoute()}
      </main>

      <Footer setActiveRoute={setActiveRoute} />

      <Chat />
    </div>
  );
}

// Render Application to DOM with Window Namespace Verification
const container = document.getElementById("root");
if (container) {
  const mountRoot = window.ReactDOM?.createRoot ? window.ReactDOM.createRoot(container) : ReactDOM.createRoot(container);
  mountRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}