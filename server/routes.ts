import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10),
});

export function registerRoutes(app: Express): Server {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactSchema.parse(req.body);
      
      // In a real app, you would send this data to your email service
      // or save it to a database
      console.log("Contact form submission:", data);

      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: "Invalid form data" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
