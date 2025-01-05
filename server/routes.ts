import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { db } from "@db";
import { events, bookings } from "@db/schema";
import { eq } from "drizzle-orm";

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

  // Get all events
  app.get("/api/events", async (_req, res) => {
    try {
      const allEvents = await db.query.events.findMany({
        orderBy: (events, { asc }) => [asc(events.eventDate)],
      });
      res.json(allEvents);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch events" 
      });
    }
  });

  // Create a booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const booking = await db.insert(bookings).values({
        eventId: req.body.eventId,
        userId: req.body.userId,
        numberOfGuests: req.body.numberOfGuests,
        status: "pending",
      }).returning();

      res.json({ success: true, booking: booking[0] });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to create booking" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}