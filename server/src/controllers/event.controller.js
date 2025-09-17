import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

/**
 * Create an event
 * POST /api/events
 */
router.post("/", async (req, res, next) => {
    try {
        const { title, description, location, banner, startsAt, endsAt } =
            req.body;

        const createdById = req.user.id;
        const event = await prisma.event.create({
            data: {
                title,
                description,
                location,
                banner,
                startsAt: new Date(startsAt),
                endsAt: new Date(endsAt),
                createdById,
            },
        });

        res.status(201).json(event);
    } catch (error) {
        next(error);
        res.status(500).json({ message: "Failed to create event" });
    }
});

/**
 * Get all events
 * GET /api/events
 */
router.get("/", async (_req, res) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                createdBy: true,
                tickets: true,
                attendees: true,
            },
            orderBy: { startsAt: "asc" },
        });

        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch events" });
    }
});

/**
 * Get a single event by ID
 * GET /api/events/:id
 */
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                createdBy: true,
                tickets: true,
                attendees: true,
            },
        });

        if (!event) return res.status(404).json({ message: "Event not found" });

        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch event" });
    }
});

/**
 * Update an event
 * PUT /api/events/:id
 */
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            location,
            banner,
            startsAt,
            endsAt,
            channelId,
        } = req.body;

        const updated = await prisma.event.update({
            where: { id },
            data: {
                title,
                description,
                location,
                banner,
                startsAt: startsAt ? new Date(startsAt) : undefined,
                endsAt: endsAt ? new Date(endsAt) : undefined,
                channelId,
            },
        });

        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update event" });
    }
});

/**
 * Delete an event
 * DELETE /api/events/:id
 */
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.event.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete event" });
    }
});

export default router;
