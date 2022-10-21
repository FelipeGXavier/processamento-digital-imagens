import { eightBitPlaneImage, threeBitPlaneImage } from "./maskImage.service";
import path from "path";

const basePath = path.join(__dirname, "..", "bin");

// 15)  Fatiamento por plano de bits
eightBitPlaneImage("Fig0314(a)(100-dollars)",
                   path.join(basePath, "in/", "Fig0314(a)(100-dollars).pgm"),
                   basePath);

threeBitPlaneImage(path.join(basePath, "in/", "Fig0314(a)(100-dollars).pgm"),
                   path.join(basePath, "Fig0314(a)(100-dollars)_3bit_sum.pgm"));