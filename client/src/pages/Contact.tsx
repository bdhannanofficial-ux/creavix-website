import { useState } from "react";
import { Layout } from "@/components/Layout";
import { StarRating } from "@/components/StarRating";
import { useCreateContact } from "@/hooks/use-contacts";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@shared/routes";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";

type ContactFormData = z.infer<typeof api.contacts.create.input>;

export default function Contact() {
  const { t } = useLanguage();
  const [rating, setRating] = useState(5);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const { mutate: submitContact, isPending } = useCreateContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(api.contacts.create.input),
    defaultValues: { rating: 5 }
  });

  const onSubmit = (data: ContactFormData) => {
    submitContact({ ...data, rating }, {
      onSuccess: () => {
        setSubmitStatus("success");
        reset();
        setRating(5);
        setTimeout(() => setSubmitStatus("idle"), 5000);
      },
      onError: () => {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    });
  };

  const socialList = [
    { icon: FaFacebookF, href: "https://web.facebook.com/CreavixITSolution", color: "hover:bg-[#1877F2]", label: "Facebook" },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/creavix-it-solution", color: "hover:bg-[#0A66C2]", label: "LinkedIn" },
    { icon: FaYoutube, href: "https://www.youtube.com/@CreavixiTsolution", color: "hover:bg-[#FF0000]", label: "YouTube" },
    { icon: FaInstagram, href: "https://www.instagram.com/creavixitsolution", color: "hover:bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600", label: "Instagram" },
    { icon: FaXTwitter, href: "https://x.com/creavixit", color: "hover:bg-white hover:text-black", label: "X/Twitter" },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
          data-testid="contact-header"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {t("contact_heading")} <span className="text-gradient-primary">{t("contact_accent")}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("contact_sub")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-display font-bold mb-8">{t("contact_info_heading")}</h2>
              <div className="space-y-6">
                <a href="mailto:info@creavixit.com" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group" data-testid="link-email">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">{t("email_label")}</p>
                    <p className="text-lg font-semibold">info@creavixit.com</p>
                    <p className="text-muted-foreground">creavixbd@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+8809611132835" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group" data-testid="link-phone">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">{t("phone_label")}</p>
                    <p className="text-lg font-semibold">+880 9611132835</p>
                  </div>
                </a>

                <a href="https://wa.me/8801890484355" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#25D366]/10 transition-colors border border-transparent hover:border-[#25D366]/20 group" data-testid="link-whatsapp">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <FaWhatsapp size={26} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">{t("whatsapp_label")}</p>
                    <p className="text-lg font-semibold">+880 1890484355</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-display font-bold mb-6">{t("social_heading")}</h3>
              <div className="flex flex-wrap gap-4">
                {socialList.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    data-testid={`link-social-${link.label.toLowerCase()}`}
                    className={`w-14 h-14 rounded-full glass-card border border-white/10 flex items-center justify-center text-foreground transition-all duration-300 hover:scale-110 ${link.color} hover:border-transparent`}
                  >
                    <link.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="glass-card rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
              <h2 className="text-2xl font-display font-bold mb-8">{t("form_heading")}</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                <div className="bg-background/50 p-6 rounded-2xl border border-white/5 mb-6">
                  <label className="block text-sm font-medium text-muted-foreground mb-3 text-center">{t("rate_label")}</label>
                  <div className="flex justify-center">
                    <StarRating rating={rating} onRatingChange={setRating} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground ml-1">{t("name_label")}</label>
                    <input
                      {...register("name")}
                      id="name"
                      placeholder={t("name_placeholder")}
                      data-testid="input-name"
                      className={`w-full bg-background/50 border ${errors.name ? "border-destructive" : "border-white/10"} rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                    />
                    {errors.name && <p className="text-destructive text-sm ml-1">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground ml-1">{t("name_label") === "Full Name" ? "Email Address" : "ইমেইল ঠিকানা"}</label>
                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder={t("email_placeholder")}
                      data-testid="input-email"
                      className={`w-full bg-background/50 border ${errors.email ? "border-destructive" : "border-white/10"} rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                    />
                    {errors.email && <p className="text-destructive text-sm ml-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-muted-foreground ml-1">{t("message_label")}</label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    placeholder={t("message_placeholder")}
                    data-testid="input-message"
                    className={`w-full bg-background/50 border ${errors.message ? "border-destructive" : "border-white/10"} rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none`}
                  />
                  {errors.message && <p className="text-destructive text-sm ml-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  data-testid="button-submit"
                  className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                >
                  {isPending ? t("submitting") : t("submit_btn")} <Send size={20} />
                </button>

                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3">
                      <CheckCircle2 size={20} /> {t("success_msg")}
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-3">
                      <AlertCircle size={20} /> {t("error_msg")}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
