// NutriLife Footer Component
window.Footer = function ({ setActiveRoute }) {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-slate-950/80 border-t border-slate-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => setActiveRoute('home')}>
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                <i className="fa-solid fa-leaf text-lg"></i>
              </div>
              <span className="ml-3 text-xl font-bold tracking-tight text-white font-sans">
                Nutri<span className="text-emerald-500">Life</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              NutriLife is a premium, AI-powered health and wellness platform dedicated to promoting longevity, diet-planning clarity, disease prevention, and daily mindfulness.
            </p>
            <div className="flex space-x-3.5 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-sm transition-all"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-sm transition-all"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-sm transition-all"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-sm transition-all"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Core Modules Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 font-sans">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => setActiveRoute('home')} className="hover:text-emerald-400 transition-colors text-slate-400 text-left">Home & Hero</button></li>
              <li><button onClick={() => setActiveRoute('encyclopedia')} className="hover:text-emerald-400 transition-colors text-slate-400 text-left">Food Encyclopedia</button></li>
              <li><button onClick={() => setActiveRoute('planner')} className="hover:text-emerald-400 transition-colors text-slate-400 text-left">AI Diet Planner</button></li>
              <li><button onClick={() => setActiveRoute('tracker')} className="hover:text-emerald-400 transition-colors text-slate-400 text-left">Habits Dashboard</button></li>
            </ul>
          </div>

          {/* Health awareness links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 font-sans">Health Literacy</h3>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => setActiveRoute('alerts')} className="hover:text-emerald-400 transition-colors text-slate-400 text-left">Obesity & Weight Care</button></li>
              <li><button onClick={() => setActiveRoute('alerts')} className="hover:text-emerald-400 transition-colors text-slate-400 text-left">Type-2 Diabetes Guide</button></li>
              <li><button onClick={() => setActiveRoute('alerts')} className="hover:text-emerald-400 transition-colors text-slate-400 text-left">Hypertension Control</button></li>
              <li><button onClick={() => setActiveRoute('blog')} className="hover:text-emerald-400 transition-colors text-slate-400 text-left">Recipes & Diet Myths</button></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 font-sans">Join the Movement</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to get weekly evidence-backed nutrition tips, seasonal recipes, and custom diet updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button type="submit" className="absolute right-1 top-1 bottom-1 px-3.5 bg-emerald-500 text-slate-900 rounded-lg text-xs font-bold hover:bg-emerald-400 transition-all">
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-emerald-400 font-semibold animate-pulse flex items-center">
                  <i className="fa-solid fa-circle-check mr-1 text-xs"></i> Subscription successful! Check your inbox.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800 text-center flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-sans gap-4">
          <p>© 2026 NutriLife Health-Tech Inc. All rights reserved. Created with wellness, science, and AI.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Medical Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
