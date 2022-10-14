import { ImageOp, rotateImage, imageOperation } from "./maskImage.service";
import path from "path";

const basePath = path.join(__dirname, "..", "bin");

// rotateImage(
//   path.join(basePath, "in/", "Fig4.ppm"),
//   path.join(basePath, "Fig4_90r.ppm"),
//   90,
//   true
// );

imageOperation(
  path.join(basePath, "in/", "Img01.ppm"),
  path.join(basePath, "in/", "Img02.ppm"),
  path.join(basePath, "Teste.ppm"),
  ImageOp.Sub,
  true
);

imageOperation(
  path.join(basePath, "in/", "Img01.ppm"),
  path.join(basePath, "in/", "Img02.ppm"),
  path.join(basePath, "Teste.ppm"),
  ImageOp.Add,
  true
);
