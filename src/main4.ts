import {
    hightlightByHistogramEqualization,
} from "./maskImage.service";
import path from "path";

const basePath = path.join(__dirname, "..", "bin");

// Realce histograma equalizado
hightlightByHistogramEqualization(
    path.join(basePath, "in/", "Fig0316(1)(top_left).pgm"),
    path.join(basePath, "realce_equalizada_Fig0316(1)(top_left).pgm")
);

hightlightByHistogramEqualization(
    path.join(basePath, "in/", "Fig0316(2)(2nd_from_top).pgm"),
    path.join(basePath, "realce_equalizada_Fig0316(2)(2nd_from_top).pgm")
);

hightlightByHistogramEqualization(
    path.join(basePath, "in/", "Fig0316(3)(third_from_top).pgm"),
    path.join(basePath, "realce_equalizada_Fig0316(3)(third_from_top).pgm")
);

hightlightByHistogramEqualization(
    path.join(basePath, "in/", "Fig0316(4)(bottom_left).pgm"),
    path.join(basePath, "realce_equalizada_Fig0316(4)(bottom_left).pgm")
);


