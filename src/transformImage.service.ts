import fs from "fs";
import path from "path";
import { initMatrix, maxValueMatrix, parseImage } from "./util";

export const resize = (width: number, height: number) => {
  const image = parseImage(
    path.join(__dirname, "..", "/bin/in/Entrada_EscalaCinza.pgm")
  );

  const sx = image.width / width;
  const sy = image.height / height;

  const result = initMatrix(width);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const px = Math.floor(x * sx);
      const py = Math.floor(y * sy);
      result[x][y] = image.pixels[px][py];
    }
  }

  result.forEach((x) => {
    fs.appendFileSync(
      path.join(__dirname, "..", "/bin/in/out.pgm"),
      x.toString().replace(/,/g, " ") + "\n"
    );
  });
  return result;
};

export const transformByThreshold = (
  fn: (pixel: number) => number,
  outDir: string,
  type: string
) => {
  const image = parseImage(
    path.join(__dirname, "..", "/bin/in/Entrada_EscalaCinza.pgm")
  );
  const header = `${type}\n${image.width} ${image.height}\n\n`;
  let outImageString = "";
  outImageString = outImageString.concat(header);
  for (let i = 0; i < image.width; i++) {
    for (let x = 0; x < image.height; x++) {
      outImageString = outImageString.concat(
        fn(image.pixels[i][x]).toString() + " "
      );
    }
    outImageString = outImageString.concat("\n");
  }
  fs.writeFileSync(outDir, outImageString);
};

export const transformRgbToGrayscale = (outDir: string) => {
  const image = parseImage(
    path.join(__dirname, "..", "/bin/in/Fig4.ppm"),
    true
  );
  const result = initMatrix(image.width);
  for (let i = 0; i < image.width; i++) {
    for (let x = 0; x < image.height * 3; x += 3) {
      const sumPixels =
        image.pixels[i][x] + image.pixels[i][x + 1] + image.pixels[i][x + 2];
      result[i][x / 3] = Math.floor(sumPixels / 3);
    }
  }
  const header = `P2\n${image.width} ${image.height}\n\n`;
  let outImageString = "";
  outImageString = outImageString.concat(header);
  for (let i = 0; i < image.width; i++) {
    for (let x = 0; x < image.height; x++) {
      outImageString = outImageString.concat(result[i][x].toString() + " ");
    }
    outImageString = outImageString.concat("\n");
  }
  fs.writeFileSync(outDir, outImageString);
};

export const transformRgbToAverageChannels = (outDir: string) => {
  const image = parseImage(
    path.join(__dirname, "..", "/bin/in/Fig4.ppm"),
    true
  );
  const result = initMatrix(image.width);
  for (let i = 0; i < image.width; i++) {
    for (let x = 0; x < image.height * 3; x += 3) {
      const sumPixels =
        image.pixels[i][x] + image.pixels[i][x + 1] + image.pixels[i][x + 2];
      const averagePixel = Math.floor(sumPixels / 3);
      result[i][x] = averagePixel;
      result[i][x + 1] = averagePixel;
      result[i][x + 2] = averagePixel;
    }
  }
  const header = `P3\n${image.width} ${image.height}\n\n`;
  let outImageString = "";
  outImageString = outImageString.concat(header);
  for (let i = 0; i < image.width; i++) {
    for (let x = 0; x < image.height * 3; x++) {
      outImageString = outImageString.concat(result[i][x].toString() + " ");
    }
    outImageString = outImageString.concat("\n");
  }
  fs.writeFileSync(outDir, outImageString);
};

export const transformSeparateRgbChannel = (outDir: string, channel: number, replace: number = 0) => {
  const image = parseImage(
    path.join(__dirname, "..", "/bin/in/Fig4.ppm"),
    true
  );
  const result = initMatrix(image.width);
  for (let i = 0; i < image.width; i++) {
    for (let x = 0; x < image.height * 3; x += 3) {
      if (channel == 0) {
        result[i][x] = image.pixels[i][x];
        result[i][x + 1] = replace;
        result[i][x + 2] = replace;  
      } else if (channel == 1) {
        result[i][x] = replace;
        result[i][x + 1] = image.pixels[i][x + 1];
        result[i][x + 2] = replace;  
      } else {
        result[i][x] = replace;
        result[i][x + 1] = replace;
        result[i][x + 2] = image.pixels[i][x + 2];  
      }
    }
  }
  const maxValue = maxValueMatrix(result);
  const header = `P3\n${image.width} ${image.height}\n${maxValue}\n`;
  let outImageString = "";
  outImageString = outImageString.concat(header);
  for (let i = 0; i < image.width; i++) {
    for (let x = 0; x < image.height * 3; x++) {
      outImageString = outImageString.concat(result[i][x].toString() + " ");
    }
    outImageString = outImageString.concat("\n");
  }
  fs.writeFileSync(outDir, outImageString);
};