import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { Award, Briefcase, ChevronRight } from "lucide-react";
import hannanImg from "@assets/hannan_khan_1773114552035.jpg";
import sabbirImg from "@assets/Sabbir_1773114552042.png";
import shajnineImg from "@assets/Shajnine_1773114552042.png";

const experts = [
  {
    name: "Sabbir Khan",
    role: "Senior Video Editor",
    experience: "4 Years",
    image: sabbirImg,
    bio: "ভিডিও এডিটিং এবং মোশন গ্রাফিক্সের জগতে এক অনন্য নাম। সাধারণ ফুটেজকে প্রিমিয়াম লেভেলের কমার্শিয়াল বিজ্ঞাপনে রূপান্তর করতে তিনি সিদ্ধহস্ত।",
    facebook: "https://web.facebook.com/sabbirkhan8"
  },
  {
    name: "Shajnine Jahan",
    role: "Senior Video Editor",
    experience: "3 Years",
    image: shajnineImg,
    bio: "সৃজনশীল ভিজ্যুয়াল স্টোরিটেলিং এবং নান্দনিক এডিটিংয়ে তিনি একজন এক্সপার্ট। কাস্টমারের মনস্তত্ত্ব বুঝে সঠিক মিউজিক ও সাউন্ড ডিজাইন তৈরি করতে দক্ষ।",
    facebook: "https://web.facebook.com/shajnine.ohee"
  }
];

export default function Team() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">Meet the <span className="text-gradient-primary">Visionaries</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The creative minds behind the global standard production of Creavix IT Solution.
          </p>
        </motion.div>

        {/* Founder Section - Featured */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent blur-3xl -z-10 rounded-full" />
          <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 overflow-hidden relative">
            
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-2/5 shrink-0 relative group">
                <div className="absolute inset-0 bg-primary/20 translate-x-3 translate-y-3 rounded-2xl -z-10 transition-transform group-hover:translate-x-5 group-hover:translate-y-5" />
                <div className="aspect-square overflow-hidden rounded-2xl border-2 border-white/10 relative z-10">
                  <img 
                    src={hannanImg} 
                    alt="Hannan Khan" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-60" />
                </div>
              </div>
              
              <div className="w-full lg:w-3/5 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="text-primary" size={24} />
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Founder & CEO</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Hannan Khan</h2>
                </div>
                
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary pl-6 py-2">
                  "ডিজিটাল মার্কেটিং ও ব্র্যান্ডিং জগতে দীর্ঘ এক দশকেরও বেশি সময়ের অভিজ্ঞতা। আমার লক্ষ্য উদযাপন নয়, বরং ইনোভেটিভ স্ট্র্যাটেজি ও ক্রিয়েটিভিটির সংমিশ্রণে আপনার ব্যবসাকে একটি গ্লোবাল ব্র্যান্ডে রূপান্তর করা।"
                </p>
                
                <div className="pt-6 flex flex-wrap gap-4">
                  <a 
                    href="https://web.facebook.com/HannanKhanDesigner/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white border border-[#1877F2]/20 transition-all duration-300 font-semibold"
                  >
                    <FaFacebookF size={18} /> Connect on Facebook
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/creavix-it-solution" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white border border-[#0A66C2]/20 transition-all duration-300 font-semibold"
                  >
                    <FaLinkedinIn size={18} /> Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Expert Team Section */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Our <span className="text-gradient-primary">Expert Team</span></h2>
            <div className="h-px bg-white/10 flex-grow" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {experts.map((expert, index) => (
              <motion.div 
                key={expert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="glass-card rounded-3xl p-8 h-full flex flex-col items-center text-center border-white/5 hover:border-primary/30 transition-colors duration-500 relative z-10">
                  
                  {/* Round Image */}
                  <div className="w-40 h-40 rounded-full p-2 border border-white/10 mb-6 group-hover:border-primary/50 transition-colors duration-500 bg-background shadow-xl">
                    <img 
                      src={expert.image} 
                      alt={expert.name} 
                      className="w-full h-full rounded-full object-cover filter contrast-[0.9] group-hover:filter-none transition-all duration-500"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold mb-2">{expert.name}</h3>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm tracking-wider uppercase mb-6">
                    <Briefcase size={16} /> {expert.role} • {expert.experience}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed flex-grow mb-8">
                    {expert.bio}
                  </p>
                  
                  <a 
                    href={expert.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 group-hover:scale-110"
                    aria-label={`Connect with ${expert.name} on Facebook`}
                  >
                    <FaFacebookF size={20} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
