import express from "express";
import cors from "cors";
import router from "./config/router.config.js";
import path from "path";
import "./config/db.config.js";

const app = express();
app.use(cors());
app.use(express.json());

// Serve images statically
app.use("/images", express.static(path.join(process.cwd(), "public", "images")));

// Use API routes
app.use(router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});