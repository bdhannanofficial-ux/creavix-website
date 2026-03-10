import { Layout } from "@/components/Layout";
import { VideoEmbed } from "@/components/VideoEmbed";
import { StatsCounter } from "@/components/StatsCounter";
import { AIHeroScene } from "@/components/AIHeroScene";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles, Zap, Brain } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

const videoCategories = [
  {
    titleKey: "cat1_title" as const,
    descKey: "cat1_desc" as const,
    ids: ["FvWyFDNAAPY", "4ryJaLx6o0k", "MPYdZfeJQX4", "OcyCYVfko3k", "QdPW3bDFc5I", "3U3-3IgbPQc"]
  },
  {
    titleKey: "cat2_title" as const,
    descKey: "cat2_desc" as const,
    ids: ["Szel9WlwaS8", "rQk_sPwkDwU", "w9LPO4Ddpos", "6EKnfroWXQE", "pVqdFDTyfdg", "LrORiOjB4X0", "tooCPxc0pnY", "lQZSDKRikf8", "KU7j0JhzJKI", "P65MlYwcXes"]
  },
  {
    titleKey: "cat3_title" as const,
    descKey: "cat3_desc" as const,
    ids: ["8nCuthKfbIU", "0baTxFVpSyo", "7knZkqenPII", "J8rkaUqNYfY", "YYZS_C4clHY"]
  },
  {
    titleKey: "cat4_title" as const,
    descKey: "cat4_desc" as const,
    ids: ["6n2y_nrRahM", "DjXhq-ScyE8", "eEqeRIsI9oQ", "MtgdKWMRAPI", "u6YLq7lDDdY", "KxFQv4M-bow", "icxH_8aqiSM"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* ─── AI Hero Section ─── */}
      <section className="relative pt-20 pb-32 lg:pt-28 lg:pb-44 overflow-hidden min-h-[85vh] flex items-center">
        <AIHeroScene />

        {/* Gradient fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 w-full">

          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-7"
          >
            <div className="flex items-center gap-2.5 px-5 py-2 rounded-full border text-sm font-bold tracking-wide backdrop-blur-sm"
              style={{
                background: "linear-gradient(135deg, rgba(6,182,212,0.12), rgba(168,85,247,0.12))",
                borderColor: "rgba(6,182,212,0.3)",
                color: "#67e8f9",
              }}>
              <Brain size={14} className="text-cyan-400" />
              <span>AI-Powered Agency</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold max-w-4xl mx-auto leading-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("hero_headline")}{" "}
            <span style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 40%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {t("hero_headline_accent")}
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t("hero_sub")}
          </motion.p>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {[
              { icon: Zap, label: "3700+ Projects" },
              { icon: Sparkles, label: "Premium Quality" },
              { icon: Brain, label: "AI Enhanced" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                <Icon size={12} className="text-cyan-400" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 text-[#080d1a]"
              style={{
                background: "linear-gradient(145deg, #fde68a 0%, #f59e0b 55%, #d97706 100%)",
                boxShadow: "0 6px 24px rgba(251,191,36,0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
              data-testid="button-hero-cta"
            >
              {t("hero_cta_primary")} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#portfolio"
              className="px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 text-foreground border border-white/15 bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.09] hover:border-cyan-500/30"
              data-testid="button-hero-view-work"
            >
              {t("hero_cta_secondary")} <PlayCircle size={18} className="text-cyan-400" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter */}
      <StatsCounter />

      {/* Portfolio */}
      <div id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 pb-16">
        {videoCategories.map((category, index) => (
          <section key={index} data-testid={`video-section-${index}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65 }}
              className="mb-12 md:mb-16"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest mb-4">
                {t("cat_label")} 0{index + 1}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>{t(category.titleKey)}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">{t(category.descKey)}</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {category.ids.map((id) => (
                <motion.div key={id} variants={itemVariants}>
                  <VideoEmbed videoId={id} title={t(category.titleKey)} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
      </div>
    </Layout>
  );
}
