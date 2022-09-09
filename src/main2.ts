import { transformRgbToGrayscale, transformByThreshold, transformRgbToAverageChannels } from "./transformImage.service";
import path from "path";

const basePath = path.join(__dirname, '..', 'bin')

// Atividade #5
// Limiar 128 | 0 & 1
transformByThreshold(
  (pixel: number) => {
    const threshholdValue = 128;
    if (pixel <= threshholdValue) {
      return 0;
    }
    return 1;
  },
  path.join(basePath, "img_escala_cinza_binario_limiar.pbm"),
  "P1"
);

// Atividade #6
// Limiar 128 | 0 & 255
transformByThreshold(
  (pixel: number) => {
    const threshholdValue = 128;
    if (pixel <= threshholdValue) {
      return 0;
    }
    return 255;
  },
  path.join(basePath, "img_escala_cinza_limiar.pgm"),
  "P2"
);

// Atividade #7
transformRgbToGrayscale(path.join(basePath, "img_rgb_escala_de_cinza.pgm"));

// Atividadee #8
transformRgbToAverageChannels(path.join(basePath, "img_rgb_media_canais.pgm"));
