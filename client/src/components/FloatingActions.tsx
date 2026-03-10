import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ChevronUp, X, Send, Bot, Loader2, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP_NUMBER = "8801714061016";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const quickPrompts = [
  { en: "What services do you offer?", bn: "আপনারা কী কী সার্ভিস দেন?" },
  { en: "How much does video production cost?", bn: "ভিডিও প্রোডাকশনের খরচ কত?" },
  { en: "How can I contact you?", bn: "আপনাদের সাথে যোগাযোগ করব কীভাবে?" },
  { en: "Tell me about your portfolio", bn: "আপনাদের পোর্টফোলিও সম্পর্কে বলুন" },
];

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      data-testid="button-scroll-top"
      className="w-11 h-11 rounded-full flex items-center justify-center relative overflow-hidden group"
      style={{
        background: "linear-gradient(135deg, #06b6d4, #0891b2)",
        boxShadow: "0 4px 20px rgba(6,182,212,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
      }}
      aria-label="Scroll to top"
    >
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200 rounded-full" />
      <ChevronUp className="w-5 h-5 text-white relative z-10 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </motion.button>
  );
}

export function FloatingActions() {
  const { language } = useLanguage();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: language === 'bn'
        ? "হ্যালো! আমি Creavix AI Assistant। আপনাকে কীভাবে সাহায্য করতে পারি?"
        : "Hello! I'm the Creavix AI Assistant. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMutation = useMutation({
    mutationFn: (message: string) =>
      apiRequest("/api/chat", { method: "POST", body: JSON.stringify({ message }) })
        .then(r => r.json()) as Promise<{ reply: string }>,
    onSuccess: (data) => {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "assistant", text: data.reply }]);
    },
    onError: () => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        text: language === 'bn'
          ? "দুঃখিত, এখন উত্তর দিতে পারছি না। সরাসরি যোগাযোগ করুন: +8801714-061016"
          : "Sorry, I couldn't respond right now. Please contact us directly at +8801714-061016"
      }]);
    }
  });

  const sendMessage = (text: string) => {
    if (!text.trim() || chatMutation.isPending) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", text: text.trim() }]);
    setInput("");
    chatMutation.mutate(text.trim());
  };

  useEffect(() => {
    if (chatOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [chatOpen, messages]);

  return (
    <>
      {chatOpen && (
        <div
          className="fixed inset-0 z-[90]"
          onClick={() => setChatOpen(false)}
          data-testid="chat-backdrop"
        />
      )}

      <div className="fixed bottom-6 right-5 z-[100] flex flex-col items-end gap-3" data-testid="floating-actions">
        <AnimatePresence>
          <ScrollToTop key="scroll-top" />
        </AnimatePresence>

        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="button-whatsapp"
          animate={chatOpen
            ? { scale: 0.72, y: -8, opacity: 0.7 }
            : { scale: 1, y: 0, opacity: 1 }
          }
          whileHover={!chatOpen ? { scale: 1.1, y: -2 } : {}}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{
            background: chatOpen
              ? "linear-gradient(135deg, #16a34a, #15803d)"
              : "linear-gradient(135deg, #22c55e, #16a34a)",
            boxShadow: chatOpen
              ? "0 2px 8px rgba(34,197,94,0.2)"
              : "0 4px 20px rgba(34,197,94,0.45), inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
          aria-label="WhatsApp"
        >
          {!chatOpen && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-400"
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <FaWhatsapp className="w-6 h-6 text-white relative z-10" />
        </motion.a>

        <motion.button
          onClick={() => setChatOpen(v => !v)}
          data-testid="button-chat-toggle"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden group"
          style={{
            background: chatOpen
              ? "linear-gradient(135deg, #dc2626, #b91c1c)"
              : "linear-gradient(135deg, #6366f1, #4f46e5)",
            boxShadow: chatOpen
              ? "0 4px 20px rgba(220,38,38,0.5), inset 0 1px 0 rgba(255,255,255,0.15)"
              : "0 4px 24px rgba(99,102,241,0.55), inset 0 1px 0 rgba(255,255,255,0.2)"
          }}
          aria-label={chatOpen ? "Close chat" : "Open AI chat"}
        >
          {!chatOpen && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-indigo-400"
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            />
          )}
          <AnimatePresence mode="wait">
            {chatOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Bot className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-[6.5rem] right-5 z-[95] w-[90vw] sm:w-[380px] max-w-[380px]"
            data-testid="chat-popup"
          >
            <div className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "linear-gradient(170deg, #0f172a 0%, #0c1527 100%)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
                maxHeight: "min(480px, 70vh)"
              }}
            >
              <div className="px-4 py-3.5 flex items-center gap-3 border-b border-white/8 shrink-0"
                style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.15), rgba(6,182,212,0.1))" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", boxShadow: "0 4px 12px rgba(99,102,241,0.4)" }}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm leading-tight">Creavix AI Assistant</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs">{language === 'bn' ? "অনলাইন" : "Online"}</span>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0"
                style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full shrink-0 mr-2 mt-0.5 flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)" }}>
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-white rounded-br-sm"
                        : "text-white/90 rounded-bl-sm border border-white/8"
                    }`}
                      style={msg.role === "user"
                        ? { background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }
                        : { background: "rgba(255,255,255,0.04)" }
                      }>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatMutation.isPending && (
                  <div className="flex justify-start">
                    <div className="w-6 h-6 rounded-full shrink-0 mr-2 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)" }}>
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm border border-white/8 flex items-center gap-1.5"
                      style={{ background: "rgba(255,255,255,0.04)" }}>
                      {[0, 0.15, 0.3].map(d => (
                        <motion.div key={d} className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                          animate={{ y: [0, -5, 0] }} transition={{ duration: 0.8, delay: d, repeat: Infinity }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {messages.length <= 2 && !chatMutation.isPending && (
                <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
                  {quickPrompts.map((p, i) => (
                    <button key={i}
                      onClick={() => sendMessage(language === 'bn' ? p.bn : p.en)}
                      className="text-xs px-2.5 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400/60 transition-all duration-200 text-left"
                      data-testid={`chat-quick-${i}`}>
                      {language === 'bn' ? p.bn : p.en}
                    </button>
                  ))}
                </div>
              )}

              <div className="px-3 pb-3 pt-2 border-t border-white/8 shrink-0">
                <form onSubmit={e => { e.preventDefault(); sendMessage(input); }}
                  className="flex gap-2 items-center">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder={language === 'bn' ? "আপনার প্রশ্ন লিখুন..." : "Ask me anything..."}
                    data-testid="chat-input"
                    disabled={chatMutation.isPending}
                    className="flex-1 text-sm bg-white/[0.06] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all disabled:opacity-50"
                  />
                  <button type="submit" disabled={!input.trim() || chatMutation.isPending}
                    data-testid="chat-send"
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 2px 10px rgba(99,102,241,0.4)" }}>
                    {chatMutation.isPending ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
                  </button>
                </form>
                <p className="text-white/20 text-[10px] text-center mt-1.5">
                  Powered by Google Gemini AI · Creavix IT Solution
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
