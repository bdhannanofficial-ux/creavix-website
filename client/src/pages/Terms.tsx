import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, CreditCard, Clock, Zap, RotateCcw, Scale, Wallet, ShieldCheck, FileCheck2, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const BENGALI_FONT = "'Hind Siliguri', 'DM Sans', sans-serif";

interface AccordionItem {
  icon: React.ElementType;
  color: string;
  glow: string;
  border: string;
  titleEn: string;
  titleBn: string;
  points: { en: string; bn: string; highlight?: { en: string; bn: string; color: string } }[];
}

const accordionData: AccordionItem[] = [
  {
    icon: CreditCard,
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.25)",
    border: "rgba(6,182,212,0.4)",
    titleEn: "Payment & Booking Policy",
    titleBn: "পেমেন্ট ও বুকিং পলিসি",
    points: [
      {
        en: "To confirm a project, 50% advance payment of the total amount (non-refundable) must be made.",
        bn: "প্রজেক্ট কনফার্ম করার জন্য মোট মূল্যের ৫০% অগ্রিম পেমেন্ট (অফেরতযোগ্য) করতে হবে।",
        highlight: { en: "50% advance payment", bn: "৫০% অগ্রিম পেমেন্ট", color: "#06b6d4" },
      },
      {
        en: "The remaining 50% must be paid at the time of project delivery or after viewing the watermarked video.",
        bn: "অবশিষ্ট ৫০% পেমেন্ট প্রজেক্ট ডেলিভারির সময় বা ওয়াটারমার্কসম ভিডিও দেখার পর পরিশোধ করতে হবে।",
      },
      {
        en: "We will deliver the final file (without watermark) only after the payment is fully cleared.",
        bn: "পেমেন্ট ক্লিয়ার হওয়ার পরেই আমরা ফাইনাল ফাইল (ওয়াটারমার্ক ছাড়া) ডেলিভারি দেব।",
      },
    ],
  },
  {
    icon: Clock,
    color: "#a855f7",
    glow: "rgba(168,85,247,0.25)",
    border: "rgba(168,85,247,0.4)",
    titleEn: "Project Delivery Timeline",
    titleBn: "প্রজেক্ট ডেলিভারি টাইমলাইন",
    points: [
      {
        en: "Standard video package delivery time is 48 to 72 hours.",
        bn: "সাধারণ ভিডিও প্যাকেজের জন্য ডেলিভারি সময় ৪৮ থেকে ৭২ ঘন্টা।",
        highlight: { en: "48 to 72 hours", bn: "৪৮ থেকে ৭২ ঘন্টা", color: "#a855f7" },
      },
      {
        en: "For large projects or custom videos, the timeline will be determined through mutual discussion.",
        bn: "বড় প্রজেক্ট বা কাস্টম ভিডিওর ক্ষেত্রে আলোচনার মাধ্যমে সময় নির্ধারণ করা হবে।",
      },
      {
        en: "Fridays and public holidays have limited official activities, which may affect delivery time.",
        bn: "শুক্রবার এবং সরকারি ছুটির দিন অফিশিয়াল কার্যক্রম সীমিত থাকে, যা ডেলিভারির সময়ে প্রভাব ফেলতে পারে।",
      },
    ],
  },
  {
    icon: Zap,
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.25)",
    border: "rgba(245,158,11,0.4)",
    titleEn: "Emergency Service & Charges",
    titleBn: "জরুরি সার্ভিস ও চার্জ",
    points: [
      {
        en: "For urgent delivery within 24 hours, a 20% additional charge applies on top of the regular price.",
        bn: "জরুরি ডেলিভারি (২৪ ঘন্টার মধ্যে) প্রয়োজন হলে রেগুলার প্রাইসের সাথে ২০% অতিরিক্ত চার্জ প্রযোজ্য হবে।",
        highlight: { en: "20% additional charge", bn: "২০% অতিরিক্ত চার্জ", color: "#f59e0b" },
      },
      {
        en: "For immediate support, please contact us through our WhatsApp hotline.",
        bn: "তাৎক্ষণিক সাপোর্টের জন্য আমাদের হোয়াটসঅ্যাপ হটলাইনে যোগাযোগ করতে হবে।",
      },
    ],
  },
  {
    icon: RotateCcw,
    color: "#22c55e",
    glow: "rgba(34,197,94,0.25)",
    border: "rgba(34,197,94,0.4)",
    titleEn: "File Storage & Revision Policy",
    titleBn: "ফাইল সংরক্ষণ ও রিভিশন",
    points: [
      {
        en: "We offer a maximum of 1 free revision per project for minor error corrections.",
        bn: "আমরা প্রতিটি প্রজেক্টে সর্বোচ্চ ১ বার ফ্রি রিভিশন সুবিধা দেই (ছোট ভুল সংশোধনের জন্য)।",
        highlight: { en: "1 free revision", bn: "১ বার ফ্রি রিভিশন", color: "#22c55e" },
      },
      {
        en: "Additional charges apply for major modifications such as content or voice changes.",
        bn: "কন্টেন্ট বা ভয়েস চেঞ্জ করার মতো বড় পরিবর্তনের জন্য অতিরিক্ত চার্জ প্রযোজ্য হবে।",
      },
      {
        en: "After delivery, your files are stored on our server for 7 days and then automatically deleted.",
        bn: "ডেলিভারির পর আপনার ফাইল আমাদের সার্ভারে ৭ দিন সংরক্ষিত থাকবে। এরপর এটোমেটিক ডিলিট হয়ে যাবে।",
        highlight: { en: "7 days", bn: "৭ দিন", color: "#22c55e" },
      },
    ],
  },
  {
    icon: Scale,
    color: "#ec4899",
    glow: "rgba(236,72,153,0.25)",
    border: "rgba(236,72,153,0.4)",
    titleEn: "Copyright & Legal Notice",
    titleBn: "কপিরাইট ও আইনি সতর্কতা",
    points: [
      {
        en: "We do not create content that violates Bangladesh's Broadcasting Ministry policies or is politically or religiously inciting.",
        bn: "বাংলাদেশ তথ্য ও সম্প্রচার মন্ত্রণালয়ের নীতিমালা পরিপন্থী, রাজনৈতিক বা ধর্মীয় উসকানিমূলক কোনো কনটেন্ট আমরা তৈরি করি না।",
      },
      {
        en: "We use copyright-free music and footage. If a client provides specific music, the copyright responsibility lies solely with the client.",
        bn: "আমরা কপিরাইট ফ্রি মিউজিক ও ফুটেজ ব্যবহার করি, তবে ক্লায়েন্ট কোনো নির্দিষ্ট মিউজিক দিলে তার কপিরাইট দায়ভার ক্লায়েন্টকেই নিতে হবে।",
      },
    ],
  },
  {
    icon: Wallet,
    color: "#10b981",
    glow: "rgba(16,185,129,0.25)",
    border: "rgba(16,185,129,0.4)",
    titleEn: "Money-Back & Refund Policy",
    titleBn: "মানিব্যাগ ও রিফান্ড পলিসি",
    points: [
      {
        en: "If we fail to deliver work on time, or if there is a major unresolvable error, we guarantee a 100% Refund. Your satisfaction is our primary goal.",
        bn: "যদি আমরা নির্ধারিত সময়ে কাজ দিতে বার্থ হই অথবা আমাদের কাজে বড় কোনো ত্রুটি থাকে যা সংশোধনযোগ্য নয়, তবে আমরা ১০০% টাকা ফেরত (Refund) দেওয়ার নিশ্চয়তা দিচ্ছি। আপনার সন্তুষ্টি আমাদের প্রধান লক্ষ্য।",
        highlight: { en: "100% Refund", bn: "১০০% টাকা ফেরত (Refund)", color: "#10b981" },
      },
    ],
  },
];

function HighlightedText({ text, highlight, color, isBn }: {
  text: string; highlight?: { en: string; bn: string; color: string }; color: string; isBn: boolean;
}) {
  if (!highlight) return <>{text}</>;
  const keyword = isBn ? highlight.bn : highlight.en;
  const parts = text.split(keyword);
  if (parts.length < 2) return <>{text}</>;
  return (
    <>
      {parts[0]}
      <strong style={{ color: highlight.color, fontWeight: 700 }}>{keyword}</strong>
      {parts.slice(1).join(keyword)}
    </>
  );
}

export default function Terms() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isBn = lang === "bn";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i);

  const heroTitle = isBn ? "নীতিমালা ও শর্তাবলি" : "Terms & Conditions";
  const heroBadge = isBn ? "আইনি নথি" : "Legal Document";
  const heroSub = isBn
    ? "ক্রিয়েভিক্স আইটি সলিউশনের সাথে কাজ করার আগে অনুগ্রহ করে এই নীতিমালা মনোযোগ দিয়ে পড়ুন।"
    : "Please read these policies carefully before working with Creavix IT Solution.";
  const lastUpdated = isBn ? "সর্বশেষ আপডেট: মার্চ ২০২৬" : "Last Updated: March 2026";
  const backHome = isBn ? "হোমে ফিরুন" : "Back to Home";
  const sections = isBn ? "মোট বিভাগ" : "Total Sections";

  return (
    <Layout>
      <main
        className="min-h-screen"
        style={{
          background: isDark
            ? "linear-gradient(180deg, #04020c 0%, #060e1c 40%, #040812 100%)"
            : "linear-gradient(180deg, #f0f4ff 0%, #e8f0fe 40%, #f5f8ff 100%)",
          fontFamily: isBn ? BENGALI_FONT : undefined,
        }}
      >
        {/* ── Background glows ── */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div style={{ position: "absolute", top: "-10%", left: "20%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(6,182,212,${isDark ? "0.07" : "0.04"}) 0%, transparent 65%)` }} />
          <div style={{ position: "absolute", top: "30%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, rgba(168,85,247,${isDark ? "0.06" : "0.03"}) 0%, transparent 65%)` }} />
          <div style={{ position: "absolute", bottom: "10%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(34,197,94,${isDark ? "0.05" : "0.03"}) 0%, transparent 65%)` }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-18">

          {/* ── Breadcrumb ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-8 text-xs"
          >
            <Link href="/"
              className="transition-colors font-medium"
              style={{ color: isDark ? "rgba(148,163,184,0.7)" : "rgba(71,85,105,0.8)" }}
            >
              {backHome}
            </Link>
            <ChevronRight className="w-3 h-3" style={{ color: isDark ? "rgba(148,163,184,0.4)" : "rgba(71,85,105,0.4)" }} />
            <span style={{ color: isDark ? "rgba(6,182,212,0.9)" : "rgba(6,182,212,1)" }}>
              {isBn ? "নীতিমালা" : "Terms"}
            </span>
          </motion.div>

          {/* ── Hero Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-14"
          >
            {/* Badge */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{
                  background: "rgba(6,182,212,0.1)",
                  border: "1px solid rgba(6,182,212,0.3)",
                  color: "#22d3ee",
                }}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                {heroBadge}
              </div>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight"
              style={{
                color: isDark ? "white" : "rgba(7,12,25,0.95)",
                fontFamily: isBn ? BENGALI_FONT : "var(--font-display, 'Outfit', sans-serif)",
              }}
            >
              {heroTitle}
            </h1>
            <p
              className="text-sm sm:text-base leading-relaxed mb-5 max-w-2xl"
              style={{ color: isDark ? "rgba(148,163,184,0.85)" : "rgba(71,85,105,0.9)" }}
            >
              {heroSub}
            </p>

            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-xs" style={{ color: isDark ? "rgba(148,163,184,0.6)" : "rgba(100,116,139,0.8)" }}>
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" style={{ color: "#22c55e" }} />
                <span>{lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: isDark ? "rgba(148,163,184,0.6)" : "rgba(100,116,139,0.8)" }}>
                <FileCheck2 className="w-3.5 h-3.5 shrink-0" style={{ color: "#06b6d4" }} />
                <span>{sections}: {accordionData.length}</span>
              </div>
            </div>

            {/* Divider */}
            <div
              className="mt-8 h-px w-full rounded-full"
              style={{ background: isDark ? "linear-gradient(90deg, rgba(6,182,212,0.3), rgba(168,85,247,0.2), transparent)" : "linear-gradient(90deg, rgba(6,182,212,0.25), rgba(168,85,247,0.15), transparent)" }}
            />
          </motion.div>

          {/* ── Accordion ── */}
          <div className="space-y-3">
            {accordionData.map((item, i) => {
              const isOpen = openIndex === i;
              const Icon = item.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  {/* Outer wrapper — gradient border when open */}
                  <div
                    className="rounded-2xl transition-all duration-300"
                    style={{
                      padding: isOpen ? "1.5px" : "0",
                      background: isOpen
                        ? `linear-gradient(135deg, ${item.border}, rgba(255,255,255,0.05))`
                        : "transparent",
                    }}
                  >
                    <div
                      className="rounded-2xl overflow-hidden"
                      style={{
                        background: isOpen
                          ? isDark ? "rgba(10,16,30,0.98)" : "rgba(255,255,255,0.97)"
                          : isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                        border: isOpen ? "none" : `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                        boxShadow: isOpen
                          ? `0 8px 40px ${item.glow}, 0 2px 12px rgba(0,0,0,0.2)`
                          : isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 1px 4px rgba(0,0,0,0.04)",
                        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    >
                      {/* Header button */}
                      <button
                        onClick={() => toggle(i)}
                        data-testid={`accordion-toggle-${i}`}
                        className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 sm:py-4.5 text-left transition-all duration-200"
                        style={{
                          touchAction: "manipulation",
                          WebkitTapHighlightColor: "transparent",
                          minHeight: "60px",
                        } as React.CSSProperties}
                        aria-expanded={isOpen}
                      >
                        {/* Icon */}
                        <div
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                          style={{
                            background: isOpen
                              ? `linear-gradient(135deg, ${item.color}28, ${item.color}14)`
                              : isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                            border: `1.5px solid ${isOpen ? item.border : isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                            boxShadow: isOpen ? `0 4px 16px ${item.glow}` : "none",
                          }}
                        >
                          <Icon
                            className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300"
                            style={{ color: isOpen ? item.color : isDark ? "rgba(148,163,184,0.7)" : "rgba(71,85,105,0.7)" }}
                          />
                        </div>

                        {/* Title */}
                        <span
                          className="flex-1 font-bold text-sm sm:text-base leading-snug transition-colors duration-200"
                          style={{
                            color: isOpen
                              ? isDark ? "white" : "rgba(7,12,25,0.95)"
                              : isDark ? "rgba(255,255,255,0.82)" : "rgba(30,41,59,0.85)",
                            fontFamily: isBn ? BENGALI_FONT : undefined,
                          }}
                        >
                          {isBn ? item.titleBn : item.titleEn}
                        </span>

                        {/* Toggle button */}
                        <div
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                          style={{
                            background: isOpen
                              ? item.color
                              : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
                            boxShadow: isOpen ? `0 4px 12px ${item.glow}` : "none",
                          }}
                        >
                          {isOpen
                            ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: isDark ? "rgba(148,163,184,0.7)" : "rgba(71,85,105,0.7)" }} />
                          }
                        </div>
                      </button>

                      {/* Expandable content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                            style={{ overflow: "hidden" }}
                          >
                            {/* Separator */}
                            <div
                              className="mx-4 sm:mx-5 h-px mb-4"
                              style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
                            />

                            <div className="px-4 sm:px-5 pb-5 sm:pb-6 space-y-3">
                              {item.points.map((pt, j) => (
                                <motion.div
                                  key={j}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.25, delay: j * 0.06 }}
                                  className="flex items-start gap-3"
                                >
                                  {/* Bullet dot */}
                                  <div
                                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                                    style={{ background: item.color }}
                                  />
                                  <p
                                    className="text-sm sm:text-sm leading-relaxed"
                                    style={{
                                      color: isDark ? "rgba(203,213,225,0.85)" : "rgba(51,65,85,0.9)",
                                      fontFamily: isBn ? BENGALI_FONT : undefined,
                                    }}
                                  >
                                    <HighlightedText
                                      text={isBn ? pt.bn : pt.en}
                                      highlight={pt.highlight}
                                      color={item.color}
                                      isBn={isBn}
                                    />
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 sm:mt-16 rounded-2xl p-6 sm:p-8 text-center"
            style={{
              background: isDark
                ? "linear-gradient(135deg, rgba(6,182,212,0.06), rgba(168,85,247,0.06))"
                : "linear-gradient(135deg, rgba(6,182,212,0.06), rgba(168,85,247,0.04))",
              border: isDark ? "1px solid rgba(6,182,212,0.15)" : "1px solid rgba(6,182,212,0.2)",
            }}
          >
            <ShieldCheck className="w-8 h-8 mx-auto mb-3" style={{ color: "#22c55e" }} />
            <h3
              className="text-lg sm:text-xl font-bold mb-2"
              style={{ color: isDark ? "white" : "rgba(7,12,25,0.9)", fontFamily: isBn ? BENGALI_FONT : undefined }}
            >
              {isBn ? "আপনার সন্তুষ্টি আমাদের প্রতিশ্রুতি" : "Your Satisfaction Is Our Commitment"}
            </h3>
            <p
              className="text-sm mb-5"
              style={{ color: isDark ? "rgba(148,163,184,0.8)" : "rgba(71,85,105,0.85)", fontFamily: isBn ? BENGALI_FONT : undefined }}
            >
              {isBn
                ? "কোনো প্রশ্ন থাকলে আমাদের সাথে সরাসরি যোগাযোগ করুন।"
                : "Have questions? Reach out to us directly — we're here to help."}
            </p>
            <Link href="/contact"
              data-testid="link-terms-contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #a855f7)",
                color: "white",
                boxShadow: "0 4px 20px rgba(6,182,212,0.3)",
                touchAction: "manipulation",
                fontFamily: isBn ? BENGALI_FONT : undefined,
              } as React.CSSProperties}
            >
              {isBn ? "যোগাযোগ করুন" : "Contact Us"}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </main>
    </Layout>
  );
}
