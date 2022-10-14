import {
  initMatrix,
  parseImage,
  minValueMatrix,
  maxValueMatrix,
  writeImageToFile,
} from "./util";
import fs from "fs";

export const getHistogramPlotValues = (
  inDir: string,
  outDir: string,
  channel?: number
) => {
  let image = parseImage(inDir);
  if (channel) {
    image = parseImage(inDir, true);
  }
  const result = [];
  if (channel) {
    for (let i = 0; i < image.width; i++) {
      for (let x = 0; x < image.height * 3; x += 3) {
        if (channel == 0) {
          result.push(image.pixels[i][x]);
        } else if (channel == 1) {
          result.push(image.pixels[i][x + 1]);
        } else {
          result.push(image.pixels[i][x + 2]);
        }
      }
    }
  } else {
    for (let i = 0; i < image.width; i++) {
      for (let x = 0; x < image.height; x++) {
        result.push(image.pixels[i][x]);
      }
    }
  }
  let outValues = "";
  for (let x = 0; x < result.length; x++) {
    outValues = outValues.concat(`${result[x]},`);
  }
  fs.writeFileSync(outDir, outValues);
};

export const hightlightByHistogram = (
  inDir: string,
  outDir: string,
  rgb: boolean = false
) => {
  let image = parseImage(inDir);
  if (rgb) {
    image = parseImage(inDir, true);
  }
  const minValue = minValueMatrix(image.pixels);
  const maxValue = maxValueMatrix(image.pixels);

  const coefA = 255 / (maxValue - minValue);
  const coefB = -coefA * minValue;

  const histogramEq = (x: number) => {
    return Math.ceil(coefA * x + coefB);
  };

  const result = initMatrix(image.width);
  for (let i = 0; i < image.width; i++) {
    for (let x = 0; x < (rgb ? image.height * 3 : image.height); x++) {
      result[i][x] = histogramEq(image.pixels[i][x]);
    }
  }
  writeImageToFile(result, outDir, rgb);
};

export const hightlightByHistogramEqualization = (
  inDir: string,
  outDir: string
) => {
  const image = parseImage(inDir);
  const values = image.pixels.flat();
  const histogramValues: { [key: string]: number } = {};
  const mn = image.width * image.height;
  for (let i = 0; i < values.length; i++) {
    if (!histogramValues[values[i].toString()]) {
      histogramValues[values[i].toString()] = 0;
    }
    histogramValues[values[i].toString()]++;
  }

  for (const key in histogramValues) {
    histogramValues[key] = histogramValues[key] / mn;
  }

  const accumlationSum = (pixel: number) => {
    let sum = 0;
    for (let i = 0; i <= pixel; i++) {
      if (histogramValues[i.toString()]) {
        sum += histogramValues[i.toString()];
      }
    }
    return Math.floor(255 * sum);
  };

  const result = initMatrix(image.width);
  for (let i = 0; i < image.width; i++) {
    for (let x = 0; x < (false ? image.height * 3 : image.height); x++) {
      result[i][x] = accumlationSum(image.pixels[i][x]);
    }
  }
  writeImageToFile(result, outDir, false);
};

export const rotateImage = (
  inDir: string,
  outDir: string,
  rotation: 90 | 180,
  rgb = false
) => {
  let image = parseImage(inDir);
  if (rgb) {
    image = parseImage(inDir, true);
  }
  let result = initMatrix(rgb ? image.width * 3 : image.width);
  const n = image.width;
  if (rotation == 90) {
    for (let i = 0; i < image.width; i++) {
      for (let j = 0; j < (rgb ? image.height * 3 : image.height); j++) {
        result[j][n - 1 - i] = image.pixels[i][j];
      }
    }
  } else {
    const w = image.pixels[0].length;
    const h = image.pixels.length;
    let b = new Array(h);
    for (let y = 0; y < h; y++) {
      let n = h - 1 - y;
      b[n] = new Array(w);
      for (let x = 0; x < w; x++) {
        b[n][w - 1 - x] = image.pixels[y][x];
      }
    }
    result = b;
  }
  writeImageToFile(result, outDir, rgb);
};

export enum ImageOp {
  Add,
  Sub,
}

export const imageOperation = (
  baseImageDir: string,
  otherImageDir: string,
  outDir: string,
  op: ImageOp,
  rgb: boolean = false
) => {
  const baseImage = parseImage(baseImageDir, true);
  const otherImage = parseImage(otherImageDir, true);
  if (
    baseImage.width != otherImage.width ||
    baseImage.height != otherImage.height
  ) {
    throw new Error("Images must have same width");
  }
  let result = initMatrix(rgb ? baseImage.width * 3 : baseImage.width);
  for (let i = 0; i < baseImage.pixels.length; i++) {
    for (let j = 0; j < baseImage.pixels[0].length; j++) {
      const value = pixelOpTruncate(op, baseImage.pixels[i][j], otherImage.pixels[i][j])
      result[i][j] = value;  
    }
  }
  let outImageString = "";
  outImageString = outImageString.concat(`P3\n2560 1080\n255\n`);
  for (let i = 0; i < result.length; i++) {
    for (let x = 0; x < result[i].length; x++) {
      outImageString = outImageString.concat(result[i][x].toString() + " ");
    }
    outImageString = outImageString.concat("\n");
  }
  fs.writeFileSync(outDir, outImageString);
};

export const imageOperationWithArea = (
  baseImageDir: string,
  otherImageDir: string,
  outDir: string,
  op: ImageOp,
  start: number,
  values: {width: number, height: number},
  rgb: boolean = false
) => {
  const baseImage = parseImage(baseImageDir, true);
  const otherImage = parseImage(otherImageDir, true);
  let result = initMatrix(rgb ? baseImage.width * 3 : baseImage.width);
  const fitInInterestArea = (i: number, j: number) => {
    /*start ~ start + width
    start ~ start + height
    start + height ~ start + width
    start + width ~ start + height*/
    return i >= start 
            && i < start + values.width 
            && j >= start 
            && j < start + values.height
  }
  for (let i = 0; i < baseImage.pixels.length; i++) {
    for (let j = 0; j < baseImage.pixels[0].length; j++) {
      if (fitInInterestArea(i, j)) {
        const value = pixelOpTruncate(op, baseImage.pixels[i][j], otherImage.pixels[i][j])
        result[i][j] = value;  
      } else {
        result[i][j] = baseImage.pixels[i][j];  
      }
    }
  }
  let outImageString = "";
  outImageString = outImageString.concat(`P3\n2560 1080\n255\n`);
  for (let i = 0; i < result.length; i++) {
    for (let x = 0; x < result[i].length; x++) {
      outImageString = outImageString.concat(result[i][x].toString() + " ");
    }
    outImageString = outImageString.concat("\n");
  }
  fs.writeFileSync(outDir, outImageString);
};

const pixelOpTruncate = (op: ImageOp, pixel1: number, pixel2:number) => {
  let value = pixel1 - pixel2;
  if (op == ImageOp.Add) {
    value = pixel1 + pixel2;
  }
  if (value < 0) {
    value = 0;
  } else if (value > 255) {
    value = 255;
  }
  return value;
}