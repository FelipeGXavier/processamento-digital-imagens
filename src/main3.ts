import { getHistogramPlotValues } from "./maskImage.service";
import path from 'path'

const basePath = path.join(__dirname, "..", "bin");

getHistogramPlotValues(path.join(basePath, 'in/', 'Entrada_EscalaCinza.pgm'),
                    path.join(basePath, 'entrada_escala_cinza_histograma.csv'));

// Valores para 'Red'
getHistogramPlotValues(path.join(basePath, 'in/', 'Fig4.ppm'),
                    path.join(basePath, 'entrada_rgb_r_histograma.csv'), 0);

// Valores para 'Green'
getHistogramPlotValues(path.join(basePath, 'in/', 'Fig4.ppm'),
                    path.join(basePath, 'entrada_rgb_g_histograma.csv'), 1);

// Valores para 'Blue'
getHistogramPlotValues(path.join(basePath, 'in/', 'Fig4.ppm'),
                    path.join(basePath, 'entrada_rgb_b_histograma.csv'), 2);