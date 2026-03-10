import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Tag, X, Share2, MessageCircle, Lightbulb, ChevronRight } from "lucide-react";
import { Link } from "wouter";

/* ─── Utility: Dynamic date from "days ago" ─── */
const BN_MONTHS = ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];
const EN_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function toBengaliDigits(n: number): string {
  return String(n).replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[+d]);
}

function getDateStrings(daysAgo: number): { en: string; bn: string } {
  const d = new Date(Date.now() - daysAgo * 86400000);
  const day = d.getDate(), month = d.getMonth(), year = d.getFullYear();
  return {
    en: `${EN_MONTHS[month]} ${day}, ${year}`,
    bn: `${toBengaliDigits(day)} ${BN_MONTHS[month]}, ${toBengaliDigits(year)}`,
  };
}

/* ─── Blog posts data ─── */
const blogPosts = [
  {
    id: 1,
    daysAgo: 5,
    titleEn: "Why Storytelling Ads Convert 3x Better Than Traditional Ads",
    titleBn: "কেন স্টোরিটেলিং বিজ্ঞাপন ঐতিহ্যগত বিজ্ঞাপনের চেয়ে ৩ গুণ বেশি কনভার্ট করে",
    excerptEn: "In today's saturated digital landscape, brands that tell stories consistently outperform those pushing direct sales. Discover the neuroscience behind emotional storytelling and how Creavix crafts campaigns that stay in viewers' minds long after the screen goes dark.",
    excerptBn: "আজকের পরিপৃক্ত ডিজিটাল ল্যান্ডস্কেপে, যে ব্র্যান্ডগুলি গল্প বলে তারা সরাসরি বিক্রয় চাপ দেওয়াদের চেয়ে ধারাবাহিকভাবে ভালো পারফর্ম করে। আবেগময় স্টোরিটেলিংয়ের নিউরোসায়েন্স আবিষ্কার করুন।",
    category: "Video Strategy",
    categoryBn: "ভিডিও কৌশল",
    readTime: 5,
    gradient: "from-purple-500/20 to-cyan-500/20",
    tag: "Trending",
    tagBn: "ট্রেন্ডিং",
    contentEn: [
      "The human brain is fundamentally wired for narrative. Research from Stanford University shows that stories are up to 22 times more memorable than facts alone. When your audience watches a brand ad that follows a story arc — tension, resolution, emotional payoff — their brains release oxytocin, the 'trust hormone', creating a genuine bond between viewer and brand.",
      "At Creavix IT Solution, our storytelling framework begins by identifying your customer's core pain point and crafting a narrative where they are the hero. Your brand becomes the trusted guide helping them overcome the challenge. This is the same structure used in Hollywood blockbusters — and it works equally well in a 30-second social media ad.",
      "The numbers back this up: our storytelling campaigns consistently achieve 3–5× the click-through rate of standard product showcase ads. More importantly, brand recall 30 days after viewing is 40% higher for story-based content versus direct promotional messaging. Engagement rates on platforms like Facebook and Instagram are dramatically higher for narrative content.",
      "The four essential elements of a high-converting storytelling ad are: (1) a relatable protagonist — your customer, (2) a specific problem they face daily, (3) a turning point where your product enters as the solution, and (4) an emotionally satisfying resolution that viewers aspire toward. When these align, viewers don't feel like they're watching an advertisement — they're experiencing a compelling story.",
      "For Bangladeshi businesses competing globally, storytelling bridges cultural gaps. Universal human emotions — family, aspiration, belonging, achievement — transcend language barriers and make your brand genuinely accessible to audiences worldwide. This is how local brands become global icons."
    ],
    contentBn: [
      "মানব মস্তিষ্ক মূলত আখ্যানের জন্য তৈরি। স্ট্যানফোর্ড বিশ্ববিদ্যালয়ের গবেষণা দেখায় যে গল্পগুলি শুধু তথ্যের চেয়ে ২২ গুণ বেশি স্মরণীয়। যখন আপনার দর্শক একটি গল্পের কাঠামো অনুসরণ করে একটি ব্র্যান্ড বিজ্ঞাপন দেখে — উত্তেজনা, সমাধান, আবেগময় পরিণতি — তাদের মস্তিষ্ক অক্সিটোসিন নিঃসরণ করে, যা 'বিশ্বাসের হরমোন' নামে পরিচিত।",
      "ক্রিয়েভিক্স আইটি সলিউশনে, আমাদের স্টোরিটেলিং ফ্রেমওয়ার্ক আপনার গ্রাহকের মূল সমস্যা চিহ্নিত করে শুরু হয় এবং একটি আখ্যান তৈরি করে যেখানে তারাই নায়ক। আপনার ব্র্যান্ড বিশ্বস্ত গাইড হয়ে তাদের চ্যালেঞ্জ কাটিয়ে উঠতে সাহায্য করে।",
      "সংখ্যাগুলি এটি সমর্থন করে: আমাদের স্টোরিটেলিং ক্যাম্পেইনগুলি স্ট্যান্ডার্ড পণ্য প্রদর্শনী বিজ্ঞাপনের তুলনায় ৩–৫ গুণ বেশি ক্লিক-থ্রু রেট অর্জন করে। Facebook এবং Instagram-এ narrative content-এর engagement rate নাটকীয়ভাবে বেশি।",
      "একটি উচ্চ-রূপান্তরকারী স্টোরিটেলিং বিজ্ঞাপনের চারটি অপরিহার্য উপাদান: (১) একটি সংযোগযোগ্য প্রধান চরিত্র, (২) একটি নির্দিষ্ট সমস্যা, (৩) একটি টার্নিং পয়েন্ট যেখানে আপনার পণ্য সমাধান হিসেবে প্রবেশ করে, এবং (৪) একটি সন্তোষজনক পরিণতি।",
      "বাংলাদেশি ব্যবসার জন্য যারা বৈশ্বিকভাবে প্রতিযোগিতা করছেন, স্টোরিটেলিং সাংস্কৃতিক ব্যবধান দূর করে। পরিবার, আকাঙ্ক্ষা, অর্জন — এই সার্বজনীন মানবিক আবেগগুলি ভাষার বাধা অতিক্রম করে।"
    ],
    takeawaysEn: [
      "Stories are 22× more memorable than plain facts",
      "Storytelling ads achieve 3–5× better click-through rates",
      "Brand recall is 40% higher after 30 days for story-based content",
      "4-element framework: protagonist → problem → solution → resolution",
    ],
    takeawaysBn: [
      "গল্পগুলি সাধারণ তথ্যের চেয়ে ২২ গুণ বেশি স্মরণীয়",
      "স্টোরিটেলিং বিজ্ঞাপন ৩–৫ গুণ বেশি ক্লিক-থ্রু রেট অর্জন করে",
      "৩০ দিন পরে ব্র্যান্ড রিকল ৪০% বেশি",
      "৪-উপাদান ফ্রেমওয়ার্ক: নায়ক → সমস্যা → সমাধান → পরিণতি",
    ],
  },
  {
    id: 2,
    daysAgo: 16,
    titleEn: "The Ultimate Guide to Product Video Ads for E-commerce",
    titleBn: "ই-কমার্সের জন্য প্রডাক্ট ভিডিও AD-এর চূড়ান্ত গাইড",
    excerptEn: "Product videos generate 80% of consumer confidence before a purchase. Learn the exact framework Creavix uses to produce scroll-stopping, purchase-driving product ads that work across Facebook, Instagram, and YouTube.",
    excerptBn: "প্রডাক্ট ভিডিও ক্রয়ের আগে ৮০% ভোক্তার আস্থা তৈরি করে। ক্রিয়েভিক্স ঠিক কোন ফ্রেমওয়ার্ক ব্যবহার করে তা জানুন।",
    category: "E-commerce",
    categoryBn: "ই-কমার্স",
    readTime: 7,
    gradient: "from-amber-500/20 to-orange-500/20",
    tag: "Popular",
    tagBn: "জনপ্রিয়",
    contentEn: [
      "E-commerce businesses that invest in product video ads see an average 80% increase in purchase confidence among potential buyers. In an era where shoppers cannot physically touch or try products, video bridges the critical trust gap — showcasing texture, scale, functionality, and quality in a way that static images simply cannot.",
      "The Creavix product video framework follows a proven three-phase structure. Phase one is the 'Hook' (first 3 seconds): a visually striking shot that stops the scroll and creates immediate curiosity. Phase two is the 'Show' (seconds 4–20): multiple angles, use-case demonstrations, and feature highlights presented with dynamic motion graphics. Phase three is the 'Convert' (final 5–10 seconds): a compelling call-to-action with offer urgency or social proof.",
      "Lighting is the single most important technical factor in product videos. Professional lighting setup — key light, fill light, and rim light — makes even ordinary products look premium and desirable. Our production team uses cinema-grade equipment to ensure every product looks its best from every angle.",
      "Platform optimization is critical: Facebook favors square (1:1) or vertical (4:5) formats with captions (85% of Facebook videos are watched on mute), while YouTube performs better with horizontal (16:9) content. We produce multiple versions optimized for each platform as part of our standard package.",
      "Our most successful product campaigns combine three video variants: a lifestyle video showing the product in real-world use, a close-up detail video highlighting quality and craftsmanship, and a comparison or before/after video demonstrating value. This multi-angle approach typically increases ROAS (Return on Ad Spend) by 2.3× versus single-video campaigns."
    ],
    contentBn: [
      "যে ই-কমার্স ব্যবসাগুলি প্রডাক্ট ভিডিও বিজ্ঞাপনে বিনিয়োগ করে তারা সম্ভাব্য ক্রেতাদের মধ্যে ক্রয় আস্থায় গড়ে ৮০% বৃদ্ধি দেখে। যেখানে ক্রেতারা পণ্য শারীরিকভাবে স্পর্শ করতে পারে না, ভিডিও সেই বিশ্বাসের ব্যবধান পূরণ করে।",
      "ক্রিয়েভিক্সের প্রডাক্ট ভিডিও ফ্রেমওয়ার্ক তিনটি ধাপ অনুসরণ করে: প্রথমে 'হুক' (প্রথম ৩ সেকেন্ড) — স্ক্রোল থামানোর একটি চাক্ষুষ শট। দ্বিতীয়ত 'শো' (৪–২০ সেকেন্ড) — একাধিক কোণ এবং ফিচার হাইলাইট। তৃতীয়ত 'কনভার্ট' (শেষ ৫–১০ সেকেন্ড) — একটি আকর্ষণীয় কল-টু-অ্যাকশন।",
      "লাইটিং প্রডাক্ট ভিডিওতে সবচেয়ে গুরুত্বপূর্ণ প্রযুক্তিগত উপাদান। পেশাদার আলোক সেটআপ সাধারণ পণ্যকেও প্রিমিয়াম দেখায়। আমাদের প্রোডাকশন টিম সিনেমা-গ্রেড যন্ত্রপাতি ব্যবহার করে।",
      "প্ল্যাটফর্ম অপ্টিমাইজেশন গুরুত্বপূর্ণ: Facebook বর্গাকার (১:১) বা উলম্ব (৪:৫) ফরম্যাট পছন্দ করে ক্যাপশন সহ, YouTube অনুভূমিক (১৬:৯) কন্টেন্টে ভালো পারফর্ম করে।",
      "আমাদের সেরা প্রডাক্ট ক্যাম্পেইনগুলি তিনটি ভিডিও ভেরিয়েন্ট ব্যবহার করে: একটি লাইফস্টাইল ভিডিও, একটি ক্লোজ-আপ ডিটেইল ভিডিও, এবং একটি বিফোর/আফটার ভিডিও। এই মাল্টি-অ্যাঙ্গেল পদ্ধতি ROAS ২.৩ গুণ বাড়িয়ে দেয়।"
    ],
    takeawaysEn: [
      "Product videos boost purchase confidence by 80%",
      "3-phase framework: Hook → Show → Convert",
      "Professional lighting is the #1 technical factor",
      "Multi-format production (1:1, 4:5, 16:9) for different platforms",
    ],
    takeawaysBn: [
      "প্রডাক্ট ভিডিও ক্রয় আস্থা ৮০% বাড়ায়",
      "৩-ধাপ ফ্রেমওয়ার্ক: হুক → শো → কনভার্ট",
      "প্রফেশনাল লাইটিং সবচেয়ে গুরুত্বপূর্ণ",
      "বিভিন্ন প্ল্যাটফর্মের জন্য মাল্টি-ফরম্যাট প্রোডাকশন",
    ],
  },
  {
    id: 3,
    daysAgo: 28,
    titleEn: "How to Build a Global Brand from Bangladesh in 2026",
    titleBn: "২০২৬ সালে বাংলাদেশ থেকে কীভাবে একটি গ্লোবাল ব্র্যান্ড তৈরি করবেন",
    excerptEn: "The digital revolution has leveled the playing field. With the right creative partner and strategic execution, Bangladeshi businesses are now competing and winning on the global stage. Here's the blueprint.",
    excerptBn: "ডিজিটাল বিপ্লব মাঠকে সমতল করে দিয়েছে। সঠিক ক্রিয়েটিভ পার্টনার ও কৌশলগত বাস্তবায়নের মাধ্যমে বাংলাদেশি ব্যবসাগুলি এখন গ্লোবাল স্তরে প্রতিযোগিতা করছে।",
    category: "Branding",
    categoryBn: "ব্র্যান্ডিং",
    readTime: 8,
    gradient: "from-green-500/20 to-teal-500/20",
    tag: "Featured",
    tagBn: "ফিচার্ড",
    contentEn: [
      "A decade ago, the idea of a Bangladeshi business competing with multinational brands on a global digital stage seemed like an ambitious dream. Today, it is an achievable reality — and Creavix IT Solution exists specifically to make it happen for our clients.",
      "The foundation of global brand building starts with visual identity consistency. Your brand must look and feel premium across every touchpoint: your website, social media, video content, and packaging. This is not about copying Western aesthetics — it's about developing a distinctive visual language that is both globally understood and authentically yours.",
      "Video content is the most powerful globalizing force available to businesses today. A beautifully produced brand film communicates quality, vision, and values to a viewer in Tokyo, London, or Dubai within 60 seconds — without a single word of translation needed. The visual language of cinema is universal.",
      "The strategic approach involves three pillars: First, define a crystal-clear brand positioning statement — who you serve, what problem you solve, and why you do it better. Second, produce anchor content (brand film, product videos, team videos) that captures your story with cinematic quality. Third, distribute strategically across platforms where your target audience spends their digital time — Facebook, YouTube, LinkedIn, and Instagram each require different content approaches.",
      "Bangladeshi brands have unique strengths to leverage globally: craftsmanship, cultural richness, and competitive pricing for premium quality. When these are communicated through world-class video production, they become compelling competitive advantages rather than perceived limitations."
    ],
    contentBn: [
      "এক দশক আগে, একটি বাংলাদেশি ব্যবসা বৈশ্বিক ডিজিটাল মঞ্চে বহুজাতিক ব্র্যান্ডের সাথে প্রতিযোগিতার ধারণাটি উচ্চাভিলাষী স্বপ্নের মতো ছিল। আজ, এটি একটি অর্জনযোগ্য বাস্তবতা।",
      "গ্লোবাল ব্র্যান্ড বিল্ডিং-এর ভিত্তি শুরু হয় ভিজ্যুয়াল আইডেন্টিটির ধারাবাহিকতা থেকে। আপনার ব্র্যান্ডকে প্রতিটি টাচপয়েন্টে প্রিমিয়াম দেখাতে হবে — ওয়েবসাইট, সোশ্যাল মিডিয়া, ভিডিও কন্টেন্ট।",
      "ভিডিও কন্টেন্ট আজকের ব্যবসার জন্য সবচেয়ে শক্তিশালী গ্লোবালাইজিং শক্তি। একটি সুন্দরভাবে নির্মিত ব্র্যান্ড ফিল্ম ৬০ সেকেন্ডে টোকিও, লন্ডন বা দুবাইয়ের একজন দর্শককে মান, দৃষ্টিভঙ্গি এবং মূল্যবোধ জানাতে পারে।",
      "কৌশলগত পদ্ধতিতে তিনটি স্তম্ভ রয়েছে: প্রথমত, একটি স্পষ্ট ব্র্যান্ড পজিশনিং বিবৃতি নির্ধারণ করুন। দ্বিতীয়ত, সিনেমাটিক মানের সাথে anchor content তৈরি করুন। তৃতীয়ত, আপনার লক্ষ্য দর্শকরা যেখানে থাকে সেখানে কৌশলগতভাবে বিতরণ করুন।",
      "বাংলাদেশি ব্র্যান্ডগুলির বিশ্বব্যাপী ব্যবহারের জন্য অনন্য শক্তি রয়েছে: কারুকাজ, সাংস্কৃতিক সমৃদ্ধি এবং প্রিমিয়াম মানের জন্য প্রতিযোগিতামূলক মূল্য নির্ধারণ।"
    ],
    takeawaysEn: [
      "Visual identity consistency is the foundation of global branding",
      "A 60-second brand film speaks to any audience worldwide",
      "3 pillars: clear positioning → anchor content → strategic distribution",
      "Bangladeshi craftsmanship is a global competitive advantage",
    ],
    takeawaysBn: [
      "ভিজ্যুয়াল আইডেন্টিটির ধারাবাহিকতা গ্লোবাল ব্র্যান্ডিংয়ের ভিত্তি",
      "একটি ৬০-সেকেন্ডের ব্র্যান্ড ফিল্ম বিশ্বের যেকোনো দর্শকের সাথে কথা বলে",
      "৩ স্তম্ভ: স্পষ্ট পজিশনিং → মূল কন্টেন্ট → কৌশলগত বিতরণ",
      "বাংলাদেশি কারুকাজ একটি বৈশ্বিক প্রতিযোগিতামূলক সুবিধা",
    ],
  },
  {
    id: 4,
    daysAgo: 35,
    titleEn: "5 Motion Graphics Trends Dominating 2026",
    titleBn: "২০২৬ সালে আধিপত্য করা ৫টি মোশন গ্রাফিক্স ট্রেন্ড",
    excerptEn: "From kinetic typography to 3D product renders, motion graphics have evolved dramatically. Our senior editors break down the top five visual trends your brand should be leveraging right now.",
    excerptBn: "কাইনেটিক টাইপোগ্রাফি থেকে ৩ডি প্রডাক্ট রেন্ডার পর্যন্ত, মোশন গ্রাফিক্স নাটকীয়ভাবে বিকশিত হয়েছে।",
    category: "Motion Graphics",
    categoryBn: "মোশন গ্রাফিক্স",
    readTime: 4,
    gradient: "from-pink-500/20 to-rose-500/20",
    tag: "Design",
    tagBn: "ডিজাইন",
    contentEn: [
      "Motion graphics have transformed from decorative elements into the primary communication tool for modern brands. In 2026, five dominant trends are reshaping how brands tell their stories visually — and the brands that adopt these early will have significant competitive advantages.",
      "Trend 1: Kinetic Typography with Emotional Rhythm. Text is no longer static — it bounces, breathes, and pulses in sync with audio. The best kinetic typography feels less like animation and more like the words are alive. This technique is particularly powerful for brands with strong verbal identities or catchphrases.",
      "Trend 2: Glass Morphism UI Elements. Translucent, frosted-glass interface aesthetics have moved from tech product design into mainstream video content. Product explainer videos and brand introductions using glassmorphism elements feel premium, modern, and distinctly 2026.",
      "Trend 3: Seamless 3D Product Integration. Real-time 3D rendering (via Cinema 4D, Blender, and Unreal Engine) allows products to be composited into live footage with photorealistic precision. This is the standard for premium product marketing in global markets and is now accessible to mid-sized brands.",
      "Trend 4: Data Visualization Storytelling. Complex information visualized through animated infographics and data stories creates trust and authority. Trend 5: AI-Enhanced Color Grading. Machine learning tools now suggest and apply complex cinematic color palettes in seconds, allowing consistent, Hollywood-grade visual treatment across all content."
    ],
    contentBn: [
      "মোশন গ্রাফিক্স সজ্জামূলক উপাদান থেকে আধুনিক ব্র্যান্ডের প্রাথমিক যোগাযোগ হাতিয়ারে রূপান্তরিত হয়েছে। ২০২৬ সালে, পাঁচটি প্রভাবশালী ট্রেন্ড ব্র্যান্ডগুলি তাদের গল্প দৃশ্যত বলার পদ্ধতিকে নতুনভাবে রূপান্তরিত করছে।",
      "ট্রেন্ড ১: আবেগের ছন্দে কাইনেটিক টাইপোগ্রাফি। টেক্সট আর স্থির নয় — এটি অডিওর সাথে সমন্বয়ে বাউন্স, শ্বাস নেয় এবং স্পন্দিত হয়। এই কৌশলটি শক্তিশালী ভার্বাল আইডেন্টিটি সহ ব্র্যান্ডগুলির জন্য বিশেষভাবে শক্তিশালী।",
      "ট্রেন্ড ২: গ্লাস মরফিজম UI উপাদান। স্বচ্ছ, ফ্রোস্টেড-গ্লাস নান্দনিকতা মূলধারার ভিডিও কন্টেন্টে প্রবেশ করেছে এবং প্রিমিয়াম, আধুনিক অনুভূতি দেয়।",
      "ট্রেন্ড ৩: নিরবচ্ছিন্ন ৩ডি প্রডাক্ট ইন্টিগ্রেশন। রিয়েল-টাইম ৩ডি রেন্ডারিং পণ্যগুলিকে ফটোরিয়ালিস্টিক নির্ভুলতার সাথে লাইভ ফুটেজে একীভূত করতে দেয়।",
      "ট্রেন্ড ৪: ডেটা ভিজুয়ালাইজেশন স্টোরিটেলিং। অ্যানিমেটেড ইনফোগ্রাফিক্সের মাধ্যমে জটিল তথ্য বিশ্বাস এবং কর্তৃত্ব তৈরি করে। ট্রেন্ড ৫: AI-উন্নত কালার গ্রেডিং — মেশিন লার্নিং হলিউড-গ্রেড ভিজ্যুয়াল ট্রিটমেন্ট সম্ভব করে।"
    ],
    takeawaysEn: [
      "Kinetic typography makes brand messaging feel alive",
      "Glassmorphism UI elevates video content to premium level",
      "3D product integration is now accessible to mid-sized brands",
      "AI color grading enables Hollywood-grade visual consistency",
    ],
    takeawaysBn: [
      "কাইনেটিক টাইপোগ্রাফি ব্র্যান্ড মেসেজিংকে জীবন্ত করে",
      "গ্লাসমরফিজম ভিডিও কন্টেন্টকে প্রিমিয়াম লেভেলে নিয়ে যায়",
      "৩ডি প্রডাক্ট ইন্টিগ্রেশন এখন মধ্যমাকারের ব্র্যান্ডের জন্যও সুলভ",
      "AI কালার গ্রেডিং হলিউড-গ্রেড ভিজ্যুয়াল ধারাবাহিকতা সক্ষম করে",
    ],
  },
  {
    id: 5,
    daysAgo: 46,
    titleEn: "Travel Video Marketing: Why Visual Emotion Sells Destinations",
    titleBn: "ট্রাভেল ভিডিও মার্কেটিং: কেন ভিজ্যুয়াল আবেগ গন্তব্য বিক্রি করে",
    excerptEn: "Travel agencies that invest in professional video content see up to 64% more direct bookings. We explore how carefully crafted cinematic travel ads trigger the wanderlust response and drive immediate action.",
    excerptBn: "যে ট্রাভেল এজেন্সিগুলি প্রফেশনাল ভিডিও কন্টেন্টে বিনিয়োগ করে তারা ৬৪% বেশি সরাসরি বুকিং পায়।",
    category: "Travel Marketing",
    categoryBn: "ট্রাভেল মার্কেটিং",
    readTime: 6,
    gradient: "from-blue-500/20 to-sky-500/20",
    tag: "Travel",
    tagBn: "ট্রাভেল",
    contentEn: [
      "Travel is perhaps the most emotionally driven purchase any consumer makes. Unlike buying a product, buying a travel experience requires imagining yourself in a place you have never been — a fundamentally visual and emotional act. This is why travel video marketing is uniquely powerful: it doesn't just show a destination, it transports the viewer there.",
      "The 'wanderlust trigger' is a well-documented psychological response. When humans see breathtaking natural landscapes, vibrant cultural scenes, or aspirational luxury environments, the brain's reward system activates — producing dopamine and creating a desire to experience that reality. A skilled travel video director knows exactly which shots, music, and pacing trigger this response most effectively.",
      "Creavix's travel video framework includes three essential shot types: the Establishing Shot (wide drone footage that creates scale and context), the Immersive Shot (close-up sensory details — food, textures, local faces — that make the viewer feel present), and the Aspirational Shot (beautifully composed moments showing travelers experiencing joy, relaxation, or adventure).",
      "For Bangladeshi travel agencies, the opportunity is enormous. Bangladesh possesses extraordinary natural beauty — the Sundarbans, the Chittagong Hill Tracts, Cox's Bazar — that remains largely undiscovered by international tourists. Professional video marketing can position these destinations to global audiences in a way that simple photography never could.",
      "The ROI on travel video content is among the highest of any marketing format. A well-produced destination video typically achieves 12–18 months of effectiveness, generates organic shares across social platforms, and can be repurposed across multiple campaigns. Our travel clients consistently report 40–64% increases in direct booking inquiries after launching video campaigns."
    ],
    contentBn: [
      "ট্রাভেল সম্ভবত যেকোনো ভোক্তার করা সবচেয়ে আবেগ-চালিত ক্রয়। একটি ভ্রমণ অভিজ্ঞতা কেনার জন্য কখনো না যাওয়া জায়গায় নিজেকে কল্পনা করতে হয় — এটি একটি মৌলিকভাবে চাক্ষুষ এবং আবেগময় কার্যক্রম।",
      "'wanderlust trigger' একটি সুনির্দিষ্ট মনস্তাত্ত্বিক প্রতিক্রিয়া। যখন মানুষ চমৎকার প্রাকৃতিক ভূদৃশ্য বা প্রাণবন্ত সাংস্কৃতিক দৃশ্য দেখে, মস্তিষ্কের পুরস্কার ব্যবস্থা সক্রিয় হয় এবং ডোপামিন নিঃসরণ করে।",
      "ক্রিয়েভিক্সের ট্রাভেল ভিডিও ফ্রেমওয়ার্কে তিনটি অপরিহার্য শট ধরন রয়েছে: এস্টাবলিশিং শট (বিস্তৃত ড্রোন ফুটেজ), ইমার্সিভ শট (ক্লোজ-আপ সংবেদনশীল বিবরণ), এবং অ্যাসপিরেশনাল শট (ভ্রমণকারীদের আনন্দ উপভোগ করার সুন্দর মুহূর্ত)।",
      "বাংলাদেশি ট্রাভেল এজেন্সিগুলির জন্য সুযোগ অপরিসীম। বাংলাদেশে অসাধারণ প্রাকৃতিক সৌন্দর্য রয়েছে — সুন্দরবন, চট্টগ্রাম পার্বত্য অঞ্চল, কক্সবাজার — যা আন্তর্জাতিক পর্যটকদের কাছে মূলত অপ্রকাশিত।",
      "ট্রাভেল ভিডিও কন্টেন্টে ROI যেকোনো মার্কেটিং ফরম্যাটের মধ্যে সর্বোচ্চ। একটি ভালোভাবে নির্মিত গন্তব্য ভিডিও সাধারণত ১২–১৮ মাসের কার্যকারিতা অর্জন করে। আমাদের ট্রাভেল ক্লায়েন্টরা ভিডিও ক্যাম্পেইন চালু করার পরে ৪০–৬৪% বৃদ্ধি পান।"
    ],
    takeawaysEn: [
      "Travel is the most emotionally driven purchase category",
      "3 essential travel shot types: Establishing, Immersive, Aspirational",
      "Bangladesh's natural beauty is an undiscovered global opportunity",
      "Travel video ROI: 40–64% more direct booking inquiries",
    ],
    takeawaysBn: [
      "ট্রাভেল সবচেয়ে আবেগ-চালিত ক্রয় বিভাগ",
      "৩টি অপরিহার্য ট্রাভেল শট: এস্টাবলিশিং, ইমার্সিভ, অ্যাসপিরেশনাল",
      "বাংলাদেশের প্রাকৃতিক সৌন্দর্য একটি অনাবিষ্কৃত বৈশ্বিক সুযোগ",
      "ট্রাভেল ভিডিও ROI: ৪০–৬৪% বেশি সরাসরি বুকিং",
    ],
  },
  {
    id: 6,
    daysAgo: 57,
    titleEn: "Measuring ROI on Your Video Ad Campaigns: A Complete Framework",
    titleBn: "আপনার ভিডিও বিজ্ঞাপন ক্যাম্পেইনে ROI পরিমাপ করা: একটি সম্পূর্ণ ফ্রেমওয়ার্ক",
    excerptEn: "Great creative without measurement is guesswork. Learn the KPIs that actually matter — from watch-time and scroll-stop rate to cost-per-acquisition — and how to use data to continuously improve your campaigns.",
    excerptBn: "পরিমাপ ছাড়া দুর্দান্ত ক্রিয়েটিভ অনুমান মাত্র। KPI গুলি শিখুন যা আসলে গুরুত্বপূর্ণ।",
    category: "Analytics",
    categoryBn: "অ্যানালিটিক্স",
    readTime: 9,
    gradient: "from-violet-500/20 to-purple-500/20",
    tag: "Analytics",
    tagBn: "অ্যানালিটিক্স",
    contentEn: [
      "The single biggest mistake brands make with video advertising is treating creative quality and performance measurement as separate concerns. The most beautifully produced video is worthless without a rigorous measurement framework to understand what's working, what isn't, and how to improve.",
      "The five KPIs that matter most for video campaigns are: (1) Video Completion Rate — the percentage of viewers who watch to the end. Anything above 30% is good, above 50% is excellent. (2) Scroll-Stop Rate — how often your video stops someone mid-scroll. Measured by 3-second view rate; above 40% indicates a compelling hook. (3) Cost Per Click (CPC) — the efficiency of your video at driving traffic. (4) Cost Per Acquisition (CPA) — the ultimate measure of video ROI. (5) Brand Lift — measured through survey tools on Facebook/YouTube showing awareness and consideration increases.",
      "Attribution modeling is critical but often misunderstood. Not every sale directly traceable to a video click represents the full impact of video advertising. View-through attribution (counting conversions where someone saw a video ad but didn't click, then converted later) typically shows that video campaigns drive 2–4× more conversions than direct-click attribution alone suggests.",
      "A/B testing is the most reliable way to improve campaign performance over time. The elements with the highest impact to test are: the first 3 seconds (hook), the call-to-action text and timing, and the audience targeting parameters. Never run a single video without at least one variant to compare against.",
      "At Creavix, we provide clients with a monthly performance dashboard that tracks all critical KPIs, shows trend lines across campaigns, and includes specific creative recommendations for the following month. Data without interpretation is noise — what matters is turning insights into actionable improvements."
    ],
    contentBn: [
      "ব্র্যান্ডগুলি ভিডিও বিজ্ঞাপনের সাথে সবচেয়ে বড় ভুল করে ক্রিয়েটিভ মান এবং পারফরম্যান্স পরিমাপকে আলাদা বিষয় হিসেবে বিবেচনা করে। সবচেয়ে সুন্দরভাবে নির্মিত ভিডিওও কঠোর পরিমাপ ফ্রেমওয়ার্ক ছাড়া মূল্যহীন।",
      "ভিডিও ক্যাম্পেইনের জন্য সবচেয়ে গুরুত্বপূর্ণ ৫টি KPI: (১) ভিডিও কমপ্লিশন রেট — ৩০% এর বেশি ভালো, ৫০% এর বেশি চমৎকার। (২) স্ক্রোল-স্টপ রেট — ৩-সেকেন্ড ভিউ রেট দ্বারা পরিমাপ করা হয়। (৩) কস্ট পার ক্লিক। (৪) কস্ট পার অ্যাকুইজিশন। (৫) ব্র্যান্ড লিফট।",
      "অ্যাট্রিবিউশন মডেলিং সমালোচনামূলক কিন্তু প্রায়ই ভুলভাবে বোঝা যায়। ভিউ-থ্রু অ্যাট্রিবিউশন (যেখানে কেউ ভিডিও বিজ্ঞাপন দেখেছে কিন্তু ক্লিক করেনি, তারপর পরে রূপান্তরিত হয়েছে) সাধারণত দেখায় যে ভিডিও ক্যাম্পেইনগুলি ২–৪ গুণ বেশি রূপান্তর চালায়।",
      "A/B টেস্টিং সময়ের সাথে ক্যাম্পেইন পারফরম্যান্স উন্নত করার সবচেয়ে নির্ভরযোগ্য উপায়। পরীক্ষা করার সর্বোচ্চ প্রভাব সহ উপাদানগুলি হল: প্রথম ৩ সেকেন্ড (হুক), CTA টেক্সট এবং সময়, এবং দর্শক টার্গেটিং প্যারামিটার।",
      "ক্রিয়েভিক্সে, আমরা ক্লায়েন্টদের মাসিক পারফরম্যান্স ড্যাশবোর্ড প্রদান করি যা সমস্ত গুরুত্বপূর্ণ KPI ট্র্যাক করে এবং নির্দিষ্ট ক্রিয়েটিভ সুপারিশ অন্তর্ভুক্ত করে।"
    ],
    takeawaysEn: [
      "5 must-track KPIs: Completion Rate, Scroll-Stop Rate, CPC, CPA, Brand Lift",
      "View-through attribution shows 2–4× true video impact",
      "Always A/B test at least 2 variants for every campaign",
      "Monthly performance dashboards drive continuous improvement",
    ],
    takeawaysBn: [
      "৫টি অবশ্যই-ট্র্যাক KPI: কমপ্লিশন রেট, স্ক্রোল-স্টপ রেট, CPC, CPA, ব্র্যান্ড লিফট",
      "ভিউ-থ্রু অ্যাট্রিবিউশন ২–৪ গুণ সত্যিকারের ভিডিও প্রভাব দেখায়",
      "সবসময় প্রতিটি ক্যাম্পেইনের জন্য কমপক্ষে ২টি ভেরিয়েন্ট A/B টেস্ট করুন",
      "মাসিক পারফরম্যান্স ড্যাশবোর্ড ক্রমাগত উন্নতি চালিত করে",
    ],
  },
];

/* ─── Article Modal ─── */
interface ArticleModalProps {
  post: typeof blogPosts[0];
  lang: "en" | "bn";
  onClose: () => void;
}

function ArticleModal({ post, lang, onClose }: ArticleModalProps) {
  const { t } = useLanguage();
  const dates = getDateStrings(post.daysAgo);

  return (
    <AnimatePresence>
      <motion.div
        className="blog-modal-overlay fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="blog-modal-content relative w-full max-w-3xl max-h-[88vh] overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(135deg, rgba(8,13,26,0.98) 0%, rgba(12,18,38,0.98) 100%)",
            border: "1px solid rgba(6,182,212,0.2)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.9), 0 0 60px rgba(6,182,212,0.08)",
          }}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Gradient header accent */}
          <div className={`h-1 w-full bg-gradient-to-r ${post.gradient.replace('/20','')}`} />

          {/* Scrollable body */}
          <div className="overflow-y-auto max-h-[calc(88vh-4px)]">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 sm:px-8 py-5"
              style={{ background: "rgba(8,13,26,0.96)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
                  {lang === "bn" ? post.categoryBn : post.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock size={11} />
                  {post.readTime} {t("min_read")}
                </span>
                <span className="text-xs text-slate-500">{lang === "bn" ? dates.bn : dates.en}</span>
              </div>
              <button
                onClick={onClose}
                data-testid="button-close-article"
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 sm:px-8 py-7 space-y-7">
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                {lang === "bn" ? post.titleBn : post.titleEn}
              </h2>

              {/* Article body */}
              <div className="space-y-5">
                {(lang === "bn" ? post.contentBn : post.contentEn).map((para, i) => (
                  <p key={i} className="text-slate-300 leading-relaxed text-[15px]">{para}</p>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="rounded-2xl p-5 border border-cyan-500/20"
                style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.06), rgba(168,85,247,0.04))" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Lightbulb size={14} className="text-amber-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                    {t("blog_key_takeaways")}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {(lang === "bn" ? post.takeawaysBn : post.takeawaysEn).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                      <ChevronRight size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="rounded-2xl p-6 text-center border border-white/8"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <p className="text-slate-300 text-sm mb-4">
                  {t("blog_cta_text")}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full text-sm font-bold text-[#080d1a] transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(145deg, #fde68a 0%, #f59e0b 55%, #d97706 100%)",
                      boxShadow: "0 4px 16px rgba(251,191,36,0.3)",
                    }}
                    data-testid="button-article-cta"
                  >
                    {t("blog_start_project")} →
                  </Link>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-300 border border-white/15 hover:bg-white/5 transition-all"
                  >
                    {t("blog_back")}
                  </button>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 py-4 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center text-xs font-bold text-white border border-cyan-500/30">C</div>
                <div>
                  <p className="text-sm font-semibold text-white">{t("blog_author")}</p>
                  <p className="text-xs text-slate-500">{t("blog_author_role")}</p>
                </div>
                <button className="ml-auto flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors">
                  <Share2 size={13} />
                  {t("blog_share")}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Main Blog Page ─── */
export default function Blog() {
  const { lang, t } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

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
            {t("blog_label")}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
            {t("blog_heading")} <span style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 40%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>{t("blog_accent")}</span>
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
          <div
            className={`glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/25 transition-all duration-500 group cursor-pointer bg-gradient-to-br ${blogPosts[0].gradient}`}
            onClick={() => setSelectedPost(blogPosts[0])}
          >
            <div className="p-8 md:p-12 lg:p-14 flex flex-col lg:flex-row gap-8 items-start">
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
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                  {lang === "bn" ? blogPosts[0].titleBn : blogPosts[0].titleEn}
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6 text-lg max-w-2xl">
                  {lang === "bn" ? blogPosts[0].excerptBn : blogPosts[0].excerptEn}
                </p>
                <div className="flex items-center gap-5">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock size={13} />
                    {blogPosts[0].readTime} {t("min_read")}
                  </span>
                  <span className="text-xs text-slate-500">
                    {lang === "bn" ? getDateStrings(blogPosts[0].daysAgo).bn : getDateStrings(blogPosts[0].daysAgo).en}
                  </span>
                </div>
              </div>
              <div className="shrink-0 self-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(6,182,212,0.25), rgba(168,85,247,0.25))",
                    border: "1px solid rgba(6,182,212,0.35)",
                    boxShadow: "0 0 24px rgba(6,182,212,0.2)",
                  }}>
                  <ArrowRight size={22} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-center text-[10px] text-slate-500 mt-2 font-medium uppercase tracking-wider">
                  {t("read_more")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.slice(1).map((post, index) => {
            const dates = getDateStrings(post.daysAgo);
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group cursor-pointer"
                data-testid={`blog-card-${post.id}`}
                onClick={() => setSelectedPost(post)}
              >
                <div className={`glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/20 transition-all duration-500 h-full flex flex-col bg-gradient-to-br ${post.gradient} hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]`}>
                  <div className={`h-0.5 bg-gradient-to-r ${post.gradient.replace('/20', '')} opacity-60`} />

                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-slate-400 border border-white/8">
                        {lang === "bn" ? post.categoryBn : post.category}
                      </span>
                      <span className="text-[10px] text-slate-600 flex items-center gap-1">
                        <Clock size={10} /> {post.readTime} {t("min_read")}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-3 leading-snug group-hover:text-cyan-300 transition-colors line-clamp-2" style={{ fontFamily: "var(--font-display)" }}>
                      {lang === "bn" ? post.titleBn : post.titleEn}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed flex-grow mb-5 line-clamp-3">
                      {lang === "bn" ? post.excerptBn : post.excerptEn}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <span className="text-[11px] text-slate-500">
                        {lang === "bn" ? dates.bn : dates.en}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:gap-2.5 transition-all">
                        <MessageCircle size={12} className="opacity-70" />
                        {lang === "bn" ? "আরও পড়ুন" : t("read_more")}
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Article Popup Modal */}
      {selectedPost && (
        <ArticleModal
          post={selectedPost}
          lang={lang}
          onClose={() => setSelectedPost(null)}
        />
      )}
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
