import {
    rotateImage,
} from "./maskImage.service";
import path from "path";

const basePath = path.join(__dirname, "..", "bin");

// Realce histograma equalizado
rotateImage(
    path.join(basePath, "in/", "Fig4.ppm"),
    path.join(basePath, "Fig4_180r.ppm"),
    180,
    true
);
