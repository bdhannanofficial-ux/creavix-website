import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "bn";

const translations = {
  en: {
    // Nav
    nav_portfolio: "Portfolio",
    nav_team: "Our Team",
    nav_contact: "Contact",
    nav_blog: "Blog",
    nav_terms: "Terms & Policy",
    nav_get_started: "Get Started",
    nav_search_placeholder: "Search...",
    // Header
    verified_agency: "Verified Agency",
    topbar_marquee: "Creavix IT Solution — Premium Video Production & Digital Marketing Agency  |  info@creavixit.com  |  +880 9611132835  |  WhatsApp: +880 1890484355",
    // Hero
    hero_ai_badge: "AI-Powered Agency",
    hero_headline: "Transforming Visions into",
    hero_headline_accent: "Global Brands",
    hero_sub: "We blend innovative strategy with premium commercial video production to elevate your business in the digital landscape.",
    hero_cta_primary: "Start Your Project",
    hero_cta_secondary: "View Our Work",
    hero_feat_projects: "3700+ Projects",
    hero_feat_quality: "Premium Quality",
    hero_feat_ai: "AI Enhanced",
    // Categories
    cat_label: "Category",
    cat1_title: "Storytelling Video Ads",
    cat1_desc: "Captivating narratives that connect with your audience on an emotional level.",
    cat2_title: "Professional Product Video Ads",
    cat2_desc: "Highlighting features and benefits with crystal-clear commercial quality.",
    cat3_title: "Travel Agency Video Ads",
    cat3_desc: "Breathtaking visuals that inspire wanderlust and drive bookings.",
    cat4_title: "Multiple Ad Variations",
    cat4_desc: "A/B tested creative formats designed for maximum conversion rates.",
    // Stats
    stats_badge: "Our Achievements",
    stats_heading: "Our Success in Numbers",
    stats_sub: "Earning the trust of clients worldwide through premium quality",
    stat_projects_label: "Total Projects Delivered",
    stat_projects_sub: "Successfully completed",
    stat_clients_label: "Satisfied Clients",
    stat_clients_sub: "Trusted worldwide",
    stat_stars_label: "Five-Star Ratings",
    stat_stars_sub: "Verified reviews",
    stat_satisfaction_label: "Client Satisfaction",
    stat_satisfaction_sub: "Committed quality",
    stat_country_bd: "Bangladesh",
    stat_country_us: "USA",
    stat_country_uk: "UK",
    stat_country_uae: "UAE",
    stat_country_sa: "Saudi",
    stat_country_ca: "Canada",
    // Team
    team_heading: "Meet the",
    team_heading_accent: "Visionaries",
    team_sub: "The creative minds behind the global standard production of Creavix IT Solution.",
    founder_badge: "Founder & CEO",
    founder_quote: "Over a decade of experience in digital marketing and branding. My goal is not celebration, but to transform your business into a global brand through the combination of innovative strategy and creativity.",
    facebook_connect: "Connect on Facebook",
    linkedin_connect: "Connect on LinkedIn",
    expert_team_heading: "Our",
    expert_team_accent: "Expert Team",
    team_role_senior_editor: "Senior Video Editor",
    team_exp_4yr: "4 Years",
    team_exp_3yr: "3 Years",
    sabbir_bio: "A unique name in the world of video editing and motion graphics. He is an expert in transforming ordinary footage into premium-level commercial advertisements.",
    shajnine_bio: "She is an expert in creative visual storytelling and aesthetic editing. Skilled at understanding customer psychology to create the right music and sound design.",
    // Contact
    contact_heading: "Let's Build Something",
    contact_accent: "Great",
    contact_sub: "Ready to transform your brand? Leave us a review or get in touch. We'd love to hear from you.",
    contact_info_heading: "Contact Information",
    email_label: "Email Us",
    phone_label: "Call Us",
    whatsapp_label: "WhatsApp Official",
    social_heading: "Connect Globally",
    form_heading: "Send a Message & Review",
    rate_label: "Rate Your Experience",
    name_label: "Full Name",
    name_placeholder: "John Doe",
    email_placeholder: "john@example.com",
    message_label: "Message or Review",
    message_placeholder: "Tell us about your project or share your experience...",
    submit_btn: "Submit Review & Message",
    submitting: "Sending...",
    success_msg: "Thank you! Your message and review have been received.",
    error_msg: "Something went wrong. Please try again later.",
    // Blog
    blog_heading: "Our",
    blog_accent: "Blog",
    blog_sub: "Insights, tips, and stories from the world of digital marketing and video production.",
    read_more: "Read More",
    min_read: "min read",
    blog_label: "Creavix Blog",
    blog_key_takeaways: "Key Takeaways",
    blog_start_project: "Start Your Project",
    blog_back: "Back to Blog",
    blog_share: "Share",
    blog_author: "Creavix Editorial Team",
    blog_author_role: "Digital Marketing & Video Production Experts",
    blog_cta_text: "Ready to implement these strategies for your brand?",
    // Location / Map
    contact_address_label: "Office Address",
    contact_address: "1340, East Hati Road, Hemayetpur, Savar, Dhaka.",
    contact_location_heading: "Our Location",
    map_open: "Open in Google Maps",
    map_get_directions: "Get Directions",
    footer_address_label: "Address",
    // Footer
    footer_tagline: "Transforming businesses into global brands through innovative digital strategies and creative excellence.",
    footer_quicklinks: "Quick Links",
    footer_contact: "Contact Us",
    footer_rights: "All rights reserved.",
    footer_crafted: "Crafted with excellence for global reach.",
    footer_find: "Find anything on our website",
    // Order CTA
    order_badge: "Global Standard Quality",
    order_heading: "Ready to Elevate Your Brand?",
    order_heading_accent: "Order Now",
    order_sub: "Get your professional video ad produced by Bangladesh's top AI-powered agency. Fast delivery, HD quality, global standard.",
    order_btn: "Order Now on WhatsApp",
    order_watch: "Watch Our Work",
    order_step1_title: "1. Message Us",
    order_step1_sub: "Tell us your vision",
    order_step2_title: "2. Get Quote",
    order_step2_sub: "Transparent pricing",
    order_step3_title: "3. Receive Video",
    order_step3_sub: "HD delivery in days",
    order_guarantee: "100% Satisfaction Guaranteed",
    order_whatsapp_msg: "Hello Creavix IT Solution! I found your portfolio and I'm interested in ordering a professional video ad. Please share the packages and pricing. Thank you!",
    order_footer_cta: "Start a Project Today",
    // Search
    search_results: "Search Results",
    search_no_results: "No results found",
    search_visit: "Visit Page",
  },
  bn: {
    // Nav
    nav_portfolio: "পোর্টফোলিও",
    nav_team: "আমাদের টিম",
    nav_contact: "যোগাযোগ",
    nav_blog: "ব্লগ",
    nav_terms: "নীতিমালা",
    nav_get_started: "শুরু করুন",
    nav_search_placeholder: "খুঁজুন...",
    // Header
    verified_agency: "যাচাইকৃত এজেন্সি",
    topbar_marquee: "ক্রিয়েভিক্স আইটি সলিউশন — প্রিমিয়াম ভিডিও প্রোডাকশন ও ডিজিটাল মার্কেটিং এজেন্সি  |  info@creavixit.com  |  +৮৮০ ৯৬১১১৩২৮৩৫  |  হোয়াটসঅ্যাপ: +৮৮০ ১৮৯০৪৮৪৩৫৫",
    // Hero
    hero_ai_badge: "এআই-চালিত এজেন্সি",
    hero_headline: "আপনার স্বপ্নকে রূপান্তর করুন",
    hero_headline_accent: "গ্লোবাল ব্র্যান্ডে",
    hero_sub: "ইনোভেটিভ স্ট্র্যাটেজি ও প্রিমিয়াম কমার্শিয়াল ভিডিও প্রোডাকশনের মাধ্যমে আমরা আপনার ব্যবসাকে ডিজিটাল জগতে এগিয়ে নিয়ে যাই।",
    hero_cta_primary: "প্রজেক্ট শুরু করুন",
    hero_cta_secondary: "আমাদের কাজ দেখুন",
    hero_feat_projects: "৩৭০০+ প্রজেক্ট",
    hero_feat_quality: "প্রিমিয়াম মান",
    hero_feat_ai: "এআই উন্নত",
    // Categories
    cat_label: "ক্যাটাগরি",
    cat1_title: "স্টোরি টেলিং ভিডিও বিজ্ঞাপন",
    cat1_desc: "আপনার দর্শকের সাথে আবেগের স্তরে সংযোগ স্থাপনকারী আকর্ষণীয় আখ্যান।",
    cat2_title: "প্রফেশনাল প্রডাক্ট ভিডিও AD",
    cat2_desc: "ক্রিস্টাল-ক্লিয়ার কমার্শিয়াল মানের সাথে ফিচার এবং সুবিধাগুলি তুলে ধরা।",
    cat3_title: "ট্রাভেল এজেন্সি ভিডিও অ্যাড",
    cat3_desc: "শ্বাসরুদ্ধকর ভিজ্যুয়াল যা ভ্রমণের আকাঙ্ক্ষা জাগায় এবং বুকিং বাড়ায়।",
    cat4_title: "মাল্টিপল এড ভ্যারিয়েশন",
    cat4_desc: "সর্বোচ্চ রূপান্তর হারের জন্য ডিজাইন করা A/B পরীক্ষিত ক্রিয়েটিভ ফরম্যাট।",
    // Stats
    stats_badge: "আমাদের অর্জন",
    stats_heading: "সংখ্যায় আমাদের সাফল্য",
    stats_sub: "বিশ্বব্যাপী ক্লায়েন্টদের বিশ্বাস অর্জন করেছি প্রিমিয়াম মানের মাধ্যমে",
    stat_projects_label: "মোট প্রজেক্ট ডেলিভারি",
    stat_projects_sub: "সফলভাবে সম্পন্ন",
    stat_clients_label: "সন্তুষ্ট ক্লায়েন্ট",
    stat_clients_sub: "বিশ্বব্যাপী বিশ্বস্ত",
    stat_stars_label: "ফাইভ স্টার রেটিং",
    stat_stars_sub: "যাচাইকৃত পর্যালোচনা",
    stat_satisfaction_label: "ক্লায়েন্ট সন্তুষ্টি",
    stat_satisfaction_sub: "প্রতিশ্রুতিবদ্ধ মান",
    stat_country_bd: "বাংলাদেশ",
    stat_country_us: "আমেরিকা",
    stat_country_uk: "যুক্তরাজ্য",
    stat_country_uae: "আরব আমিরাত",
    stat_country_sa: "সৌদি",
    stat_country_ca: "কানাডা",
    // Team
    team_heading: "পরিচয় করুন",
    team_heading_accent: "আমাদের বিশেষজ্ঞদের সাথে",
    team_sub: "ক্রিয়েভিক্স আইটি সলিউশনের গ্লোবাল মানের প্রোডাকশনের পেছনে থাকা সৃজনশীল মনগুলি।",
    founder_badge: "প্রতিষ্ঠাতা ও সিইও",
    founder_quote: "ডিজিটাল মার্কেটিং ও ব্র্যান্ডিং জগতে দীর্ঘ এক দশকেরও বেশি সময়ের অভিজ্ঞতা। আমার লক্ষ্য উদযাপন নয়, বরং ইনোভেটিভ স্ট্র্যাটেজি ও ক্রিয়েটিভিটির সংমিশ্রণে আপনার ব্যবসাকে একটি গ্লোবাল ব্র্যান্ডে রূপান্তর করা।",
    facebook_connect: "ফেসবুকে সংযুক্ত হন",
    linkedin_connect: "লিংকডইনে সংযুক্ত হন",
    expert_team_heading: "আমাদের",
    expert_team_accent: "বিশেষজ্ঞ টিম",
    team_role_senior_editor: "সিনিয়র ভিডিও এডিটর",
    team_exp_4yr: "৪ বছর",
    team_exp_3yr: "৩ বছর",
    sabbir_bio: "ভিডিও এডিটিং এবং মোশন গ্রাফিক্সের জগতে এক অনন্য নাম। সাধারণ ফুটেজকে প্রিমিয়াম লেভেলের কমার্শিয়াল বিজ্ঞাপনে রূপান্তর করতে তিনি সিদ্ধহস্ত।",
    shajnine_bio: "সৃজনশীল ভিজ্যুয়াল স্টোরিটেলিং এবং নান্দনিক এডিটিংয়ে তিনি একজন এক্সপার্ট। কাস্টমারের মনস্তত্ত্ব বুঝে সঠিক মিউজিক ও সাউন্ড ডিজাইন তৈরি করতে দক্ষ।",
    // Contact
    contact_heading: "আসুন কিছু",
    contact_accent: "অসাধারণ করি",
    contact_sub: "আপনার ব্র্যান্ড রূপান্তর করতে প্রস্তুত? আমাদের একটি রিভিউ দিন বা যোগাযোগ করুন। আমরা আপনার কথা শুনতে চাই।",
    contact_info_heading: "যোগাযোগের তথ্য",
    email_label: "ইমেইল করুন",
    phone_label: "ফোন করুন",
    whatsapp_label: "হোয়াটসঅ্যাপ অফিশিয়াল",
    social_heading: "গ্লোবালি সংযুক্ত হন",
    form_heading: "বার্তা ও রিভিউ পাঠান",
    rate_label: "আপনার অভিজ্ঞতা রেট করুন",
    name_label: "পূর্ণ নাম",
    name_placeholder: "আপনার নাম",
    email_placeholder: "আপনার ইমেইল",
    message_label: "বার্তা বা রিভিউ",
    message_placeholder: "আপনার প্রজেক্ট সম্পর্কে বলুন বা অভিজ্ঞতা শেয়ার করুন...",
    submit_btn: "রিভিউ ও বার্তা পাঠান",
    submitting: "পাঠানো হচ্ছে...",
    success_msg: "ধন্যবাদ! আপনার বার্তা ও রিভিউ পাওয়া গেছে।",
    error_msg: "কিছু একটা ভুল হয়েছে। পরে আবার চেষ্টা করুন।",
    // Blog
    blog_heading: "আমাদের",
    blog_accent: "ব্লগ",
    blog_sub: "ডিজিটাল মার্কেটিং ও ভিডিও প্রোডাকশনের জগত থেকে অন্তর্দৃষ্টি, টিপস এবং গল্প।",
    read_more: "আরও পড়ুন",
    min_read: "মিনিট পড়া",
    blog_label: "ক্রিয়েভিক্স ব্লগ",
    blog_key_takeaways: "মূল বিষয়সমূহ",
    blog_start_project: "প্রজেক্ট শুরু করুন",
    blog_back: "ব্লগে ফিরে যান",
    blog_share: "শেয়ার",
    blog_author: "ক্রিয়েভিক্স সম্পাদকীয় দল",
    blog_author_role: "ডিজিটাল মার্কেটিং ও ভিডিও প্রোডাকশন বিশেষজ্ঞ",
    blog_cta_text: "আপনার ব্র্যান্ডের জন্য এই কৌশলগুলি বাস্তবায়ন করতে চান?",
    // Location / Map
    contact_address_label: "অফিস ঠিকানা",
    contact_address: "১৩৪০, পূর্ব হাটি রোড, হেমায়েতপুর, সাভার, ঢাকা।",
    contact_location_heading: "আমাদের অবস্থান",
    map_open: "গুগল ম্যাপে দেখুন",
    map_get_directions: "দিকনির্দেশনা পান",
    footer_address_label: "ঠিকানা",
    // Footer
    footer_tagline: "ইনোভেটিভ ডিজিটাল স্ট্র্যাটেজি ও সৃজনশীল উৎকর্ষের মাধ্যমে ব্যবসাকে গ্লোবাল ব্র্যান্ডে রূপান্তর করা।",
    footer_quicklinks: "দ্রুত লিংক",
    footer_contact: "যোগাযোগ করুন",
    footer_rights: "সর্বস্বত্ব সংরক্ষিত।",
    footer_crafted: "গ্লোবাল রিচের জন্য উৎকর্ষের সাথে তৈরি।",
    footer_find: "ওয়েবসাইটে যা চান খুঁজে নিন",
    // Search
    search_results: "সার্চ ফলাফল",
    search_no_results: "কোনো ফলাফল পাওয়া যায়নি",
    search_visit: "পেজ দেখুন",
    // Order CTA (Bengali)
    order_badge: "গ্লোবাল মানের পেশাদারিত্ব",
    order_heading: "আপনার ব্র্যান্ড কি প্রস্তুত?",
    order_heading_accent: "এখনই অর্ডার করুন",
    order_sub: "বাংলাদেশের শীর্ষ AI-চালিত এজেন্সিতে প্রফেশনাল ভিডিও বিজ্ঞাপন তৈরি করুন। দ্রুত ডেলিভারি, HD মান, গ্লোবাল স্ট্যান্ডার্ড।",
    order_btn: "হোয়াটসঅ্যাপে অর্ডার করুন",
    order_watch: "আমাদের কাজ দেখুন",
    order_step1_title: "১. মেসেজ করুন",
    order_step1_sub: "আপনার ধারণা জানান",
    order_step2_title: "২. কোটেশন নিন",
    order_step2_sub: "স্বচ্ছ মূল্য তালিকা",
    order_step3_title: "৩. ভিডিও পান",
    order_step3_sub: "HD তে দ্রুত ডেলিভারি",
    order_guarantee: "১০০% সন্তুষ্টির গ্যারান্টি",
    order_whatsapp_msg: "হ্যালো ক্রিয়েভিক্স আইটি সলিউশন! আপনাদের পোর্টফোলিও দেখে আগ্রহী হয়েছি। প্রফেশনাল ভিডিও অ্যাড অর্ডার করতে চাই। প্যাকেজ ও মূল্য সম্পর্কে জানান। ধন্যবাদ!",
    order_footer_cta: "আজই প্রজেক্ট শুরু করুন",
  }
};

type TranslationKeys = keyof typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: TranslationKeys): string => {
    return translations[lang][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div className={lang === "bn" ? "font-bengali" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
