import express from "express";
import cors from "cors";
import categoryRoute from "./routes/CategoryRoute.js";
import speakerRoute from "./routes/SpeakerRoute.js";
import eventRoute from "./routes/EventRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoute);
app.use("/speakers", speakerRoute);
app.use("/events", eventRoute);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});