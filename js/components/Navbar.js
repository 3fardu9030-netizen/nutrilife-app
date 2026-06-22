
// NutriLife Header/Navbar Component (ES MODULE VIA BABEL)

 function Navbar({
  activeRoute,
  setActiveRoute,
  user,
  theme,
  setTheme,
  lang,
  setLang,
  accessible,
  setAccessible
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: "fa-house" },
    { id: "encyclopedia", label: "Encyclopedia", icon: "fa-book-open" },
    { id: "planner", label: "AI Planner", icon: "fa-wand-magic-sparkles" },
    { id: "tracker", label: "Tracker", icon: "fa-chart-line" },
    { id: "schedule", label: "Schedule", icon: "fa-calendar-days" },
    { id: "calculators", label: "Calculators", icon: "fa-calculator" },
    { id: "alerts", label: "Health Alerts", icon: "fa-triangle-exclamation" },
    { id: "blog", label: "Blog & Recipes", icon: "fa-newspaper" }
  ];

  if (user && user.role === "admin") {
    navItems.push({
      id: "admin",
      label: "Admin",
      icon: "fa-user-shield"
    });
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleAccessibility = () => {
    setAccessible(!accessible);
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-nav border-b border-slate-200/60 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* BRAND NAV LOGO METRIC BLOCK */}
          <div
            onClick={() => setActiveRoute("home")}
            className="flex items-center cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm shadow-emerald-500/20">
              <i className="fa-solid fa-leaf text-base"></i>
            </div>
            <span className="ml-2.5 text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Nutri<span className="text-emerald-500 group-hover:text-emerald-400 transition-colors">Life</span>
            </span>
          </div>

          {/* DESKTOP VIEWPORTS HORIZONTAL NAVIGATION ROW */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map(item => {
              const active = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveRoute(item.id)}
                  className={`flex items-center px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  <i className={`fa-solid ${item.icon} mr-1.5 text-[11px]`}></i>
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* UTILITY CONTROL ACTIONS BUTTON STRIP */}
          <div className="hidden lg:flex items-center gap-2.5">
            
            {/* ACCESSIBILITY TOGGLE LAYER */}
            <button
              onClick={toggleAccessibility}
              className={`p-2 rounded-xl border transition-all text-xs ${
                accessible
                  ? "bg-blue-500 border-blue-500 text-white shadow-sm"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
              }`}
              title="Toggle Accessibility Vision Aids"
            >
              <i className="fa-solid fa-eye text-sm"></i>
            </button>

            {/* THEME CONTROL TRIGGER */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 transition-all"
              title="Toggle Screen Theme Modality"
            >
              <i className={`fa-solid ${theme === "light" ? "fa-moon" : "fa-sun"} text-sm`}></i>
            </button>

            {/* LOCALIZED LANGUAGE SELECTOR DROPDOWN TRAY */}
            <div className="relative group">
              <button className="border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-xl px-3 py-2 text-xs font-bold bg-white dark:bg-slate-900 shadow-sm flex items-center gap-1">
                <span>🌐 {lang.toUpperCase()}</span>
                <i className="fa-solid fa-chevron-down text-[9px] text-slate-400"></i>
              </button>

              <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl p-1.5 min-w-[110px] animate-fade-in">
                {[
                  { key: "en", name: "English" },
                  { key: "es", name: "Español" },
                  { key: "fr", name: "Français" }
                ].map(l => (
                  <button
                    key={l.key}
                    onClick={() => setLang(l.key)}
                    className={`block w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                      lang === l.key
                        ? "bg-emerald-500 text-white"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            {/* AVATAR IDENTITY COMPONENT OR DEFAULT CTA BOX */}
            {user ? (
              <div className="flex items-center gap-2 pl-1">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-black text-xs shadow-sm shadow-emerald-500/10">
                  {user.name
                    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase()
                    : "U"}
                </div>
              </div>
            ) : (
              <button className="bg-emerald-500 hover:bg-emerald-600 transition text-slate-900 font-extrabold px-4 py-2 rounded-xl text-xs shadow-sm">
                Login
              </button>
            )}
          </div>

          {/* MOBILE VIEW NAVIGATION CONTAINER STRIP */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="text-slate-500 dark:text-slate-400 p-1"
              aria-label="Toggle Theme Modality"
            >
              <i className={`fa-solid ${theme === "light" ? "fa-moon text-lg" : "fa-sun text-lg"}`}></i>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 dark:text-slate-300 p-1"
              aria-label="Toggle Navigation Tray Menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark text-xl" : "fa-bars text-xl"}`}></i>
            </button>
          </div>

        </div>
      </div>

      {/* DROPDOWN SYSTEM DRAWER FOR RESPONSIVE SMALL SCREENS */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 space-y-1 shadow-inner animate-fade-in">
          {navItems.map(item => {
            const active = activeRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveRoute(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full text-left p-3 rounded-xl text-xs font-bold transition ${
                  active
                    ? "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
              >
                <i className={`fa-solid ${item.icon} mr-3 text-sm w-4 text-center`}></i>
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}