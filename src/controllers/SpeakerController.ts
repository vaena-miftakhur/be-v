import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. GET semua speaker
export const getAllSpeakers = async (req: Request, res: Response) => {
    try {
        const speakers = await prisma.speaker.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(speakers);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data", error });
    }
};

// 2. POST buat speaker baru
export const createSpeaker = async (req: Request, res: Response) => {
    try {
        const { name, role, image } = req.body;
        const speaker = await prisma.speaker.create({
            data: { name, role, image },
        });
        res.status(201).json(speaker);
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat speaker", error });
    }
};

// 3. GET speaker by ID
export const getSpeakerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const speaker = await prisma.speaker.findUnique({
            where: { id: Number(id) },
        });
        if (!speaker) {
            res.status(404).json({ message: "Speaker tidak ditemukan" });
            return;
        }
        res.json(speaker);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data", error });
    }
};

// 4. PUT update speaker
export const updateSpeaker = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, role, image } = req.body;
        const speaker = await prisma.speaker.update({
            where: { id: Number(id) },
            data: { name, role, image },
        });
        res.json(speaker);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate speaker", error });
    }
};

// 5. DELETE speaker
export const deleteSpeaker = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.speaker.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Speaker berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus speaker", error });
    }
};