import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. GET semua event
export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            orderBy: { createdAt: "desc" },
            // include: { category: true },
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data", error });
    }
};

// 2. POST buat event baru
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { name, categoryId, location, dateEvent, description } = req.body;
        const event = await prisma.event.create({
            data: {
                name,
                categoryId: Number(categoryId),
                location,
                dateEvent: new Date(dateEvent),
                description,
            },
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat event", error });
    }
};

// 3. GET event by ID
export const getEventById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const event = await prisma.event.findUnique({
            where: { id: Number(id) },
        });
        if (!event) {
            res.status(404).json({ message: "Event tidak ditemukan" });
            return;
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data", error });
    }
};

// 4. PUT update event
export const updateEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, categoryId, location, dateEvent, description } = req.body;
        const event = await prisma.event.update({
            where: { id: Number(id) },
            data: {
                name,
                categoryId: Number(categoryId),
                location,
                dateEvent: new Date(dateEvent),
                description,
            },
        });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate event", error });
    }
};

// 5. DELETE event
export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.event.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Event berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus event", error });
    }
};