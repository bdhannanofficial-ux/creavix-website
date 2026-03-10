import { useState, useRef, useEffect } from "react";
import { Search, X, ArrowRight, Film, Users, BookOpen, Phone } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  path: string;
  icon: typeof Film;
  category: string;
  categoryBn: string;
  keywords: string[];
}

const searchIndex: SearchResult[] = [
  {
    id: "1",
    title: "Storytelling Video Ads",
    titleBn: "স্টোরি টেলিং ভিডিও বিজ্ঞাপন",
    description: "Captivating narratives that connect emotionally with audiences.",
    descriptionBn: "আবেগের সাথে দর্শকের সাথে সংযোগ স্থাপনকারী আকর্ষণীয় আখ্যান।",
    path: "/",
    icon: Film,
    category: "Portfolio",
    categoryBn: "পোর্টফোলিও",
    keywords: ["story", "storytelling", "video", "ad", "narrative", "স্টোরি", "ভিডিও", "বিজ্ঞাপন"],
  },
  {
    id: "2",
    title: "Product Video Ads",
    titleBn: "প্রফেশনাল প্রডাক্ট ভিডিও AD",
    description: "Premium commercial quality product advertisement videos.",
    descriptionBn: "প্রিমিয়াম কমার্শিয়াল মানের প্রডাক্ট বিজ্ঞাপন ভিডিও।",
    path: "/",
    icon: Film,
    category: "Portfolio",
    categoryBn: "পোর্টফোলিও",
    keywords: ["product", "commercial", "ad", "video", "প্রডাক্ট", "কমার্শিয়াল", "বিজ্ঞাপন"],
  },
  {
    id: "3",
    title: "Travel Agency Video Ads",
    titleBn: "ট্রাভেল এজেন্সি ভিডিও অ্যাড",
    description: "Breathtaking travel visuals that inspire wanderlust.",
    descriptionBn: "ভ্রমণের আকাঙ্ক্ষা জাগানো শ্বাসরুদ্ধকর ভিজ্যুয়াল।",
    path: "/",
    icon: Film,
    category: "Portfolio",
    categoryBn: "পোর্টফোলিও",
    keywords: ["travel", "tourism", "agency", "ট্রাভেল", "ভ্রমণ"],
  },
  {
    id: "4",
    title: "Multiple Ad Variations",
    titleBn: "মাল্টিপল এড ভ্যারিয়েশন",
    description: "A/B tested creative ad formats for maximum conversion.",
    descriptionBn: "সর্বোচ্চ রূপান্তরের জন্য A/B পরীক্ষিত বিজ্ঞাপন ফরম্যাট।",
    path: "/",
    icon: Film,
    category: "Portfolio",
    categoryBn: "পোর্টফোলিও",
    keywords: ["multiple", "ads", "variation", "conversion", "মাল্টিপল", "বিজ্ঞাপন"],
  },
  {
    id: "5",
    title: "Hannan Khan – Founder & CEO",
    titleBn: "হান্নান খান – প্রতিষ্ঠাতা ও সিইও",
    description: "Over a decade of digital marketing & branding experience.",
    descriptionBn: "ডিজিটাল মার্কেটিং ও ব্র্যান্ডিংয়ে এক দশকেরও বেশি অভিজ্ঞতা।",
    path: "/team",
    icon: Users,
    category: "Team",
    categoryBn: "টিম",
    keywords: ["hannan", "khan", "founder", "ceo", "হান্নান", "প্রতিষ্ঠাতা"],
  },
  {
    id: "6",
    title: "Sabbir Khan – Senior Video Editor",
    titleBn: "সাব্বির খান – সিনিয়র ভিডিও এডিটর",
    description: "Expert in transforming footage into premium commercial ads.",
    descriptionBn: "ফুটেজকে প্রিমিয়াম কমার্শিয়াল বিজ্ঞাপনে রূপান্তর বিশেষজ্ঞ।",
    path: "/team",
    icon: Users,
    category: "Team",
    categoryBn: "টিম",
    keywords: ["sabbir", "editor", "motion", "graphics", "সাব্বির", "এডিটর"],
  },
  {
    id: "7",
    title: "Shajnine Jahan – Senior Video Editor",
    titleBn: "শাজনিন জাহান – সিনিয়র ভিডিও এডিটর",
    description: "Expert in creative visual storytelling and aesthetic editing.",
    descriptionBn: "সৃজনশীল ভিজ্যুয়াল স্টোরিটেলিং ও নান্দনিক এডিটিংয়ে বিশেষজ্ঞ।",
    path: "/team",
    icon: Users,
    category: "Team",
    categoryBn: "টিম",
    keywords: ["shajnine", "jahan", "editor", "sound", "শাজনিন", "এডিটর"],
  },
  {
    id: "8",
    title: "Contact & Reviews",
    titleBn: "যোগাযোগ ও রিভিউ",
    description: "Get in touch with Creavix IT Solution or leave a review.",
    descriptionBn: "ক্রিয়েভিক্স আইটি সলিউশনের সাথে যোগাযোগ করুন বা রিভিউ দিন।",
    path: "/contact",
    icon: Phone,
    category: "Contact",
    categoryBn: "যোগাযোগ",
    keywords: ["contact", "review", "email", "phone", "whatsapp", "যোগাযোগ", "রিভিউ"],
  },
  {
    id: "9",
    title: "Digital Marketing Tips",
    titleBn: "ডিজিটাল মার্কেটিং টিপস",
    description: "Expert insights on growing your brand online.",
    descriptionBn: "অনলাইনে ব্র্যান্ড বাড়ানোর বিশেষজ্ঞ পরামর্শ।",
    path: "/blog",
    icon: BookOpen,
    category: "Blog",
    categoryBn: "ব্লগ",
    keywords: ["marketing", "blog", "tips", "digital", "মার্কেটিং", "ব্লগ"],
  },
  {
    id: "10",
    title: "Video Production Guide",
    titleBn: "ভিডিও প্রোডাকশন গাইড",
    description: "How to create high-converting video advertisements.",
    descriptionBn: "হাই-কনভার্টিং ভিডিও বিজ্ঞাপন তৈরির পদ্ধতি।",
    path: "/blog",
    icon: BookOpen,
    category: "Blog",
    categoryBn: "ব্লগ",
    keywords: ["video", "production", "guide", "ভিডিও", "প্রোডাকশন", "গাইড"],
  },
  {
    id: "11",
    title: "Creavix IT Solution",
    titleBn: "ক্রিয়েভিক্স আইটি সলিউশন",
    description: "Global standard digital marketing & video production agency.",
    descriptionBn: "গ্লোবাল মানের ডিজিটাল মার্কেটিং ও ভিডিও প্রোডাকশন এজেন্সি।",
    path: "/",
    icon: Film,
    category: "Portfolio",
    categoryBn: "পোর্টফোলিও",
    keywords: ["creavix", "agency", "it", "solution", "ক্রিয়েভিক্স", "এজেন্সি"],
  },
];

interface SearchBarProps {
  variant?: "navbar" | "footer";
  onClose?: () => void;
}

export function SearchBar({ variant = "navbar", onClose }: SearchBarProps) {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim().length > 0
    ? searchIndex.filter(item => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.titleBn.includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.descriptionBn.includes(q) ||
          item.keywords.some(k => k.includes(q))
        );
      }).slice(0, 6)
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = () => {
    setQuery("");
    setOpen(false);
    onClose?.();
  };

  if (variant === "footer") {
    return (
      <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder={t("nav_search_placeholder")}
            className="w-full bg-white/5 border border-white/10 rounded-full px-5 pl-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/30 transition-all"
          />
          {query && (
            <button onClick={() => { setQuery(""); setOpen(false); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X size={16} />
            </button>
          )}
        </div>
        <SearchDropdown results={results} open={open && query.length > 0} lang={lang} t={t} onSelect={handleSelect} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <div className={`relative flex items-center transition-all duration-300 ${open ? "w-52 md:w-64" : "w-36 md:w-44"}`}>
        <Search className="absolute left-3 text-slate-400" size={15} />
        <input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={t("nav_search_placeholder")}
          data-testid="input-search"
          className="w-full bg-white/[0.06] border border-white/10 rounded-full px-4 pl-8 py-2 text-[12px] text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 focus:border-cyan-500/30 transition-all"
        />
        {query && (
          <button onClick={() => { setQuery(""); setOpen(false); }} className="absolute right-3 text-slate-500 hover:text-white">
            <X size={13} />
          </button>
        )}
      </div>
      <SearchDropdown results={results} open={open && query.length > 0} lang={lang} t={t} onSelect={handleSelect} />
    </div>
  );
}

function SearchDropdown({ results, open, lang, t, onSelect }: {
  results: SearchResult[];
  open: boolean;
  lang: "en" | "bn";
  t: (k: any) => string;
  onSelect: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full mt-2 right-0 w-80 bg-[#0d1628] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-[200]"
        >
          {results.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              {t("search_no_results")}
            </div>
          ) : (
            <div className="p-2">
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider px-3 py-2">
                {t("search_results")} ({results.length})
              </p>
              {results.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={onSelect}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} className="text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {lang === "bn" ? item.titleBn : item.title}
                      </p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {lang === "bn" ? item.descriptionBn : item.description}
                      </p>
                      <span className="text-[10px] text-cyan-400/70 font-medium mt-1 inline-block">
                        {lang === "bn" ? item.categoryBn : item.category}
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0 mt-1.5" />
                  </Link>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
