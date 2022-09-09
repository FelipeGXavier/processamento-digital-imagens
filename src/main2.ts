import { transformByThreshold } from "./transformImage.service";
import path from "path";

// Limiar 128 | 0 & 1
transformByThreshold(
  (pixel: number) => {
    const threshholdValue = 128;
    if (pixel <= threshholdValue) {
      return 0;
    }
    return 1;
  },
  path.join(__dirname, "..", "bin/transform_entrada_escala_de_cinza_pbm.pbm"),
  "P1"
);

// Limiar 128 | 0 & 255
transformByThreshold(
  (pixel: number) => {
    const threshholdValue = 128;
    if (pixel <= threshholdValue) {
      return 0;
    }
    return 255;
  },
  path.join(__dirname, "..", "bin/transform_entrada_escala_de_cinza_pgm.pgm"),
  "P2"
);
