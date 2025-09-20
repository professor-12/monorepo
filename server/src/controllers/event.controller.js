import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { v2 as cloudinary } from "cloudinary";

const router = Router();

/**
 * Create an event
 * POST /api/events
 */
export const createEvent = async (req, res, next) => {
    try {
        const { title, description, location, startsAt, endsAt } = req.body;

        const createdById = req.user.id;

        let banner = undefined;

        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

            const uploadRes = await cloudinary.uploader.upload(dataURI, {
                folder: "events",
            });

            banner = uploadRes.secure_url;
        }
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
};

/**
 * Get all events
 * GET /api/events
 */
export const getEvents = async (_req, res) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                createdBy: { select: { profile: true } },
                tickets: true,
                attendees: true,
            },
            orderBy: { startsAt: "asc" },
        });

        res.status(200).json({
            data: events,
            message: "Event fetch Successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch events" });
    }
};

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
