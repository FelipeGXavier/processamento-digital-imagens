import { PPM, PGM, createRandomImage } from "./randomImage.service";
import { resize } from "./transformImageLib";

// createRandomImage(PPM, 1000, 1000, {start: 0, end: 255}, "ppm_1000_1000");
// createRandomImage(PGM, 100, 100, {start: 0, end: 255}, "pgm_100_100");

// RGB
resize("Entrada_RGB.ppm", "resizes/rgb_10x_menor.ppm", {
  rgba: true,
  scaleFactor: 10,
});
resize("Entrada_RGB.ppm", "resizes/rgb_480_320.ppm", {
  rgba: true,
  width: 480,
  height: 320,
});
resize("Entrada_RGB.ppm", "resizes/rgb_1366_720.ppm", {
  rgba: true,
  width: 1366,
  height: 720,
});
resize("Entrada_RGB.ppm", "resizes/rgb_3840_2160.ppm", {
  rgba: true,
  width: 3840,
  height: 2160,
});
resize("Entrada_RGB.ppm", "resizes/rgb_7680_4320.ppm", {
  rgba: true,
  width: 7680,
  height: 4320,
});

// Grayscale
resize("Entrada_EscalaCinza.pgm", "resizes/grayscale_10x_menor.pgm", {
  rgba: false,
  scaleFactor: 10,
});
resize("Entrada_EscalaCinza.pgm", "resizes/grayscale_480_320.pgm", {
  rgba: false,
  width: 480,
  height: 320,
});
resize("Entrada_EscalaCinza.pgm", "resizes/grayscale_1366_720.pgm", {
  rgba: false,
  width: 1366,
  height: 720,
});
resize("Entrada_EscalaCinza.pgm", "resizes/grayscale_3840_2160.pgm", {
  rgba: false,
  width: 3840,
  height: 2160,
});
resize("Entrada_EscalaCinza.pgm", "resizes/grayscale_7680_4320.pgm", {
  rgba: false,
  width: 7680,
  height: 4320,
});
