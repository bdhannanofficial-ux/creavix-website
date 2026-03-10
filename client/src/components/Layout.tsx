import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, BadgeCheck } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import logoImg from "@assets/new-logo_1773114552036.png";

const navLinks = [
  { name: "Portfolio", path: "/" },
  { name: "Our Team", path: "/team" },
  { name: "Contact", path: "/contact" },
];

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
      {/* Background */}
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.08),transparent)] pointer-events-none" />

      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-2 bg-[#080d1a]/95 backdrop-blur-2xl shadow-[0_4px_40px_rgba(0,0,0,0.6)] border-b border-cyan-500/10"
            : "py-3 bg-[#080d1a]/90 backdrop-blur-xl border-b border-white/5"
        }`}
      >
        {/* Top gradient line — 3D effect */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* Logo + Brand Name */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0" data-testid="link-home-logo">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md group-hover:blur-lg transition-all duration-300 scale-110" />
                <img
                  src={logoImg}
                  alt="Creavix IT Solution Logo"
                  className="relative h-11 w-11 object-contain rounded-xl ring-1 ring-cyan-500/30 group-hover:ring-cyan-400/60 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-extrabold text-base sm:text-lg tracking-wide"
                  style={{
                    background: "linear-gradient(90deg, #fff 0%, #67e8f9 50%, #fbbf24 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.04em",
                  }}
                >
                  CREAVIX IT SOLUTION
                </span>
                <span className="flex items-center gap-1 mt-0.5">
                  <BadgeCheck size={11} className="text-cyan-400" />
                  <span className="text-[10px] font-semibold text-cyan-400/90 tracking-widest uppercase">
                    Verified Agency
                  </span>
                </span>
              </div>
            </Link>

            {/* Desktop Nav Pills */}
            <nav className="hidden md:flex items-center gap-2" data-testid="nav-desktop">
              {navLinks.map((link) => {
                const active = location === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`relative px-4 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 border
                      ${active
                        ? "text-[#080d1a] bg-gradient-to-b from-cyan-300 to-cyan-500 border-cyan-300 shadow-[0_2px_12px_rgba(6,182,212,0.5),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.2)]"
                        : "text-slate-300 bg-white/[0.04] border-white/10 hover:bg-white/[0.09] hover:text-white hover:border-cyan-500/30 hover:shadow-[0_2px_12px_rgba(6,182,212,0.15)]"
                      }`}
                    style={active ? {
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                    } : {}}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            <Link
              href="/contact"
              data-testid="button-cta-get-started"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide text-[#080d1a] transition-all duration-300 flex-shrink-0"
              style={{
                background: "linear-gradient(145deg, #fde68a 0%, #f59e0b 50%, #d97706 100%)",
                boxShadow: "0 4px 15px rgba(251,191,36,0.35), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.15)",
              }}
            >
              Get Started
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-slate-300 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Bottom 3D shadow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#080d1a]/98 backdrop-blur-2xl pt-20 px-6 flex flex-col"
          >
            <div className="flex flex-col gap-3 mt-4">
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
                    data-testid={`mobile-nav-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.name}
                    <ChevronRight size={18} className={active ? "text-[#080d1a]" : "text-slate-500"} />
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="mt-2 flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-[#080d1a] font-bold"
                style={{
                  background: "linear-gradient(145deg, #fde68a 0%, #f59e0b 50%, #d97706 100%)",
                  boxShadow: "0 4px 20px rgba(251,191,36,0.3)",
                }}
                data-testid="mobile-button-cta"
              >
                Get Started →
              </Link>
            </div>

            {/* Social in mobile menu */}
            <div className="mt-8 flex gap-4 justify-center">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-slate-400 transition-all duration-300 border border-white/10 bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40"
                >
                  <link.icon size={17} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-20 pb-16">
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

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#060b18] pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Transforming businesses into global brands through innovative digital strategies and creative excellence.
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
              <h4 className="text-sm font-bold text-white mb-5 tracking-wider uppercase">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link href={link.path} className="text-slate-400 hover:text-cyan-300 transition-colors text-sm flex items-center gap-2 group">
                      <ChevronRight size={13} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-5 tracking-wider uppercase">Contact Us</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="mailto:info@creavixit.com" className="hover:text-cyan-300 transition-colors">info@creavixit.com</a></li>
                <li><a href="mailto:creavixbd@gmail.com" className="hover:text-cyan-300 transition-colors">creavixbd@gmail.com</a></li>
                <li><a href="tel:+8809611132835" className="hover:text-cyan-300 transition-colors">+880 9611132835</a></li>
                <li>
                  <a href="https://wa.me/8801890484355" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">
                    WhatsApp: +880 1890484355
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 text-center text-xs text-slate-600 flex flex-col md:flex-row justify-between items-center gap-3">
            <p>&copy; {new Date().getFullYear()} Creavix IT Solution. All rights reserved.</p>
            <p>Crafted with excellence for global reach.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
