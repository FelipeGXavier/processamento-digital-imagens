import { initMatrix, parseImage, minValueMatrix, maxValueMatrix, getImageHeader, writeImageToFile } from './util';
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

export const hightlightByHistogram = (inDir: string, outDir: string, rgb: boolean = false) => {
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

export const hightlightByHistogramEqualization = (inDir: string, outDir: string) => {
  const image = parseImage(inDir);
  const values = image.pixels.flat();
  const histogramValues: { [key: string] : number } = {};
  const mn = image.width * image.height;
  for (let i = 0; i < values.length; i++) {
    if (!histogramValues[values[i].toString()]) {
      histogramValues[values[i].toString()] = 0;
    }
    histogramValues[values[i].toString()]++;
  }

  for (const key in histogramValues) {
    histogramValues[key] = histogramValues[key]/mn;
  }

  const accumlationSum = (pixel: number) => {
    let sum = 0;
    for (let i = 0 ; i <= pixel; i++) {
      if (histogramValues[i.toString()]) {
        sum += histogramValues[i.toString()];
      }
    }
    return Math.floor(255 * sum);
  }

  const result = initMatrix(image.width);
  for (let i = 0; i < image.width; i++) {
    for (let x = 0; x < (false ? image.height * 3 : image.height); x++) {
      result[i][x] = accumlationSum(image.pixels[i][x]);
    }
  }
  writeImageToFile(result, outDir, false);
}
