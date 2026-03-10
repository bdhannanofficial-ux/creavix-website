import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ChevronUp, X, Send, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP_NUMBER = "8801714061016";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const BENGALI_FONT = "'Hind Siliguri', 'DM Sans', sans-serif";

function MessengerIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28 3C14.19 3 3 13.4 3 26.3c0 7.54 3.77 14.26 9.67 18.67.44.32.71.82.72 1.36l.15 4.27a1.72 1.72 0 0 0 2.41 1.51l4.76-2.1a1.72 1.72 0 0 1 1.15-.08 27.55 27.55 0 0 0 6.14.64C41.81 50.57 53 40.17 53 27.27 53 14.37 41.81 3 28 3z"
        fill="url(#msng_grad)"
      />
      <path
        d="M14.8 33.8 22.7 21.6a2.58 2.58 0 0 1 4.06-.43l6.22 6.22 6.14-4.68a1.93 1.93 0 0 1 2.8 2.54L33.9 37.4l-7.38-7.38-2.59 1.97L14.8 33.8z"
        fill="white"
      />
      <defs>
        <linearGradient id="msng_grad" x1="3" y1="28" x2="53" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0084FF" />
          <stop offset="0.5" stopColor="#A033FF" />
          <stop offset="1" stopColor="#FF5C87" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const quickPrompts = [
  { en: "What services do you offer?",       bn: "আপনারা কী কী সার্ভিস দেন?" },
  { en: "Video production pricing?",          bn: "ভিডিও প্রোডাকশনের খরচ কত?" },
  { en: "How to contact Creavix?",            bn: "কীভাবে যোগাযোগ করব?" },
  { en: "Tell me about your portfolio",       bn: "পোর্টফোলিও সম্পর্কে বলুন" },
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
      whileHover={{ scale: 1.12, y: -3 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      data-testid="button-scroll-top"
      className="w-11 h-11 rounded-full flex items-center justify-center relative overflow-hidden group"
      style={{
        background: "linear-gradient(135deg, #06b6d4, #0891b2)",
        boxShadow: "0 4px 20px rgba(6,182,212,0.45), inset 0 1px 0 rgba(255,255,255,0.2)"
      }}
      aria-label="Scroll to top"
    >
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200 rounded-full" />
      <ChevronUp className="w-5 h-5 text-white relative z-10 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </motion.button>
  );
}

export function FloatingActions() {
  const { lang: language } = useLanguage();
  const isBn = language === 'bn';
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: isBn
        ? "হ্যালো! আমি Creavix AI Assistant। ওয়েবসাইট, সার্ভিস, পোর্টফোলিও — যেকোনো বিষয়ে বাংলায় বা ইংরেজিতে প্রশ্ন করুন!"
        : "Hello! I'm the Creavix AI Assistant. Ask me anything about our services, portfolio, team, or pricing!"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMutation = useMutation({
    mutationFn: (message: string) =>
      apiRequest("POST", "/api/chat", { message, lang: language })
        .then(r => r.json()) as Promise<{ reply: string }>,
    onSuccess: (data) => {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "assistant", text: data.reply }]);
    },
    onError: () => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        text: isBn
          ? "দুঃখিত, এখন উত্তর দিতে পারছি না। অনুগ্রহ করে WhatsApp বা ইমেইলে যোগাযোগ করুন: wa.me/8801890484355"
          : "Sorry, couldn't respond right now. Please reach us on WhatsApp or email: info@creavixit.com"
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
      setTimeout(() => inputRef.current?.focus(), 220);
    }
  }, [chatOpen, messages]);

  const showQuickPrompts = messages.length <= 2 && !chatMutation.isPending;

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
          animate={chatOpen ? { scale: 0.68, y: -6, opacity: 0.65 } : { scale: 1, y: 0, opacity: 1 }}
          whileHover={!chatOpen ? { scale: 1.1, y: -2 } : {}}
          whileTap={{ scale: 0.93 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{
            background: chatOpen ? "linear-gradient(135deg, #16a34a, #15803d)" : "linear-gradient(135deg, #25d366, #128c7e)",
            boxShadow: chatOpen ? "0 2px 6px rgba(34,197,94,0.2)" : "0 4px 22px rgba(37,211,102,0.5), inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
          aria-label="WhatsApp"
        >
          {!chatOpen && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-400"
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <FaWhatsapp className="w-6 h-6 text-white relative z-10" />
        </motion.a>

        <motion.button
          onClick={() => setChatOpen(v => !v)}
          data-testid="button-chat-toggle"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.93 }}
          className="w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{
            background: chatOpen ? "linear-gradient(135deg, #dc2626, #b91c1c)" : "white",
            boxShadow: chatOpen
              ? "0 4px 22px rgba(220,38,38,0.5)"
              : "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.9)"
          }}
          aria-label={chatOpen ? "Close chat" : "Open AI chat"}
        >
          {!chatOpen && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid rgba(160,51,255,0.5)" }}
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            />
          )}
          <AnimatePresence mode="wait">
            {chatOpen ? (
              <motion.div key="x"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div key="msng"
                initial={{ rotate: 25, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -25, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.22 }}>
                <MessengerIcon size={30} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-[6.5rem] right-5 z-[95] w-[92vw] sm:w-[380px] max-w-[380px]"
            data-testid="chat-popup"
            onClick={e => e.stopPropagation()}
            style={{ fontFamily: isBn ? BENGALI_FONT : undefined }}
          >
            <div className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "linear-gradient(170deg, #0d1526 0%, #0a1020 100%)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.75), 0 0 0 1px rgba(0,132,255,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
                maxHeight: "min(500px, 72vh)"
              }}>

              <div className="px-4 py-3 flex items-center gap-3 shrink-0"
                style={{ background: "linear-gradient(90deg, #0084ff18, #a033ff12, #ff5c8710)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #0084ff, #a033ff)", boxShadow: "0 4px 14px rgba(0,132,255,0.45)" }}>
                  <MessengerIcon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm leading-tight" style={{ fontFamily: BENGALI_FONT }}>
                    Creavix AI Assistant
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs" style={{ fontFamily: BENGALI_FONT }}>
                      {isBn ? "এখন অনলাইনে আছি" : "Active now"}
                    </span>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 min-h-0"
                style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}>
                {messages.map(msg => (
                  <div key={msg.id} className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mb-0.5"
                        style={{ background: "linear-gradient(135deg, #0084ff, #a033ff)" }}>
                        <MessengerIcon size={14} />
                      </div>
                    )}
                    <div
                      className={`max-w-[76%] px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "text-white rounded-2xl rounded-br-sm"
                          : "text-white/90 rounded-2xl rounded-bl-sm border border-white/[0.07]"
                      }`}
                      style={{
                        fontFamily: BENGALI_FONT,
                        ...(msg.role === "user"
                          ? { background: "linear-gradient(135deg, #0084ff, #0063cc)", boxShadow: "0 2px 10px rgba(0,132,255,0.3)" }
                          : { background: "rgba(255,255,255,0.04)" })
                      }}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {chatMutation.isPending && (
                  <div className="flex items-end gap-2 justify-start">
                    <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #0084ff, #a033ff)" }}>
                      <MessengerIcon size={14} />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm border border-white/[0.07] flex items-center gap-1.5"
                      style={{ background: "rgba(255,255,255,0.04)" }}>
                      {[0, 0.18, 0.36].map(d => (
                        <motion.div key={d} className="w-2 h-2 rounded-full"
                          style={{ background: "linear-gradient(135deg, #0084ff, #a033ff)" }}
                          animate={{ y: [0, -6, 0], scale: [1, 1.15, 1] }}
                          transition={{ duration: 0.75, delay: d, repeat: Infinity }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {showQuickPrompts && (
                <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
                  {quickPrompts.map((p, i) => (
                    <button key={i}
                      onClick={() => sendMessage(isBn ? p.bn : p.en)}
                      data-testid={`chat-quick-${i}`}
                      className="text-xs px-3 py-1.5 rounded-full border transition-all duration-200"
                      style={{
                        fontFamily: BENGALI_FONT,
                        borderColor: "rgba(0,132,255,0.35)",
                        background: "rgba(0,132,255,0.08)",
                        color: "#60a5fa",
                      }}
                      onMouseEnter={e => {
                        (e.target as HTMLElement).style.background = "rgba(0,132,255,0.2)";
                        (e.target as HTMLElement).style.borderColor = "rgba(0,132,255,0.6)";
                      }}
                      onMouseLeave={e => {
                        (e.target as HTMLElement).style.background = "rgba(0,132,255,0.08)";
                        (e.target as HTMLElement).style.borderColor = "rgba(0,132,255,0.35)";
                      }}>
                      {isBn ? p.bn : p.en}
                    </button>
                  ))}
                </div>
              )}

              <div className="px-3 pb-3 pt-2 shrink-0"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <form onSubmit={e => { e.preventDefault(); sendMessage(input); }}
                  className="flex gap-2 items-center">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder={isBn ? "বাংলায় বা ইংরেজিতে লিখুন..." : "Type a message..."}
                    data-testid="chat-input"
                    disabled={chatMutation.isPending}
                    className="flex-1 text-sm rounded-full px-4 py-2.5 text-white placeholder-white/25 focus:outline-none transition-all disabled:opacity-50"
                    style={{
                      fontFamily: BENGALI_FONT,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,132,255,0.5)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  <button type="submit"
                    disabled={!input.trim() || chatMutation.isPending}
                    data-testid="chat-send"
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 disabled:opacity-35 transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #0084ff, #a033ff)",
                      boxShadow: "0 2px 12px rgba(0,132,255,0.4)"
                    }}>
                    {chatMutation.isPending
                      ? <Loader2 className="w-4 h-4 text-white animate-spin" />
                      : <Send className="w-4 h-4 text-white" />}
                  </button>
                </form>
                <p className="text-white/18 text-[10px] text-center mt-1.5" style={{ fontFamily: BENGALI_FONT }}>
                  {isBn ? "Gemini AI দ্বারা পরিচালিত · Creavix IT Solution" : "Powered by Google Gemini AI · Creavix IT Solution"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
