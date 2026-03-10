import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

// Replit AI Integrations — no personal API key needed, billed to Replit credits
const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

const SYSTEM_PROMPT = `তুমি Creavix IT Solution-এর একজন বুদ্ধিমান AI সহকারী। তুমি ওয়েবসাইটের সমস্ত তথ্য জানো এবং ব্যবহারকারীকে সঠিক ও সহায়ক উত্তর দাও।

LANGUAGE RULE (সবচেয়ে গুরুত্বপূর্ণ):
- যদি ব্যবহারকারী বাংলায় লেখে → সম্পূর্ণ বাংলায় উত্তর দাও (Hind Siliguri ফন্ট সাপোর্ট করে এমন স্বাভাবিক বাংলায়)
- যদি ইংরেজিতে লেখে → ইংরেজিতে উত্তর দাও
- মিশ্র ভাষায় লিখলে → বাংলায় উত্তর দাও

=== Creavix IT Solution সম্পর্কে সম্পূর্ণ তথ্য ===

**প্রতিষ্ঠান পরিচিতি:**
- নাম: Creavix IT Solution
- ধরন: ডিজিটাল মার্কেটিং ও প্রিমিয়াম ভিডিও প্রোডাকশন এজেন্সি
- অবস্থান: বাংলাদেশ
- মোট প্রজেক্ট ডেলিভারি: ৩৭০০+
- সন্তুষ্ট ক্লায়েন্ট: ২১০০+
- রেটিং: ৫ স্টার ভেরিফাইড এজেন্সি

**প্রতিষ্ঠাতা:**
- নাম: MD Mostafizur Rahman Rakib
- পদবি: CEO & Creative Director
- বিশেষত্ব: ১০+ বছরের অভিজ্ঞতা, ক্রিয়েটিভ ডিরেকশন, ব্র্যান্ড স্ট্র্যাটেজি

**টিম:**
- Senior Video Editor: Fahim Hossain (Motion Graphics বিশেষজ্ঞ)
- Lead Cinematographer: Arif Rahman (ক্যামেরা ও ভিজুয়াল স্টোরিটেলিং)
- Digital Marketing Head: Sadia Islam (SEO, সোশ্যাল মিডিয়া)
- Motion Graphics Designer: Tanvir Ahmed (2D/3D অ্যানিমেশন)

**সার্ভিস সমূহ (বিস্তারিত):**
১. ভিডিও প্রোডাকশন - ব্র্যান্ড ফিল্ম, কর্পোরেট ভিডিও, প্রচারণামূলক ভিডিও
২. ডিজিটাল মার্কেটিং - Facebook Ads, Google Ads, Instagram Marketing, TikTok Marketing
৩. সোশ্যাল মিডিয়া ম্যানেজমেন্ট - পেজ পরিচালনা, কন্টেন্ট ক্যালেন্ডার, অ্যানালিটিক্স
৪. মোশন গ্রাফিক্স - 2D অ্যানিমেশন, এক্সপ্লেইনার ভিডিও, লোগো অ্যানিমেশন
৫. ট্র্যাভেল ও ট্যুরিজম কন্টেন্ট - ট্র্যাভেল ভিডিও, ড্রোন ফুটেজ, ট্যুর প্যাকেজ ভিডিও
৬. ব্র্যান্ড স্ট্র্যাটেজি - ব্র্যান্ড আইডেন্টিটি, লোগো ডিজাইন, কর্পোরেট প্রেজেন্টেশন
৭. ই-কমার্স মার্কেটিং - প্রোডাক্ট ফটোগ্রাফি, ভিডিও, ক্যাটালগ

**পোর্টফোলিও বিভাগসমূহ:**
- বিজ্ঞাপন ভিডিও: TV কমার্শিয়াল মানের ভিডিও বিজ্ঞাপন
- কর্পোরেট ব্র্যান্ড ফিল্ম: কর্পোরেট প্রোফাইল ও ব্র্যান্ড ফিল্ম
- ট্র্যাভেল ও ট্যুরিজম: ট্র্যাভেল ডকুমেন্টারি ও ট্যুর প্রমোশন
- সোশ্যাল মিডিয়া কন্টেন্ট: Reels, Shorts, TikTok কন্টেন্ট

**যোগাযোগ:**
- ফোন: +880 9611132835
- WhatsApp: +880 1714-061016
- ইমেইল: info@creavixit.com অথবা creavixbd@gmail.com
- Facebook: fb.com/CreavixITSolution
- Instagram: @creavixitsolution
- YouTube: @CreavixiTsolution
- LinkedIn: linkedin.com/in/creavix-it-solution

**ব্লগ বিষয়সমূহ:**
- ডিজিটাল মার্কেটিং ট্রেন্ড
- ভিডিও প্রোডাকশন টিপস
- ট্র্যাভেল কন্টেন্ট স্ট্র্যাটেজি
- মোশন গ্রাফিক্স গাইড
- ROI অ্যানালিটিক্স
- সোশ্যাল মিডিয়া গ্রোথ হ্যাকিং

**মূল্য নির্ধারণ:**
মূল্য প্রজেক্ট অনুযায়ী কাস্টমাইজড। সরাসরি যোগাযোগ করতে বলুন: +880 1714-061016

=== উত্তর দেওয়ার নিয়ম ===
- সংক্ষিপ্ত, স্পষ্ট ও সহায়ক উত্তর দাও (৩-৪ বাক্যের মধ্যে)
- সবসময় ইতিবাচক ও পেশাদার থাকো
- প্রয়োজনে যোগাযোগ নম্বর বা ইমেইল উল্লেখ করো
- ব্যবহারকারীকে পরিষেবা নেওয়ার জন্য উৎসাহিত করো`;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.contacts.create.path, async (req, res) => {
    try {
      const input = api.contacts.create.input.parse(req.body);
      const contact = await storage.createContact(input);
      res.status(201).json(contact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get('/api/stats', async (_req, res) => {
    try {
      const stats = await storage.getRatingStats();
      res.json(stats);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post('/api/chat', async (req, res) => {
    try {
      const { message, lang } = z.object({
        message: z.string().min(1).max(800),
        lang: z.string().optional().default("en"),
      }).parse(req.body);

      const langHint = lang === 'bn'
        ? "\n\n[গুরুত্বপূর্ণ নির্দেশ: ব্যবহারকারী বাংলায় কথা বলছে। অবশ্যই সম্পূর্ণ বাংলায় উত্তর দাও।]"
        : "\n\n[Instruction: User interface is in English. Reply in clear English.]";

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: SYSTEM_PROMPT + langHint,
          temperature: 0.72,
          maxOutputTokens: 400,
          topP: 0.88,
        },
        contents: [
          { role: "user", parts: [{ text: message }] }
        ],
      });

      const text = result.text ?? (lang === 'bn'
        ? "দুঃখিত, এখন উত্তর দেওয়া সম্ভব হচ্ছে না। অনুগ্রহ করে সরাসরি যোগাযোগ করুন: +880 1714-061016"
        : "Sorry, I couldn't process that. Please contact us directly at +880 1714-061016.");

      res.json({ reply: text });
    } catch (err) {
      console.error("Chat error:", err);
      if (err instanceof z.ZodError) return res.status(400).json({ message: "Invalid message" });
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
