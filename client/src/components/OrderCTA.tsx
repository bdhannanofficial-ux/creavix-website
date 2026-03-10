import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Play, CheckCircle2, MessageSquare, FileText, Video, ChevronRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP_NUMBER = "8801714061016";
const BENGALI_FONT = "'Hind Siliguri', 'DM Sans', sans-serif";

export function OrderCTA() {
  const { t, lang } = useLanguage();
  const isBn = lang === "bn";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("order_whatsapp_msg"))}`;

  const steps = [
    { icon: MessageSquare, title: t("order_step1_title"), sub: t("order_step1_sub") },
    { icon: FileText, title: t("order_step2_title"), sub: t("order_step2_sub") },
    { icon: Video, title: t("order_step3_title"), sub: t("order_step3_sub") },
  ];

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20"
      style={{ fontFamily: isBn ? BENGALI_FONT : undefined }}
      data-testid="section-order-cta"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #06030e 0%, #0a1628 40%, #060b18 70%, #090518 100%)",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)" }} />

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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-cyan-300 uppercase"
            style={{
              background: "rgba(6,182,212,0.1)",
              border: "1px solid rgba(6,182,212,0.3)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            {t("order_badge")}
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
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
            style={{ fontFamily: isBn ? BENGALI_FONT : "var(--font-display, 'DM Sans', sans-serif)" }}
          >
            {t("order_heading")}{" "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(90deg, #06b6d4, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("order_heading_accent")}
            </span>
          </h2>
        </motion.div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="text-center text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: isBn ? BENGALI_FONT : undefined }}
        >
          {t("order_sub")}
        </motion.p>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10"
        >
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-2">
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl flex-1 sm:flex-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  minWidth: "160px",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(168,85,247,0.2))", border: "1px solid rgba(6,182,212,0.25)" }}
                >
                  <step.icon className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold leading-tight" style={{ fontFamily: isBn ? BENGALI_FONT : undefined }}>{step.title}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5" style={{ fontFamily: isBn ? BENGALI_FONT : undefined }}>{step.sub}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block shrink-0" />
              )}
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-7"
        >
          {/* Primary: Order Now WhatsApp */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-order-whatsapp"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 px-7 py-4 rounded-2xl text-white font-bold text-base relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #25d366, #128c7e)",
              boxShadow: "0 8px 32px rgba(37,211,102,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
              fontFamily: isBn ? BENGALI_FONT : undefined,
            } as React.CSSProperties}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200 rounded-2xl" />
            <FaWhatsapp className="w-6 h-6 relative z-10" />
            <span className="relative z-10">{t("order_btn")}</span>
          </motion.a>

          {/* Secondary: Watch Now */}
          <motion.a
            href="#portfolio"
            data-testid="button-watch-work"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 px-7 py-4 rounded-2xl font-bold text-base relative overflow-hidden group"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1.5px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.88)",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
              fontFamily: isBn ? BENGALI_FONT : undefined,
            } as React.CSSProperties}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/6 transition-colors duration-200 rounded-2xl" />
            <Play fill="currentColor" className="w-5 h-5 text-cyan-400 relative z-10" />
            <span className="relative z-10">{t("order_watch")}</span>
          </motion.a>
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="flex items-center justify-center gap-2 text-emerald-400 text-sm"
          style={{ fontFamily: isBn ? BENGALI_FONT : undefined }}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="font-semibold">{t("order_guarantee")}</span>
        </motion.div>
      </div>
    </section>
  );
}

/* Compact footer version */
export function OrderFooterCTA() {
  const { t, lang } = useLanguage();
  const isBn = lang === "bn";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("order_whatsapp_msg"))}`;

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl mb-8"
      style={{
        background: "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(168,85,247,0.08))",
        border: "1px solid rgba(6,182,212,0.2)",
      }}
      data-testid="footer-order-cta"
    >
      <div>
        <p
          className="text-white font-bold text-sm mb-0.5"
          style={{ fontFamily: isBn ? BENGALI_FONT : undefined }}
        >
          {t("order_footer_cta")}
        </p>
        <p
          className="text-slate-500 text-xs"
          style={{ fontFamily: isBn ? BENGALI_FONT : undefined }}
        >
          {isBn ? "দ্রুত রেসপন্স · HD মান · সন্তুষ্টির গ্যারান্টি" : "Fast Response · HD Quality · Satisfaction Guaranteed"}
        </p>
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-footer-order"
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shrink-0 transition-all hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #25d366, #128c7e)",
          boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
          fontFamily: isBn ? BENGALI_FONT : undefined,
        } as React.CSSProperties}
      >
        <FaWhatsapp className="w-4 h-4" />
        {t("order_btn")}
      </a>
    </div>
  );
}
