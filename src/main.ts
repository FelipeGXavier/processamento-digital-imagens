import { PPM, PGM, createRandomImage } from "./randomImage.service";

createRandomImage(PPM, 100, 100, {start: 0, end: 255}, "ppm_100_100");
createRandomImage(PGM, 100, 100, {start: 0, end: 255}, "pgm_100_100");
