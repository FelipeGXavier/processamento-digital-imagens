import { PPM, PGM, createRandomImage } from "./randomImage.service";
import { resize } from "./transformImageLib";

// createRandomImage(PPM, 1000, 1000, {start: 0, end: 255}, "ppm_1000_1000");
// createRandomImage(PGM, 100, 100, {start: 0, end: 255}, "pgm_100_100");

resize("Entrada_RGB.ppm", "resizes/out.ppm", {rgba: true, width: 1366, height: 768});
resize("Entrada_EscalaCinza.pgm", "resizes/out.pgm", {rgba: false, width: 1366, height: 768});