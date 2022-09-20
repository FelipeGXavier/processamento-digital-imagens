import {
  getHistogramPlotValues,
  hightlightByHistogram,
} from "./maskImage.service";
import path from "path";

const basePath = path.join(__dirname, "..", "bin");

// Valores para imagem escala de cinza
getHistogramPlotValues(
  path.join(basePath, "in/", "Entrada_EscalaCinza.pgm"),
  path.join(basePath, "entrada_escala_cinza_histograma.csv")
);

// Valores para 'Red'
getHistogramPlotValues(
  path.join(basePath, "in/", "Fig4.ppm"),
  path.join(basePath, "entrada_rgb_r_histograma.csv"),
  0
);

// Valores para 'Green'
getHistogramPlotValues(
  path.join(basePath, "in/", "Fig4.ppm"),
  path.join(basePath, "entrada_rgb_g_histograma.csv"),
  1
);

// Valores para 'Blue'
getHistogramPlotValues(
  path.join(basePath, "in/", "Fig4.ppm"),
  path.join(basePath, "entrada_rgb_b_histograma.csv"),
  2
);

// Realce imagem escala de cinza
hightlightByHistogram(
  path.join(basePath, "in/", "Entrada_EscalaCinza.pgm"),
  path.join(basePath, "realce_histograma_entrada_escala_cinza.pgm")
);

// Realce imagem RGB
hightlightByHistogram(
  path.join(basePath, "in/", "Fig4.ppm"),
  path.join(basePath, "realce_histograma_rgb.ppm"),
  true
);

// Valores após realce escala de cinza
getHistogramPlotValues(
  path.join(basePath, "realce_histograma_entrada_escala_cinza.pgm"),
  path.join(basePath, "entrada_realce_escala_cinza.csv")
);

// Valores após realce RGB
getHistogramPlotValues(
  path.join(basePath, "realce_histograma_rgb.ppm"),
  path.join(basePath, "entrada_realce_rgb.csv"),
  0
);
