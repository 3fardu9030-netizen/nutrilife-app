// NutriLife AI Nutrition Assistant Widget Component
window.Chat = function () {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { id: 1, sender: 'bot', text: "Hello! I am your personalized NutriLife AI wellness assistant. Ask me anything about recipes, calorie deficit targets, hydration rules, or disease prevention!", timestamp: "12:00 PM" }
  ]);
  const [inputText, setInputText] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const messagesEndRef = React.useRef(null);

  // Auto scroll
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Append user message
    const userMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      // POST to our Python mock backend
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();

      const botMsg = {
        id: messages.length + 2,
        sender: 'bot',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
      const errorMsg = {
        id: messages.length + 2,
        sender: 'bot',
        text: "Apologies, I encountered a brief digest issue connecting to my nutrition database. Let's try that again!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const suggestedQuestions = [
    "What should I eat for breakfast?",
    "How much water do I need daily?",
    "How do I manage my sugar levels?",
    "Tell me a healthy quinoa recipe"
  ];

  return (
    <>
      {/* 1. FLOATING CHAT BUTTON (Bottom Right) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Open AI Nutrition Coach"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all focus:outline-none"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark text-xl"></i>
        ) : (
          <i className="fa-solid fa-comment-dots text-xl animate-pulse"></i>
        )}
      </button>

      {/* 2. CHAT OVERLAY WINDOW */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-[380px] h-[520px] rounded-3xl glass-card border border-emerald-500/10 shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white flex items-center space-x-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
              <i className="fa-solid fa-leaf text-lg animate-pulse text-white"></i>
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold tracking-tight">AI Nutrition Assistant</h3>
              <p className="text-[10px] text-emerald-100 font-semibold flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-ping"></span> Online | Gemini Powered
              </p>
            </div>
          </div>

          {/* Messages log */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/20 scrollbar-none">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div key={msg.id} className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start gap-2.5`}>
                  {isBot && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <i className="fa-solid fa-leaf text-[10px]"></i>
                    </div>
                  )}
                  <div className="flex flex-col space-y-1 max-w-[80%]">
                    <div className={`px-4 py-2.5 rounded-2xl text-xs font-sans leading-relaxed text-left ${
                      isBot
                        ? 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 text-slate-800 dark:text-slate-100'
                        : 'bg-emerald-500 text-white shadow-md shadow-emerald-500/15'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-400 font-semibold px-2 text-left">{msg.timestamp}</span>
                  </div>
                </div>
              );
            })}

            {/* Typing Loader animation */}
            {loading && (
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-leaf text-[10px] animate-spin"></i>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Quick suggestions footer */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-850 shrink-0 bg-white/50 dark:bg-slate-900/50 flex space-x-1.5 overflow-x-auto scrollbar-none">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/5 text-[10px] font-bold whitespace-nowrap transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat input form */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Ask about healthy recipes or diet timings..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-grow px-3 py-2.5 glass-input border border-slate-200 dark:border-slate-800 text-xs"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading}
              className="w-9 h-9 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0"
            >
              <i className="fa-solid fa-paper-plane text-xs"></i>
            </button>
          </div>

        </div>
      )}
    </>
  );
};
