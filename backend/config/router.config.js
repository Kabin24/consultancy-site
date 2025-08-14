import express from "express";
import { deleteDestination, getDestination, updateDestination } from "../modules/destination/Destination.js";
import multer from "multer";
import path from "path";
import { getAbout } from "../modules/About.js";
import { createService, deleteService, getServices, updateService } from "../modules/Service/service.js";
import { createFooter, deleteFooter, getFooters, updateFooter } from "../modules/footer/footer.js";
import adminRoutes from "../modules/admin/admin.routes.js";
import { auth } from "../middleware/auth.middleware.js";
import navigationRoutes from "../modules/navigation/navigation.routes.js"

const router = express.Router();

// Image upload setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "public", "images"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });


router.get("/api/destination", getDestination);
router.get("/api/about", getAbout);
router.get("/api/services", getServices);
router.get("/api/footers", getFooters);


router.use("/api/admin", adminRoutes);

router.use('/api/navigation', navigationRoutes);

router.use(auth); 

// Protected admin routes
router.post("/api/destination", updateDestination);
router.delete('/api/destination/:id', deleteDestination);
router.post("/api/services", createService);
router.put("/api/services/:id", updateService);
router.delete("/api/services/:id", deleteService);
router.post("/api/footers", createFooter);
router.put("/api/footers/:id", updateFooter);
router.delete("/api/footers/:id", deleteFooter);

// Image upload (protected)
router.post("/api/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({ imagePath: `/images/${req.file.filename}` });
});

export default router;