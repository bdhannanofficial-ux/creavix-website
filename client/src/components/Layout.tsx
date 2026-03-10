import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram, FaXTwitter } from "react-icons/fa6";
import logoImg from "@assets/new-logo_1773114552036.png";

const navLinks = [
  { name: "Portfolio", path: "/" },
  { name: "Our Team", path: "/team" },
  { name: "Contact & Review", path: "/contact" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "https://web.facebook.com/CreavixITSolution" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/creavix-it-solution" },
  { icon: FaYoutube, href: "https://www.youtube.com/@CreavixiTsolution" },
  { icon: FaInstagram, href: "https://www.instagram.com/creavixit" },
  { icon: FaXTwitter, href: "https://x.com/creavixit" },
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary/30">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      <div className="fixed inset-0 z-[-1] bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "glass-nav py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src={logoImg} 
              alt="Creavix IT Solution" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary ${
                  location === link.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 flex flex-col"
          >
            <div className="flex flex-col gap-6 text-2xl font-display font-bold">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex items-center justify-between border-b border-white/10 pb-4 ${
                    location === link.path ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                  <ChevronRight size={20} className="opacity-50" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-background/50 backdrop-blur-sm pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <img src={logoImg} alt="Creavix Logo" className="h-12 w-auto mb-6 opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
              <p className="text-muted-foreground mb-6 max-w-sm">
                Transforming your business into a global brand through innovative strategies and creative brilliance.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  >
                    <link.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-display font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link href={link.path} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                      <ChevronRight size={14} />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-display font-bold mb-6">Contact Us</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="mailto:info@creavixit.com" className="hover:text-primary transition-colors">info@creavixit.com</a></li>
                <li><a href="tel:+8809611132835" className="hover:text-primary transition-colors">+880 9611132835</a></li>
                <li><a href="https://wa.me/8801890484355" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp: +880 1890484355</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 text-center text-sm text-muted-foreground/60 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Creavix IT Solution. All rights reserved.</p>
            <p>Designed with excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
