import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

const SYSTEM_PROMPT = `You are a helpful assistant for Creavix IT Solution — a professional digital marketing and premium video production agency based in Bangladesh. 

About Creavix IT Solution:
- Services: Premium video production, digital marketing, social media management, brand strategy, motion graphics, travel & tourism content, corporate brand films
- Total projects delivered: 3700+
- Satisfied clients: 2100+
- 5-star rating agency
- Founder: MD Mostafizur Rahman Rakib (CEO & Creative Director)
- Contact: +8801714-061016
- Instagram: creavixitsolution
- Website: creavix.com

Answer questions helpfully, professionally and concisely (2-3 sentences max). Always be positive about the agency's capabilities. If asked about pricing, say "Please contact us directly at +8801714-061016 for a custom quote." If asked anything unrelated to the agency, politely redirect to how Creavix can help. Respond in the same language the user writes in (Bengali or English).`;

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
      const { message } = z.object({ message: z.string().min(1).max(500) }).parse(req.body);
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return res.status(500).json({ message: "AI service not configured" });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: "user", parts: [{ text: SYSTEM_PROMPT + "\n\nUser: " + message }] }
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 200 }
          }),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        console.error("Gemini error:", err);
        return res.status(500).json({ message: "AI service error" });
      }

      const data = await response.json() as any;
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't process that. Please contact us directly at +8801714-061016.";
      res.json({ reply: text });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: "Invalid message" });
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
