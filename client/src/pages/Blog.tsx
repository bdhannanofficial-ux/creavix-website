import { Layout } from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Tag } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    titleEn: "Why Storytelling Ads Convert 3x Better Than Traditional Ads",
    titleBn: "কেন স্টোরিটেলিং বিজ্ঞাপন ঐতিহ্যগত বিজ্ঞাপনের চেয়ে ৩ গুণ বেশি কনভার্ট করে",
    excerptEn: "In today's saturated digital landscape, brands that tell stories consistently outperform those pushing direct sales. Discover the neuroscience behind emotional storytelling and how Creavix crafts campaigns that stay in viewers' minds long after the screen goes dark.",
    excerptBn: "আজকের পরিপৃক্ত ডিজিটাল ল্যান্ডস্কেপে, যে ব্র্যান্ডগুলি গল্প বলে তারা সরাসরি বিক্রয় চাপ দেওয়াদের চেয়ে ধারাবাহিকভাবে ভালো পারফর্ম করে। আবেগময় স্টোরিটেলিংয়ের নিউরোসায়েন্স আবিষ্কার করুন।",
    category: "Video Strategy",
    categoryBn: "ভিডিও কৌশল",
    readTime: 5,
    date: "March 5, 2026",
    dateBn: "৫ মার্চ, ২০২৬",
    gradient: "from-purple-500/20 to-cyan-500/20",
    tag: "Trending",
    tagBn: "ট্রেন্ডিং",
  },
  {
    id: 2,
    titleEn: "The Ultimate Guide to Product Video Ads for E-commerce",
    titleBn: "ই-কমার্সের জন্য প্রডাক্ট ভিডিও AD-এর চূড়ান্ত গাইড",
    excerptEn: "Product videos generate 80% of consumer confidence before a purchase. Learn the exact framework Creavix uses to produce scroll-stopping, purchase-driving product ads that work across Facebook, Instagram, and YouTube.",
    excerptBn: "প্রডাক্ট ভিডিও ক্রয়ের আগে ৮০% ভোক্তার আস্থা তৈরি করে। ক্রিয়েভিক্স ঠিক কোন ফ্রেমওয়ার্ক ব্যবহার করে তা জানুন।",
    category: "E-commerce",
    categoryBn: "ই-কমার্স",
    readTime: 7,
    date: "February 22, 2026",
    dateBn: "২২ ফেব্রুয়ারি, ২০২৬",
    gradient: "from-amber-500/20 to-orange-500/20",
    tag: "Popular",
    tagBn: "জনপ্রিয়",
  },
  {
    id: 3,
    titleEn: "How to Build a Global Brand from Bangladesh in 2026",
    titleBn: "২০২৬ সালে বাংলাদেশ থেকে কীভাবে একটি গ্লোবাল ব্র্যান্ড তৈরি করবেন",
    excerptEn: "The digital revolution has leveled the playing field. With the right creative partner and strategic execution, Bangladeshi businesses are now competing and winning on the global stage. Here's the blueprint.",
    excerptBn: "ডিজিটাল বিপ্লব মাঠকে সমতল করে দিয়েছে। সঠিক ক্রিয়েটিভ পার্টনার ও কৌশলগত বাস্তবায়নের মাধ্যমে বাংলাদেশি ব্যবসাগুলি এখন গ্লোবাল স্তরে প্রতিযোগিতা করছে।",
    category: "Branding",
    categoryBn: "ব্র্যান্ডিং",
    readTime: 8,
    date: "February 10, 2026",
    dateBn: "১০ ফেব্রুয়ারি, ২০২৬",
    gradient: "from-green-500/20 to-teal-500/20",
    tag: "Featured",
    tagBn: "ফিচার্ড",
  },
  {
    id: 4,
    titleEn: "5 Motion Graphics Trends Dominating 2026",
    titleBn: "২০২৬ সালে আধিপত্য করা ৫টি মোশন গ্রাফিক্স ট্রেন্ড",
    excerptEn: "From kinetic typography to 3D product renders, motion graphics have evolved dramatically. Our senior editors break down the top five visual trends your brand should be leveraging right now.",
    excerptBn: "কাইনেটিক টাইপোগ্রাফি থেকে ৩ডি প্রডাক্ট রেন্ডার পর্যন্ত, মোশন গ্রাফিক্স নাটকীয়ভাবে বিকশিত হয়েছে। আমাদের সিনিয়র এডিটররা শীর্ষ পাঁচটি ট্রেন্ড ব্যাখ্যা করছেন।",
    category: "Motion Graphics",
    categoryBn: "মোশন গ্রাফিক্স",
    readTime: 4,
    date: "January 28, 2026",
    dateBn: "২৮ জানুয়ারি, ২০২৬",
    gradient: "from-pink-500/20 to-rose-500/20",
    tag: "Design",
    tagBn: "ডিজাইন",
  },
  {
    id: 5,
    titleEn: "Travel Video Marketing: Why Visual Emotion Sells Destinations",
    titleBn: "ট্রাভেল ভিডিও মার্কেটিং: কেন ভিজ্যুয়াল আবেগ গন্তব্য বিক্রি করে",
    excerptEn: "Travel agencies that invest in professional video content see up to 64% more direct bookings. We explore how carefully crafted cinematic travel ads trigger the wanderlust response and drive immediate action.",
    excerptBn: "যে ট্রাভেল এজেন্সিগুলি প্রফেশনাল ভিডিও কন্টেন্টে বিনিয়োগ করে তারা ৬৪% বেশি সরাসরি বুকিং পায়।",
    category: "Travel Marketing",
    categoryBn: "ট্রাভেল মার্কেটিং",
    readTime: 6,
    date: "January 15, 2026",
    dateBn: "১৫ জানুয়ারি, ২০২৬",
    gradient: "from-blue-500/20 to-sky-500/20",
    tag: "Travel",
    tagBn: "ট্রাভেল",
  },
  {
    id: 6,
    titleEn: "Measuring ROI on Your Video Ad Campaigns: A Complete Framework",
    titleBn: "আপনার ভিডিও বিজ্ঞাপন ক্যাম্পেইনে ROI পরিমাপ করা: একটি সম্পূর্ণ ফ্রেমওয়ার্ক",
    excerptEn: "Great creative without measurement is guesswork. Learn the KPIs that actually matter — from watch-time and scroll-stop rate to cost-per-acquisition — and how to use data to continuously improve your campaigns.",
    excerptBn: "পরিমাপ ছাড়া দুর্দান্ত ক্রিয়েটিভ অনুমান মাত্র। KPI গুলি শিখুন যা আসলে গুরুত্বপূর্ণ।",
    category: "Analytics",
    categoryBn: "অ্যানালিটিক্স",
    readTime: 9,
    date: "January 3, 2026",
    dateBn: "৩ জানুয়ারি, ২০২৬",
    gradient: "from-violet-500/20 to-purple-500/20",
    tag: "Analytics",
    tagBn: "অ্যানালিটিক্স",
  },
];

export default function Blog() {
  const { lang, t } = useLanguage();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
          data-testid="blog-header"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
            <BookOpen size={13} />
            {lang === "bn" ? "ক্রিয়েভিক্স ব্লগ" : "Creavix Blog"}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {t("blog_heading")} <span className="text-gradient-primary">{t("blog_accent")}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("blog_sub")}
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12"
          data-testid="blog-featured"
        >
          <div className={`glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/20 transition-all duration-500 group cursor-pointer bg-gradient-to-br ${blogPosts[0].gradient}`}>
            <div className="p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/20">
                    {lang === "bn" ? blogPosts[0].tagBn : blogPosts[0].tag}
                  </span>
                  <span className="text-slate-500 text-xs flex items-center gap-1">
                    <Tag size={11} />
                    {lang === "bn" ? blogPosts[0].categoryBn : blogPosts[0].category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-4 group-hover:text-gradient-primary transition-all leading-tight">
                  {lang === "bn" ? blogPosts[0].titleBn : blogPosts[0].titleEn}
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6 text-lg max-w-2xl">
                  {lang === "bn" ? blogPosts[0].excerptBn : blogPosts[0].excerptEn}
                </p>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock size={13} />
                    {blogPosts[0].readTime} {t("min_read")}
                  </span>
                  <span className="text-xs text-slate-500">
                    {lang === "bn" ? blogPosts[0].dateBn : blogPosts[0].date}
                  </span>
                </div>
              </div>
              <div className="shrink-0 self-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-all duration-300">
                  <ArrowRight size={26} className="text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              data-testid={`blog-card-${post.id}`}
            >
              <div className={`glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/20 transition-all duration-500 h-full flex flex-col bg-gradient-to-br ${post.gradient}`}>
                {/* Top color accent bar */}
                <div className={`h-1 bg-gradient-to-r ${post.gradient.replace('/20', '')} opacity-70`} />
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-slate-400 border border-white/8">
                      {lang === "bn" ? post.categoryBn : post.category}
                    </span>
                    <span className="text-[10px] text-slate-600 flex items-center gap-1">
                      <Clock size={10} /> {post.readTime} {t("min_read")}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-display font-bold text-white mb-3 leading-snug group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {lang === "bn" ? post.titleBn : post.titleEn}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed flex-grow mb-6 line-clamp-3">
                    {lang === "bn" ? post.excerptBn : post.excerptEn}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-[11px] text-slate-600">
                      {lang === "bn" ? post.dateBn : post.date}
                    </span>
                    <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t("read_more")} <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Layout>
  );
}

function BookOpen({ size, className }: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}
