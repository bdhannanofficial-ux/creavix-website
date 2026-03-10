import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star, Trophy, Users, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function useAnimatedCount(target: number, duration: number = 1600, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) { setCount(0); return; }
    let raf: number;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
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
  index: number;
}

function StatCard({ icon, value, suffix, label, sublabel, color, trigger, delay = 0, isRating, ratingValue, index }: StatCardProps) {
  const count = useAnimatedCount(value, 1600, trigger);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      data-testid={`stat-card-${index}`}
    >
      <div
        className="relative group flex flex-col gap-3 p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-400 overflow-hidden"
        style={{ boxShadow: `0 0 24px ${color}10, inset 0 1px 0 rgba(255,255,255,0.06)` }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{ background: `radial-gradient(circle at 30% 20%, ${color}0d, transparent 65%)` }}
        />

        {/* Icon */}
        <div
          className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}22`, color }}
        >
          {icon}
        </div>

        {/* Number */}
        <div className="relative">
          <div className="flex items-baseline gap-0.5">
            <span
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
              data-testid={`stat-count-${index}`}
            >
              {count.toLocaleString()}
            </span>
            {suffix && (
              <span className="text-lg sm:text-xl font-bold" style={{ color }}>
                {suffix}
              </span>
            )}
          </div>

          {isRating && ratingValue !== undefined && (
            <div className="flex items-center gap-0.5 mt-1">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-amber-400 text-xs font-bold">{ratingValue.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Label */}
        <div className="relative -mt-1">
          <p className="text-sm font-semibold text-foreground leading-tight">{label}</p>
          {sublabel && (
            <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function StatsCounter() {
  const { lang: language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });
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
      icon: <Briefcase className="w-4 h-4" />,
      value: 3700,
      suffix: "+",
      label: language === 'bn' ? "মোট প্রজেক্ট ডেলিভারি" : "Total Projects Delivered",
      sublabel: language === 'bn' ? "সফলভাবে সম্পন্ন" : "Successfully completed",
      color: "#06b6d4",
      delay: 0,
    },
    {
      icon: <Users className="w-4 h-4" />,
      value: 2100,
      suffix: "+",
      label: language === 'bn' ? "সন্তুষ্ট ক্লায়েন্ট" : "Satisfied Clients",
      sublabel: language === 'bn' ? "বিশ্বব্যাপী বিশ্বস্ত" : "Trusted worldwide",
      color: "#a855f7",
      delay: 0.1,
    },
    {
      icon: <Star className="w-4 h-4 fill-current" />,
      value: fiveStarTotal,
      suffix: "",
      label: language === 'bn' ? "ফাইভ স্টার রেটিং" : "Five-Star Ratings",
      sublabel: language === 'bn' ? "যাচাইকৃত পর্যালোচনা" : "Verified reviews",
      color: "#f59e0b",
      delay: 0.2,
      isRating: true,
      ratingValue: avgRating,
    },
    {
      icon: <Trophy className="w-4 h-4" />,
      value: 100,
      suffix: "%",
      label: language === 'bn' ? "ক্লায়েন্ট সন্তুষ্টি" : "Client Satisfaction",
      sublabel: language === 'bn' ? "প্রতিশ্রুতিবদ্ধ মান" : "Committed quality",
      color: "#10b981",
      delay: 0.3,
    },
  ];

  return (
    <section ref={ref} className="py-10 md:py-16 relative overflow-hidden" data-testid="stats-section">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Star className="w-3 h-3 fill-current" />
            {language === 'bn' ? "আমাদের অর্জন" : "Our Achievements"}
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-black text-foreground">
            {language === 'bn' ? "সংখ্যায় আমাদের সাফল্য" : "Our Success in Numbers"}
          </h2>
          <p className="text-muted-foreground text-sm mt-1.5 max-w-md mx-auto">
            {language === 'bn'
              ? "বিশ্বব্যাপী ক্লায়েন্টদের বিশ্বাস অর্জন করেছি"
              : "Earning the trust of clients worldwide through premium quality"}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {statsData.map((stat, i) => (
            <StatCard
              key={stat.label}
              index={i}
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

        {/* Country flags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={trigger ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-7 flex flex-wrap justify-center gap-2"
        >
          {[
            { flag: "🇧🇩", label: "Bangladesh" },
            { flag: "🇺🇸", label: "USA" },
            { flag: "🇬🇧", label: "UK" },
            { flag: "🇦🇪", label: "UAE" },
            { flag: "🇸🇦", label: "Saudi" },
            { flag: "🇨🇦", label: "Canada" },
          ].map(c => (
            <span
              key={c.label}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-muted-foreground text-xs font-medium border border-white/10 bg-white/[0.03]"
            >
              <span>{c.flag}</span>{c.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
