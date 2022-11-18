import path from "path";
import { encodeImageRle, decodeImageRle } from "./compressionImage.service";

const basePath = path.join(__dirname, "..", "bin");

// Compressão de imagens
encodeImageRle(
  path.join(basePath, "in/", "Entrada_EscalaCinza.pgm"),
  path.join(basePath, "uncompressed_Entrada_EscalaCinza.pgm")
);

decodeImageRle(
  path.join(basePath, "compressed_Entrada_EscalaCinza.pgm"),
  path.join(basePath, "uncompressed_Entrada_EscalaCinza.pgm")
);
