import {
  transformRgbToGrayscale,
  transformByThreshold,
  transformRgbToAverageChannels,
  transformSeparateRgbChannel
} from "./transformImage.service";
import path from "path";

const basePath = path.join(__dirname, "..", "bin");

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

// Atividade #7
transformRgbToAverageChannels(path.join(basePath, "img_rgb_media_canais.ppm"));

// Atividade #8
// Separado em 'Red' resto 0
transformSeparateRgbChannel(path.join(basePath, "img_rgb_separado_r.ppm"), 0)
// Separado em 'Green' resto 0
transformSeparateRgbChannel(path.join(basePath, "img_rgb_separado_g.ppm"), 1)
// Separado em 'Blue' resto 0
transformSeparateRgbChannel(path.join(basePath, "img_rgb_separado_b.ppm"), 2)

// Separado em 'Red' resto 255
transformSeparateRgbChannel(path.join(basePath, "img_rgb_separado_r_max_255.ppm"), 0, 255)
// Separado em 'Green' resto 255
transformSeparateRgbChannel(path.join(basePath, "img_rgb_separado_g_max_255.ppm"), 1, 255)
// Separado em 'Blue' resto 255
transformSeparateRgbChannel(path.join(basePath, "img_rgb_separado_b_max_255.ppm"), 2, 255)

