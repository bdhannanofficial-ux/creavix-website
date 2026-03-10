import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import {
  Play, CheckCircle2, MessageSquare, FileText, Video,
  Sparkles, X, User, Phone, Mail, ArrowRight, ShieldCheck
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const WHATSAPP_NUMBER = "8801714061016";
const BENGALI_FONT = "'Hind Siliguri', 'DM Sans', sans-serif";

/* ─────────────────────────────────────────────
   ORDER MODAL — Premium popup form
───────────────────────────────────────────── */
interface OrderModalProps { isOpen: boolean; onClose: () => void; }

function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const { lang } = useLanguage();
  const isBn = lang === "bn";
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const msg = isBn
      ? `হ্যালো ক্রিয়েভিক্স আইটি সলিউশন!\n\nআমি আপনাদের প্রফেশনাল ভিডিও সার্ভিস অর্ডার করতে চাই।\n\n📋 অর্ডার তথ্য:\n👤 নাম: ${form.name}\n📞 ফোন: ${form.phone}${form.email ? `\n📧 ইমেইল: ${form.email}` : ""}\n\nঅনুগ্রহ করে আমার সাথে যোগাযোগ করুন। ধন্যবাদ! 🙏`
      : `Hello Creavix IT Solution!\n\nI'm interested in ordering your professional video services.\n\n📋 Order Details:\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}${form.email ? `\n📧 Email: ${form.email}` : ""}\n\nPlease contact me at your earliest convenience. Thank you!`;

    setTimeout(() => {
      setSent(true);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
      setTimeout(() => {
        setSubmitting(false);
        setSent(false);
        onClose();
        setForm({ name: "", phone: "", email: "" });
      }, 1200);
    }, 500);
  }, [form, isBn, onClose]);

  const fields = [
    {
      key: "name" as const, type: "text", required: true,
      icon: User, iconColor: "#06b6d4",
      label: isBn ? "আপনার নাম" : "Your Name",
      placeholder: isBn ? "পূর্ণ নাম লিখুন" : "Enter your full name",
      focusBorder: "rgba(6,182,212,0.6)", focusBg: "rgba(6,182,212,0.06)",
    },
    {
      key: "phone" as const, type: "tel", required: true,
      icon: Phone, iconColor: "#22c55e",
      label: isBn ? "ফোন / হোয়াটসঅ্যাপ নাম্বার" : "Phone / WhatsApp Number",
      placeholder: isBn ? "+880 1XXX-XXXXXX" : "+1 (234) 567-8900",
      focusBorder: "rgba(34,197,94,0.6)", focusBg: "rgba(34,197,94,0.06)",
    },
    {
      key: "email" as const, type: "email", required: false,
      icon: Mail, iconColor: "#a855f7",
      label: isBn ? "ইমেইল ঠিকানা (ঐচ্ছিক)" : "Email Address (optional)",
      placeholder: isBn ? "your@email.com (ঐচ্ছিক)" : "your@email.com (optional)",
      focusBorder: "rgba(168,85,247,0.6)", focusBg: "rgba(168,85,247,0.06)",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[400]"
            style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" } as React.CSSProperties}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal container */}
          <div
            className="fixed inset-0 z-[401] flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-md"
              initial={{ scale: 0.88, opacity: 0, y: 32 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 32 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={e => e.stopPropagation()}
              style={{ fontFamily: isBn ? BENGALI_FONT : undefined }}
            >
              {/* Gradient border */}
              <div
                className="rounded-2xl sm:rounded-3xl p-[1.5px]"
                style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.7), rgba(168,85,247,0.7), rgba(37,211,102,0.5))" }}
              >
                <div
                  className="rounded-2xl sm:rounded-3xl overflow-hidden"
                  style={{ background: "linear-gradient(170deg, #0d1629 0%, #07101f 100%)" }}
                >
                  {/* ── Header ── */}
                  <div
                    className="relative px-5 sm:px-6 pt-5 pb-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {/* Glow behind header */}
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.12) 0%, transparent 65%)" }} />

                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {/* WhatsApp badge */}
                        <div className="inline-flex items-center gap-2 mb-2.5 px-3 py-1 rounded-full"
                          style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)" }}>
                          <FaWhatsapp className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400 text-[11px] font-bold tracking-widest uppercase">
                            {isBn ? "অর্ডার ফর্ম" : "Order Form"}
                          </span>
                        </div>
                        <h3
                          className="text-xl sm:text-2xl font-black leading-tight"
                          style={{
                            color: "white",
                            fontFamily: isBn ? BENGALI_FONT : "var(--font-display, 'Outfit', sans-serif)"
                          }}
                        >
                          {isBn ? "আপনার প্রজেক্ট শুরু করুন" : "Start Your Project"}
                        </h3>
                        <p className="text-xs mt-1" style={{ color: "rgba(148,163,184,1)", fontFamily: isBn ? BENGALI_FONT : undefined }}>
                          {isBn
                            ? "তথ্য দিন — আমরা হোয়াটসঅ্যাপে নিশ্চিত করব"
                            : "Fill your details — we'll confirm via WhatsApp"}
                        </p>
                      </div>
                      <button
                        onClick={onClose}
                        data-testid="button-close-order-modal"
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90 shrink-0"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* ── Form ── */}
                  <form onSubmit={handleSubmit} className="px-5 sm:px-6 py-5 space-y-4">
                    {fields.map(field => (
                      <div key={field.key} className="space-y-1.5">
                        <label
                          className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider"
                          style={{ color: "rgba(148,163,184,0.8)", fontFamily: isBn ? BENGALI_FONT : undefined }}
                        >
                          <field.icon className="w-3 h-3 shrink-0" style={{ color: field.iconColor }} />
                          {field.label}
                          {field.required && <span style={{ color: "#f87171" }}>*</span>}
                        </label>
                        <input
                          type={field.type}
                          required={field.required}
                          value={form[field.key]}
                          onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                          placeholder={field.placeholder}
                          disabled={submitting}
                          data-testid={`input-order-${field.key}`}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-50"
                          style={{
                            background: "rgba(255,255,255,0.045)",
                            border: "1.5px solid rgba(255,255,255,0.09)",
                            color: "white",
                            fontFamily: isBn ? BENGALI_FONT : undefined,
                          } as React.CSSProperties}
                          onFocus={e => {
                            e.target.style.borderColor = field.focusBorder;
                            e.target.style.background = field.focusBg;
                          }}
                          onBlur={e => {
                            e.target.style.borderColor = "rgba(255,255,255,0.09)";
                            e.target.style.background = "rgba(255,255,255,0.045)";
                          }}
                        />
                      </div>
                    ))}

                    {/* Info note */}
                    <div
                      className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl"
                      style={{ background: "rgba(37,211,102,0.07)", border: "1px solid rgba(37,211,102,0.15)" }}
                    >
                      <FaWhatsapp className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#4ade80" }} />
                      <p className="text-[11px] leading-relaxed" style={{ color: "rgba(74,222,128,0.8)", fontFamily: isBn ? BENGALI_FONT : undefined }}>
                        {isBn
                          ? "ফর্ম জমা দিলে হোয়াটসঅ্যাপ স্বয়ংক্রিয়ভাবে খুলবে। সাধারণত ২৪ ঘন্টার মধ্যে রেসপন্স পাবেন।"
                          : "Submitting opens WhatsApp automatically with your details. We usually respond within 24 hours."}
                      </p>
                    </div>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={submitting || !form.name.trim() || !form.phone.trim()}
                      whileHover={!submitting ? { scale: 1.02, y: -1 } : {}}
                      whileTap={!submitting ? { scale: 0.97 } : {}}
                      data-testid="button-order-confirm"
                      className="w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: sent
                          ? "linear-gradient(135deg, #22c55e, #16a34a)"
                          : "linear-gradient(135deg, #25d366, #128c7e)",
                        boxShadow: "0 6px 28px rgba(37,211,102,0.38), inset 0 1px 0 rgba(255,255,255,0.18)",
                        touchAction: "manipulation",
                        color: "white",
                        fontFamily: isBn ? BENGALI_FONT : undefined,
                      } as React.CSSProperties}
                    >
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
                      {sent ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 relative z-10" />
                          <span className="relative z-10">{isBn ? "হোয়াটসঅ্যাপ খুলছে..." : "Opening WhatsApp..."}</span>
                        </>
                      ) : submitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white relative z-10"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="relative z-10">{isBn ? "প্রস্তুত হচ্ছে..." : "Preparing..."}</span>
                        </>
                      ) : (
                        <>
                          <FaWhatsapp className="w-5 h-5 relative z-10" />
                          <span className="relative z-10">{isBn ? "হোয়াটসঅ্যাপে নিশ্চিত করুন" : "Confirm on WhatsApp"}</span>
                          <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </motion.button>

                    {/* Trust row */}
                    <div className="flex items-center justify-center gap-5">
                      {[
                        { icon: ShieldCheck, text: isBn ? "সম্পূর্ণ নিরাপদ" : "100% Safe" },
                        { icon: CheckCircle2, text: isBn ? "দ্রুত রেসপন্স" : "Fast Response" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px]"
                          style={{ color: "rgba(100,116,139,0.9)", fontFamily: isBn ? BENGALI_FONT : undefined }}>
                          <item.icon className="w-3 h-3 shrink-0" style={{ color: "#10b981" }} />
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   PREMIUM STEPS — animated connecting line
───────────────────────────────────────────── */
const stepConfig = [
  {
    num: "01", icon: MessageSquare,
    color: "#06b6d4", glow: "rgba(6,182,212,0.35)",
    bg: "linear-gradient(135deg, rgba(6,182,212,0.18), rgba(6,182,212,0.08))",
    border: "rgba(6,182,212,0.3)",
    titleKey: "order_step1_title" as const,
    subKey: "order_step1_sub" as const,
  },
  {
    num: "02", icon: FileText,
    color: "#a855f7", glow: "rgba(168,85,247,0.35)",
    bg: "linear-gradient(135deg, rgba(168,85,247,0.18), rgba(168,85,247,0.08))",
    border: "rgba(168,85,247,0.3)",
    titleKey: "order_step2_title" as const,
    subKey: "order_step2_sub" as const,
  },
  {
    num: "03", icon: Video,
    color: "#22c55e", glow: "rgba(34,197,94,0.35)",
    bg: "linear-gradient(135deg, rgba(34,197,94,0.18), rgba(34,197,94,0.08))",
    border: "rgba(34,197,94,0.3)",
    titleKey: "order_step3_title" as const,
    subKey: "order_step3_sub" as const,
  },
];

function PremiumSteps() {
  const { t, lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isBn = lang === "bn";

  return (
    <div className="relative flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 mb-10 sm:mb-12">
      {stepConfig.map((step, i) => (
        <div key={i} className="relative flex sm:flex-1 items-stretch">
          {/* Step card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="flex-1 relative rounded-2xl p-5 cursor-default overflow-hidden"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.035)"
                : "rgba(0,0,0,0.03)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
              boxShadow: isDark
                ? "0 4px 24px rgba(0,0,0,0.3)"
                : "0 2px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {/* Subtle top glow line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`, opacity: 0.5 }}
            />

            {/* Step number */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-3xl font-black leading-none tracking-tight select-none"
                style={{
                  background: `linear-gradient(135deg, ${step.color}, ${step.color}55)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "var(--font-display, 'Outfit', sans-serif)",
                }}
              >
                {step.num}
              </span>

              {/* Icon circle */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: step.bg,
                  border: `1.5px solid ${step.border}`,
                  boxShadow: `0 4px 16px ${step.glow}`,
                }}
              >
                <step.icon className="w-5 h-5" style={{ color: step.color }} />
              </div>
            </div>

            <h4
              className="font-bold text-sm sm:text-base mb-1 leading-tight"
              style={{
                color: isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.88)",
                fontFamily: isBn ? BENGALI_FONT : undefined,
              }}
            >
              {t(step.titleKey)}
            </h4>
            <p
              className="text-xs sm:text-sm leading-relaxed"
              style={{
                color: isDark ? "rgba(148,163,184,0.85)" : "rgba(71,85,105,0.9)",
                fontFamily: isBn ? BENGALI_FONT : undefined,
              }}
            >
              {t(step.subKey)}
            </p>

            {/* Hover glow overlay */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none"
              style={{ background: `radial-gradient(circle at 30% 50%, ${step.glow.replace("0.35", "0.06")} 0%, transparent 65%)` }}
            />
          </motion.div>

          {/* Animated connector between steps (horizontal, desktop only) */}
          {i < stepConfig.length - 1 && (
            <div className="hidden sm:flex items-center shrink-0 px-2 w-10">
              <div className="relative flex-1 h-px overflow-hidden rounded-full"
                style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)" }}>
                {/* Traveling shimmer dot */}
                <motion.div
                  className="absolute top-0 h-full w-6 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
                    left: 0,
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: i * 0.7, repeatDelay: 0.4 }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN ORDER CTA SECTION
───────────────────────────────────────────── */
export function OrderCTA() {
  const { t, lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isBn = lang === "bn";
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section
        className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
        style={{ fontFamily: isBn ? BENGALI_FONT : undefined }}
        data-testid="section-order-cta"
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #04020c 0%, #091525 40%, #050d18 70%, #070412 100%)"
              : "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 40%, #f0f9ff 70%, #f5f0ff 100%)",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(6,182,212,${isDark ? "0.1" : "0.06"}) 0%, transparent 65%)` }} />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(168,85,247,${isDark ? "0.09" : "0.05"}) 0%, transparent 65%)` }} />
        <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(34,197,94,${isDark ? "0.06" : "0.04"}) 0%, transparent 65%)` }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-5"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                background: isDark ? "rgba(6,182,212,0.1)" : "rgba(6,182,212,0.08)",
                border: "1px solid rgba(6,182,212,0.3)",
                color: "#22d3ee",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: "#22d3ee" }} />
              <span>{t("order_badge")}</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-center mb-4"
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight"
              style={{
                color: isDark ? "white" : "rgba(10,15,30,0.95)",
                fontFamily: isBn ? BENGALI_FONT : "var(--font-display, 'Outfit', sans-serif)",
              }}
            >
              {t("order_heading")}{" "}
              <span style={{
                background: "linear-gradient(90deg, #06b6d4, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {t("order_heading_accent")}
              </span>
            </h2>
          </motion.div>

          {/* Sub-heading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-center text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{
              color: isDark ? "rgba(148,163,184,0.9)" : "rgba(71,85,105,0.9)",
              fontFamily: isBn ? BENGALI_FONT : undefined,
            }}
          >
            {t("order_sub")}
          </motion.p>

          {/* Premium Steps */}
          <PremiumSteps />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-7"
          >
            {/* Primary — opens modal */}
            <motion.button
              onClick={() => setModalOpen(true)}
              data-testid="button-order-whatsapp"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #25d366, #128c7e)",
                boxShadow: "0 8px 32px rgba(37,211,102,0.4), inset 0 1px 0 rgba(255,255,255,0.22)",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                color: "white",
                fontFamily: isBn ? BENGALI_FONT : undefined,
              } as React.CSSProperties}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
              />
              <FaWhatsapp className="w-5 h-5 relative z-10 shrink-0" />
              <span className="relative z-10">{t("order_btn")}</span>
            </motion.button>

            {/* Secondary — scroll to portfolio */}
            <motion.button
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-watch-work"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base overflow-hidden group"
              style={{
                background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                border: `1.5px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)"}`,
                color: isDark ? "rgba(255,255,255,0.88)" : "rgba(10,15,30,0.85)",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                fontFamily: isBn ? BENGALI_FONT : undefined,
              } as React.CSSProperties}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-200 rounded-2xl" />
              <Play fill="currentColor" className="w-4 h-4 shrink-0 relative z-10" style={{ color: "#22d3ee" }} />
              <span className="relative z-10">{t("order_watch")}</span>
            </motion.button>
          </motion.div>

          {/* Guarantee */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex items-center justify-center gap-2 text-sm"
            style={{ color: "#10b981", fontFamily: isBn ? BENGALI_FONT : undefined }}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-semibold">{t("order_guarantee")}</span>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   COMPACT FOOTER VERSION
───────────────────────────────────────────── */
export function OrderFooterCTA() {
  const { t, lang } = useLanguage();
  const isBn = lang === "bn";
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl mb-8"
        style={{
          background: "linear-gradient(135deg, rgba(6,182,212,0.07), rgba(168,85,247,0.07))",
          border: "1px solid rgba(6,182,212,0.2)",
        }}
        data-testid="footer-order-cta"
      >
        <div>
          <p
            className="font-bold text-sm mb-0.5"
            style={{ color: "rgba(255,255,255,0.95)", fontFamily: isBn ? BENGALI_FONT : undefined }}
          >
            {t("order_footer_cta")}
          </p>
          <p
            className="text-xs"
            style={{ color: "rgba(100,116,139,0.9)", fontFamily: isBn ? BENGALI_FONT : undefined }}
          >
            {isBn ? "দ্রুত রেসপন্স · HD মান · সন্তুষ্টির গ্যারান্টি" : "Fast Response · HD Quality · Satisfaction Guaranteed"}
          </p>
        </div>
        <motion.button
          onClick={() => setModalOpen(true)}
          data-testid="button-footer-order"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shrink-0"
          style={{
            background: "linear-gradient(135deg, #25d366, #128c7e)",
            boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
            touchAction: "manipulation",
            color: "white",
            fontFamily: isBn ? BENGALI_FONT : undefined,
          } as React.CSSProperties}
        >
          <FaWhatsapp className="w-4 h-4" />
          {t("order_btn")}
        </motion.button>
      </div>
    </>
  );
}
