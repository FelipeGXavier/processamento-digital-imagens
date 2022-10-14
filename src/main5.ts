import {
  ImageOp,
  rotateImage,
  imageOperation,
  imageOperationWithArea,
} from "./maskImage.service";
import path from "path";
import { rotate } from "./transformImageLib";

const basePath = path.join(__dirname, "..", "bin");

// Atividade - 12) Rotação em imagem
// 90º
rotateImage(
  path.join(basePath, "in/", "Entrada_EscalaCinza.pgm"),
  path.join(basePath, "Entrada_EscalaCinza_90r.pgm"),
  90
);
// 180º
rotate("Fig4.ppm", "Fig4_180r.ppm", 180, true);

// 13) Adição em Imagens
// Área de interesse
imageOperation(
  path.join(basePath, "in/", "Img01.ppm"),
  path.join(basePath, "in/", "Img02.ppm"),
  path.join(basePath, "Saida_Imagem_adicao.ppm"),
  ImageOp.Add,
  true
);

imageOperationWithArea(
  path.join(basePath, "in/", "Img01.ppm"),
  path.join(basePath, "in/", "Img02.ppm"),
  path.join(basePath, "Saida_Imagem_adicao_area.ppm"),
  ImageOp.Add,
  500,
  { height: 1000, width: 1000 },
  true
);

// 14) Subtração em Imagens
// Imagens gêmeas
imageOperation(
  path.join(basePath, "in/", "Img01.ppm"),
  path.join(basePath, "in/", "Img02.ppm"),
  path.join(basePath, "Saida_Imagem_subtracao.ppm"),
  ImageOp.Sub,
  true
);
// Área de interesse
imageOperationWithArea(
  path.join(basePath, "in/", "Img01.ppm"),
  path.join(basePath, "in/", "Img02.ppm"),
  path.join(basePath, "Saida_Imagem_subtracao_area.ppm"),
  ImageOp.Sub,
  500,
  { height: 1000, width: 1000 },
  true
);
