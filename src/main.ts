import { PPM, PGM, createRandomImage } from "./randomImage.service";

createRandomImage(PPM, 1000, 1000, {start: 0, end: 255}, "ppm_1000_1000");
createRandomImage(PGM, 100, 100, {start: 0, end: 255}, "pgm_100_100");
