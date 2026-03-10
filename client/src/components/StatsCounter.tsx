import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star, Trophy, Users, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function useAnimatedCount(target: number, duration: number = 2000, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, trigger]);
  return count;
}

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
  color: string;
  trigger: boolean;
  delay?: number;
  isRating?: boolean;
  ratingValue?: number;
}

function StatCard({ icon, value, suffix, label, sublabel, color, trigger, delay = 0, isRating, ratingValue }: StatCardProps) {
  const count = useAnimatedCount(value, 1800, trigger);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8 hover:border-white/20 transition-all duration-500 hover:bg-white/[0.05]"
        style={{ boxShadow: `0 0 40px ${color}15, inset 0 1px 0 rgba(255,255,255,0.08)` }}>
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 50% 0%, ${color}10, transparent 70%)` }} />
        <div className="relative z-10 flex flex-col items-center text-center gap-3">
          <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}20`, color }}>
            {icon}
          </div>
          <div>
            <div className="flex items-end justify-center gap-0.5">
              <span className="text-4xl md:text-5xl font-black tracking-tight text-white" data-testid={`stat-count-${label}`}>
                {count.toLocaleString()}
              </span>
              {suffix && <span className="text-2xl md:text-3xl font-bold mb-1" style={{ color }}>{suffix}</span>}
            </div>
            {isRating && ratingValue !== undefined && (
              <div className="flex justify-center gap-0.5 mt-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 text-amber-400 text-sm font-semibold">{ratingValue.toFixed(1)}</span>
              </div>
            )}
          </div>
          <div>
            <p className="text-white font-bold text-base md:text-lg leading-tight">{label}</p>
            {sublabel && <p className="text-white/50 text-xs md:text-sm mt-0.5">{sublabel}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function StatsCounter() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [trigger, setTrigger] = useState(false);
  const prevInView = useRef(false);

  const { data: stats } = useQuery<{ totalReviews: number; fiveStarCount: number; averageRating: number }>({
    queryKey: ['/api/stats'],
    refetchInterval: 30000,
  });

  useEffect(() => {
    if (isInView && !prevInView.current) {
      setTrigger(false);
      requestAnimationFrame(() => setTrigger(true));
    }
    prevInView.current = isInView;
  }, [isInView]);

  const fiveStarTotal = (stats?.fiveStarCount ?? 0) + 847;
  const avgRating = stats?.averageRating ?? 5.0;

  const statsData = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      value: 3700,
      suffix: "+",
      label: language === 'bn' ? "মোট প্রজেক্ট ডেলিভারি" : "Total Projects Delivered",
      sublabel: language === 'bn' ? "সফলভাবে সম্পন্ন" : "Successfully completed",
      color: "#06b6d4",
      delay: 0,
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: 2100,
      suffix: "+",
      label: language === 'bn' ? "সন্তুষ্ট ক্লায়েন্ট" : "Satisfied Clients",
      sublabel: language === 'bn' ? "বিশ্বব্যাপী বিশ্বস্ত" : "Trusted worldwide",
      color: "#a855f7",
      delay: 0.15,
    },
    {
      icon: <Star className="w-6 h-6 fill-current" />,
      value: fiveStarTotal,
      suffix: "",
      label: language === 'bn' ? "ফাইভ স্টার রেটিং" : "Five-Star Ratings",
      sublabel: language === 'bn' ? "যাচাইকৃত পর্যালোচনা" : "Verified reviews",
      color: "#f59e0b",
      delay: 0.3,
      isRating: true,
      ratingValue: avgRating,
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      value: 100,
      suffix: "%",
      label: language === 'bn' ? "ক্লায়েন্ট সন্তুষ্টি" : "Client Satisfaction",
      sublabel: language === 'bn' ? "প্রতিশ্রুতিবদ্ধ মান" : "Committed quality",
      color: "#10b981",
      delay: 0.45,
    },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 relative overflow-hidden" data-testid="stats-section">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent pointer-events-none" />
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Star className="w-3.5 h-3.5 fill-current" />
            {language === 'bn' ? "আমাদের অর্জন" : "Our Achievements"}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {language === 'bn' ? "সংখ্যায় আমাদের সাফল্য" : "Our Success in Numbers"}
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            {language === 'bn'
              ? "বিশ্বব্যাপী ক্লায়েন্টদের বিশ্বাস অর্জন করেছি আমরা"
              : "Earning the trust of clients worldwide through premium quality work"}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statsData.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              sublabel={stat.sublabel}
              color={stat.color}
              trigger={trigger}
              delay={stat.delay}
              isRating={stat.isRating}
              ratingValue={stat.ratingValue}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={trigger ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {[
            { flag: "🇧🇩", label: "Bangladesh" },
            { flag: "🇺🇸", label: "USA" },
            { flag: "🇬🇧", label: "UK" },
            { flag: "🇦🇪", label: "UAE" },
            { flag: "🇸🇦", label: "Saudi Arabia" },
            { flag: "🇨🇦", label: "Canada" },
          ].map(c => (
            <span key={c.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium">
              <span>{c.flag}</span>{c.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
