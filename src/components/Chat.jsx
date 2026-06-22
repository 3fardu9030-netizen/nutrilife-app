// src/components/Chat.jsx
import React, { useState, useEffect, useRef } from "react";

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I am your personalized NutriLife AI wellness assistant. Ask me anything about recipes, calorie targets, hydration rules, or disease prevention!",
      timestamp: "12:00 PM"
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    // ✅ Corrected: Safely extract current context and evaluate against trimmed variations
    const text = textToSend || inputText;
    if (!text || !text.trim() || loading) return;

    const currentText = text.trim();

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: currentText,
      timestamp: timestamp
    };

    // Clean out text inputs immediately to prevent double submissions
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: currentText })
      });

      if (!response.ok) {
        throw new Error("Server infrastructure response mismatch");
      }

      const data = await response.json();

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.reply || "Sorry, I could not understand that.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("AI Communication Failure:", error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Sorry, I am having trouble connecting to the nutrition database.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Corrected: Added structural loading and emptiness checks to prevent enter-key spamming
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading && inputText.trim()) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What should I eat for breakfast?",
    "How much water do I need daily?",
    "How do I manage my sugar levels?",
    "Tell me a healthy quinoa recipe"
  ];

  return (
    <>
      {/* TRIGGER FLOATING BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl transition-transform active:scale-95"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark text-lg"></i>
        ) : (
          <i className="fa-solid fa-comment-dots text-lg"></i>
        )}
      </button>

      {/* CHAT CONTAINER PANEL */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-[380px] h-[520px] rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden page-transition">
          {/* HEADER FRAME */}
          <div className="p-4 bg-emerald-500 text-white flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <i className="fa-solid fa-leaf text-base"></i>
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">AI Nutrition Assistant</h3>
              <p className="text-[11px] opacity-90 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span> Online | Expert Layer
              </p>
            </div>
          </div>

          {/* MESSAGE SCREEN TRACK */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "bot"
                      ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700/50 rounded-tl-none"
                      : "bg-emerald-500 text-white rounded-tr-none shadow-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`block text-[9px] mt-1 text-right ${msg.sender === "bot" ? "text-slate-400" : "text-emerald-100"}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 text-slate-400 text-xs px-4 py-2.5 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700/50 flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-notch animate-spin text-emerald-500"></i> NutriLife is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* QUICK SUGGESTIONS CONTAINER */}
          <div className="p-2 border-t dark:border-slate-800 flex gap-2 overflow-x-auto bg-white dark:bg-slate-900 whitespace-nowrap invisible-scrollbar">
            {suggestedQuestions.map((q, index) => (
              <button
                key={index}
                disabled={loading}
                onClick={() => handleSendMessage(q)}
                className="text-[11px] border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-xl px-3 py-1.5 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition shrink-0 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* INPUT FORM TOOL BAR */}
          <div className="p-3 border-t dark:border-slate-800 flex gap-2 bg-white dark:bg-slate-900">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about calories, hydration..."
              className="flex-grow border dark:border-slate-800 rounded-xl px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              disabled={loading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputText.trim()}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 w-10 rounded-xl flex items-center justify-center transition shadow-sm"
            >
              <i className="fa-solid fa-paper-plane text-xs"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;