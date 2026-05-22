import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. GET semua category
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data", error });
    }
};

// 2. POST buat category baru
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.create({
            data: { name },
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat category", error });
    }
};

// 3. GET category by ID
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findUnique({
            where: { id: Number(id) },
        });
        if (!category) {
            res.status(404).json({ message: "Category tidak ditemukan" });
            return;
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data", error });
    }
};

// 4. PUT update category
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await prisma.category.update({
            where: { id: Number(id) },
            data: { name },
        });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate category", error });
    }
};

// 5. DELETE category
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.category.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Category berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus category", error });
    }
};