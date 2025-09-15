import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

/**
 * Create a ticket
 * POST /api/tickets
 */
router.post("/", async (req, res) => {
    try {
        const { eventId, type, price, currency, quantity } = req.body;

        const ticket = await prisma.ticket.create({
            data: {
                eventId,
                type,
                price,
                currency,
                quantity,
            },
        });

        res.status(201).json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create ticket" });
    }
});

/**
 * Get all tickets for an event
 * GET /api/tickets/:eventId
 */
router.get("/:eventId", async (req, res) => {
    try {
        const { eventId } = req.params;

        const tickets = await prisma.ticket.findMany({
            where: { eventId },
        });

        res.json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch tickets" });
    }
});

/**
 * Update a ticket
 * PUT /api/tickets/:id
 */
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { type, price, currency, quantity } = req.body;

        const updated = await prisma.ticket.update({
            where: { id },
            data: { type, price, currency, quantity },
        });

        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update ticket" });
    }
});

/**
 * Delete a ticket
 * DELETE /api/tickets/:id
 */
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.ticket.delete({
            where: { id },
        });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete ticket" });
    }
});

export default router;
