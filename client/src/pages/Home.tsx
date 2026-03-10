import { Layout } from "@/components/Layout";
import { VideoEmbed } from "@/components/VideoEmbed";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "wouter";
import logoImg from "@assets/new-logo_1773114552036.png";

const videoCategories = [
  {
    title: "Storytelling Video Ads",
    description: "Captivating narratives that connect with your audience on an emotional level.",
    ids: ["FvWyFDNAAPY", "4ryJaLx6o0k", "MPYdZfeJQX4", "OcyCYVfko3k", "QdPW3bDFc5I", "3U3-3IgbPQc"]
  },
  {
    title: "Professional Product Video Ads",
    description: "Highlighting features and benefits with crystal-clear commercial quality.",
    ids: ["Szel9WlwaS8", "rQk_sPwkDwU", "w9LPO4Ddpos", "6EKnfroWXQE", "pVqdFDTyfdg", "LrORiOjB4X0", "tooCPxc0pnY", "lQZSDKRikf8", "KU7j0JhzJKI", "P65MlYwcXes"]
  },
  {
    title: "Travel Agency Video Ads",
    description: "Breathtaking visuals that inspire wanderlust and drive bookings.",
    ids: ["8nCuthKfbIU", "0baTxFVpSyo", "7knZkqenPII", "J8rkaUqNYfY", "YYZS_C4clHY"]
  },
  {
    title: "Multiple Ad Variations",
    description: "A/B tested creative formats designed for maximum conversion rates.",
    ids: ["6n2y_nrRahM", "DjXhq-ScyE8", "eEqeRIsI9oQ", "MtgdKWMRAPI", "u6YLq7lDDdY", "KxFQv4M-bow", "icxH_8aqiSM"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 flex justify-center"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
              <img src={logoImg} alt="Creavix" className="h-24 md:h-32 lg:h-40 w-auto relative z-10" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold max-w-4xl mx-auto leading-tight mb-6"
          >
            Transforming Visions into <span className="text-gradient-primary">Global Brands</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            We blend innovative strategy with premium commercial video production to elevate your business in the digital landscape.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link 
              href="/contact"
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:bg-yellow-400 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
            >
              Start Your Project <ArrowRight size={18} />
            </Link>
            <a 
              href="#portfolio"
              className="px-8 py-4 rounded-full glass-card text-foreground font-bold flex items-center gap-2 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              View Our Work <PlayCircle size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Categories */}
      <div id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {videoCategories.map((category, index) => (
          <section key={index}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12 md:mb-16"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest mb-4">
                Category 0{index + 1}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">{category.title}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">{category.description}</p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {category.ids.map((id) => (
                <motion.div key={id} variants={itemVariants}>
                  <VideoEmbed videoId={id} title={`${category.title} Example`} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
      </div>
    </Layout>
  );
}
