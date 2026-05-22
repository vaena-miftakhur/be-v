import { Router } from "express";
import {
    getAllSpeakers,
    createSpeaker,
    getSpeakerById,
    updateSpeaker,
    deleteSpeaker,
} from "../controllers/SpeakerController.js";

const router = Router();

router.get("/", getAllSpeakers);
router.post("/", createSpeaker);
router.get("/:id", getSpeakerById);
router.put("/:id", updateSpeaker);
router.delete("/:id", deleteSpeaker);

export default router;