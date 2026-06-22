// NutriLife Footer Component (ES MODULE VIA BABEL)

 function Footer({ setActiveRoute }) {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email.trim()) {
      setSubscribed(true);
      setEmail("");

      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      {/* GLOBAL FOOTER WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* BRAND IDENTITY BLOCK */}
        <div className="space-y-4">
          <div
            onClick={() => setActiveRoute("home")}
            className="flex items-center cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <i className="fa-solid fa-leaf text-sm"></i>
            </div>
            <span className="ml-3 text-xl font-bold text-white tracking-wide">
              Nutri<span className="text-emerald-500 group-hover:text-emerald-400 transition-colors">Life</span>
            </span>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed">
            NutriLife is an AI-powered wellness platform focused on nutrition planning, healthy habits, disease prevention, and lifestyle improvement.
          </p>

          <div className="flex gap-3 pt-1">
            {["facebook-f", "twitter", "instagram", "linkedin-in"].map(icon => (
              <a
                key={icon}
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-500 transition"
                aria-label={`Follow us on ${icon}`}
              >
                <i className={`fa-brands fa-${icon} text-xs`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* CORE APPLICATION QUICK LINKS */}
        <div className="space-y-4">
          <h3 className="font-bold uppercase text-xs tracking-wider text-white">
            Quick Navigation
          </h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { id: "home", label: "Home Overview" },
              { id: "encyclopedia", label: "Food Encyclopedia" },
              { id: "planner", label: "AI Diet Planner" },
              { id: "tracker", label: "Habit Tracker" }
            ].map(link => (
              <li key={link.id}>
                <button
                  onClick={() => setActiveRoute(link.id)}
                  className="text-slate-400 hover:text-emerald-400 text-left transition-colors focus:outline-none"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* HEALTH EDUCATION QUICK ROUTERS */}
        <div className="space-y-4">
          <h3 className="font-bold uppercase text-xs tracking-wider text-white">
            Health Literacy
          </h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { id: "alerts", label: "Disease Prevention" },
              { id: "alerts", label: "Diabetes Guide" },
              { id: "alerts", label: "Weight Management" },
              { id: "blog", label: "Recipes & Blogs" }
            ].map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => setActiveRoute(link.id)}
                  className="text-slate-400 hover:text-emerald-400 text-left transition-colors focus:outline-none"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* SUBSCRIPTION PIPELINE FIELD */}
        <div className="space-y-4">
          <div>
            <h3 className="font-bold uppercase text-xs tracking-wider text-white">
              Join the Movement
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Get weekly nutrition tips and wellness updates delivered directly.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex shadow-sm">
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-l-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-500"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 transition px-4 rounded-r-xl text-slate-900 font-bold text-sm shrink-0"
              >
                Join
              </button>
            </div>

            {subscribed && (
              <p className="text-emerald-400 text-xs font-medium flex items-center gap-1 animate-fade-in">
                <i className="fa-solid fa-circle-check"></i> Subscription successful!
              </p>
            )}
          </form>
        </div>

      </div>

      {/* COPYRIGHT CLOSURE STRIP */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800/60 text-center text-xs text-slate-500">
        <p>© 2026 NutriLife Health-Tech Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}