import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, BadgeCheck, Globe, Sun, Moon, MapPin } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram, FaXTwitter } from "react-icons/fa6";
import logoImg from "@assets/new-logo_1773114552036.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { SearchBar } from "@/components/SearchBar";
import { FloatingActions } from "@/components/FloatingActions";
import { OrderFooterCTA } from "@/components/OrderCTA";

const socialLinks = [
  { icon: FaFacebookF, href: "https://web.facebook.com/CreavixITSolution", label: "Facebook" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/creavix-it-solution", label: "LinkedIn" },
  { icon: FaYoutube, href: "https://www.youtube.com/@CreavixiTsolution", label: "YouTube" },
  { icon: FaInstagram, href: "https://www.instagram.com/creavixitsolution", label: "Instagram" },
  { icon: FaXTwitter, href: "https://x.com/creavixit", label: "X/Twitter" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { key: "nav_portfolio" as const, path: "/" },
    { key: "nav_team" as const, path: "/team" },
    { key: "nav_blog" as const, path: "/blog" },
    { key: "nav_contact" as const, path: "/contact" },
    { key: "nav_terms" as const, path: "/terms" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.08),transparent)] pointer-events-none" />

      {/* ─── Language / Translate Bar ─── */}
      <div className="creavix-topbar fixed top-0 w-full z-[60] bg-[#040810]/95 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          {/* Left: marquee info — clickable links */}
          <div className="overflow-hidden flex-1 mr-6 hidden sm:block">
            <motion.div
              className="flex items-center gap-5 text-[11px] text-slate-500 whitespace-nowrap"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            >
              <span>🌐 Creavix IT Solution — Premium Video Production & Digital Marketing Agency</span>
              <span className="text-slate-700">|</span>
              <a
                href="mailto:info@creavixit.com"
                className="hover:text-cyan-400 transition-colors"
                style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" } as React.CSSProperties}
              >
                ✉ info@creavixit.com
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="tel:+8809611132835"
                className="hover:text-cyan-400 transition-colors"
                style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" } as React.CSSProperties}
              >
                📞 +880 9611132835
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="https://wa.me/8801890484355"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
                style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" } as React.CSSProperties}
              >
                💬 WhatsApp: +880 1890484355
              </a>
            </motion.div>
          </div>

          {/* Right: Language Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <Globe size={12} className="text-slate-500" />
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5">
              <button
                onClick={() => setLang("en")}
                data-testid="button-lang-en"
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all duration-200 ${
                  lang === "en"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-sm"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("bn")}
                data-testid="button-lang-bn"
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all duration-200 ${
                  lang === "bn"
                    ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-sm"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Navigation ─── */}
      <header
        className={`creavix-header fixed top-9 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-2 bg-[#080d1a]/97 backdrop-blur-2xl shadow-[0_4px_40px_rgba(0,0,0,0.7)] border-b border-cyan-500/10"
            : "py-3 bg-[#080d1a]/92 backdrop-blur-xl border-b border-white/5"
        }`}
      >
        {/* Top 3D glow line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">

            {/* Logo + Brand — tapping anywhere on logo or name → Home */}
            <Link
              href="/"
              className="flex items-center gap-3 group flex-shrink-0 min-h-[44px] py-1 select-none"
              data-testid="link-home-logo"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md group-hover:blur-lg transition-all duration-300 scale-110" />
                <img
                  src={logoImg}
                  alt="Creavix IT Solution Logo"
                  className="relative h-10 w-10 object-contain rounded-xl ring-1 ring-cyan-500/30 group-hover:ring-cyan-400/60 transition-all duration-300"
                  draggable={false}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-extrabold text-sm sm:text-base tracking-wide"
                  style={{
                    background: "linear-gradient(90deg, #fff 0%, #67e8f9 50%, #fbbf24 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.04em",
                  }}
                >
                  CREAVIX IT SOLUTION
                </span>
                <span className="flex items-center gap-1 mt-0.5">
                  <BadgeCheck size={10} className="text-cyan-400" />
                  <span className="text-[9px] font-semibold text-cyan-400/90 tracking-widest uppercase">
                    {t("verified_agency")}
                  </span>
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1.5" data-testid="nav-desktop">
              {navLinks.map((link) => {
                const active = location === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    data-testid={`nav-link-${link.path.replace("/", "") || "home"}`}
                    className={`relative px-3.5 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-300 border
                      ${active
                        ? "text-[#080d1a] bg-gradient-to-b from-cyan-300 to-cyan-500 border-cyan-300 shadow-[0_2px_12px_rgba(6,182,212,0.5),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.2)]"
                        : "text-slate-300 bg-white/[0.04] border-white/10 hover:bg-white/[0.09] hover:text-white hover:border-cyan-500/30 hover:shadow-[0_2px_12px_rgba(6,182,212,0.12)]"
                      }`}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
            </nav>

            {/* Search + Theme Toggle + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <SearchBar variant="navbar" />
              <button
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.04] text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200 flex-shrink-0"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <Link
                href="/contact"
                data-testid="button-cta-get-started"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-wide text-[#080d1a] transition-all duration-300 whitespace-nowrap hover:scale-105"
                style={{
                  background: "linear-gradient(145deg, #fde68a 0%, #f59e0b 50%, #d97706 100%)",
                  boxShadow: "0 4px 15px rgba(251,191,36,0.35), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.15)",
                }}
              >
                {t("nav_get_started")}
              </Link>
            </div>

            {/* Mobile: theme toggle + menu button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                data-testid="button-theme-toggle-mobile"
                className="text-slate-400 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <button
                className="text-slate-300 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </header>

      {/* ─── Mobile Nav ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="creavix-mobile-menu fixed inset-0 z-40 bg-[#080d1a]/99 backdrop-blur-2xl pt-[4.5rem] px-5 flex flex-col overflow-y-auto"
          >
            {/* Mobile Search */}
            <div className="mb-4 pt-4">
              <SearchBar variant="footer" onClose={() => setMobileMenuOpen(false)} />
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = location === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl border text-base font-semibold transition-all duration-200 ${
                      active
                        ? "text-[#080d1a] bg-gradient-to-r from-cyan-300 to-cyan-500 border-cyan-300"
                        : "text-slate-300 bg-white/[0.03] border-white/8 hover:bg-white/[0.08]"
                    }`}
                    data-testid={`mobile-nav-${link.path.replace("/", "") || "home"}`}
                  >
                    {t(link.key)}
                    <ChevronRight size={16} className={active ? "text-[#080d1a]" : "text-slate-500"} />
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="mt-2 flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-[#080d1a] font-bold text-base"
                style={{
                  background: "linear-gradient(145deg, #fde68a 0%, #f59e0b 50%, #d97706 100%)",
                  boxShadow: "0 4px 20px rgba(251,191,36,0.3)",
                }}
                data-testid="mobile-button-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav_get_started")} →
              </Link>
            </div>

            <div className="mt-8 flex gap-3 justify-center pb-8">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-slate-400 border border-white/10 bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40 transition-all duration-300"
                >
                  <link.icon size={17} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Main Content ─── */}
      <main className="flex-grow pt-[5.5rem] pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ─── Footer ─── */}
      <footer className="creavix-footer border-t border-white/5 bg-[#060b18] pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Order Now CTA Banner */}
          <OrderFooterCTA />

          {/* Footer Search */}
          <div className="mb-12">
            <p className="text-center text-sm text-slate-500 mb-4">{t("footer_find")}</p>
            <SearchBar variant="footer" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img src={logoImg} alt="Creavix Logo" className="h-10 w-10 object-contain rounded-lg opacity-90" />
                <div>
                  <p className="font-extrabold text-sm tracking-wide"
                    style={{
                      background: "linear-gradient(90deg, #fff, #67e8f9)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >CREAVIX IT SOLUTION</p>
                  <p className="text-[10px] text-cyan-400/70 font-semibold tracking-widest uppercase">Verified Agency</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed max-w-xs">
                {t("footer_tagline")}
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 border border-white/8 bg-white/4 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40 transition-all duration-300 hover:scale-110"
                  >
                    <link.icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-5 tracking-wider uppercase">{t("footer_quicklinks")}</h4>
              <ul className="space-y-3">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link href={link.path} className="text-slate-400 hover:text-cyan-300 transition-colors text-sm flex items-center gap-2 group">
                      <ChevronRight size={13} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-5 tracking-wider uppercase">{t("footer_contact")}</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="mailto:info@creavixit.com" className="hover:text-cyan-300 transition-colors">info@creavixit.com</a></li>
                <li><a href="mailto:creavixbd@gmail.com" className="hover:text-cyan-300 transition-colors">creavixbd@gmail.com</a></li>
                <li><a href="tel:+8809611132835" className="hover:text-cyan-300 transition-colors">+880 9611132835</a></li>
                <li>
                  <a href="https://wa.me/8801890484355" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">
                    WhatsApp: +880 1890484355
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Hemayetpur,Savar,Dhaka,Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 hover:text-cyan-300 transition-colors group"
                  >
                    <MapPin size={14} className="shrink-0 mt-0.5 text-cyan-600 group-hover:text-cyan-300 transition-colors" />
                    <span style={{ fontFamily: lang === "bn" ? "'Hind Siliguri', 'DM Sans', sans-serif" : undefined }}>
                      {t("contact_address")}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 text-center text-xs text-slate-600 flex flex-col md:flex-row justify-between items-center gap-3">
            <p>&copy; {new Date().getFullYear()} Creavix IT Solution. {t("footer_rights")}</p>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                {lang === "bn" ? "নীতিমালা ও শর্তাবলি" : "Terms & Conditions"}
              </Link>
              <span className="text-slate-700">·</span>
              <p>{t("footer_crafted")}</p>
            </div>
          </div>
        </div>
      </footer>
      <FloatingActions />
    </div>
  );
}
