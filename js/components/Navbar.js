// NutriLife Header/Navbar Component
window.Navbar = function ({ activeRoute, setActiveRoute, user, theme, setTheme, lang, setLang, accessible, setAccessible }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'fa-house' },
    { id: 'encyclopedia', label: 'Encyclopedia', icon: 'fa-book-open' },
    { id: 'planner', label: 'AI Planner', icon: 'fa-wand-magic-sparkles' },
    { id: 'tracker', label: 'Tracker', icon: 'fa-chart-line' },
    { id: 'schedule', label: 'Schedule', icon: 'fa-calendar-days' },
    { id: 'calculators', label: 'Calculators', icon: 'fa-calculator' },
    { id: 'alerts', label: 'Health Alerts', icon: 'fa-triangle-exclamation' },
    { id: 'blog', label: 'Blog & Recipes', icon: 'fa-newspaper' },
  ];

  if (user && user.role === 'admin') {
    navItems.push({ id: 'admin', label: 'Admin', icon: 'fa-user-shield' });
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleAccessibility = () => {
    setAccessible(!accessible);
  };

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 glass-nav border-b border-emerald-100/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center cursor-pointer" onClick={() => setActiveRoute('home')}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:scale-105 transition-transform">
              <i className="fa-solid fa-leaf text-xl"></i>
            </div>
            <span className="ml-3 text-2xl font-bold tracking-tight text-slate-800 dark:text-white font-sans flex items-center">
              Nutri<span className="text-emerald-500">Life</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveRoute(item.id)}
                  className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:bg-emerald-500/5'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} mr-1.5 text-xs`}></i>
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Actions: Theme Toggle, Accessibility, Language, Profile */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Accessibility Toggle */}
            <button
              onClick={toggleAccessibility}
              title="Toggle Large Fonts & Accessibility"
              className={`p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/5 transition-all ${
                accessible ? 'bg-emerald-500/20 border-emerald-500' : ''
              }`}
            >
              <i className="fa-solid fa-eye text-sm"></i>
            </button>

            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-1 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500/5 transition-all">
                <i className="fa-solid fa-globe text-sm text-slate-400"></i>
                <span className="text-xs font-semibold uppercase">{lang}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1.5">
                <button onClick={() => setLang('en')} className="w-full text-left px-4 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10">English (EN)</button>
                <button onClick={() => setLang('es')} className="w-full text-left px-4 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10">Español (ES)</button>
                <button onClick={() => setLang('fr')} className="w-full text-left px-4 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10">Français (FR)</button>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/5 transition-all"
            >
              <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-sm`}></i>
            </button>

            {/* User Profile Hook */}
            {user ? (
              <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-inner shadow-emerald-700">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="hidden xl:block text-left">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{user.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">🔥 {user.streak} Days Streak</p>
                </div>
              </div>
            ) : (
              <button className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/25 transition-all">
                Login
              </button>
            )}
          </div>

          {/* Mobile Hamburguer Menu Trigger */}
          <div className="flex items-center lg:hidden space-x-2">
            {/* Quick Theme toggle for mobile */}
            <button onClick={toggleTheme} className="p-2 text-slate-500 dark:text-slate-400">
              <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-sm`}></i>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-500/5 transition-all"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full px-4 pt-2 pb-4 bg-white/95 dark:bg-slate-950/95 border-b border-slate-100 dark:border-slate-900 transition-all duration-300">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveRoute(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-emerald-500 bg-emerald-500/10'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-emerald-500/5'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} mr-3 text-sm`}></i>
                  {item.label}
                </button>
              );
            })}
            
            {/* Mobile Actions summary */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between px-4">
              <button
                onClick={toggleAccessibility}
                className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400"
              >
                <i className="fa-solid fa-eye text-sm text-emerald-500"></i>
                <span>Accessibility Mode</span>
              </button>

              {user && (
                <div className="flex items-center space-x-2 text-left">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                    AM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{user.name}</p>
                    <p className="text-[9px] text-emerald-500 font-bold">🔥 {user.streak} Streak</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
