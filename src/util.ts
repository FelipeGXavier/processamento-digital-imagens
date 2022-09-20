import fs from 'fs'

export const initMatrix = (row: number): number[][] => {
    const result: number[][] = [];
    for (let i = 0; i < row; i++) {
      result[i] = [];
    }
    return result;
};

export const getImageHeader = (image: number[][], rgb: boolean) => {
  const maxValue = maxValueMatrix(image);
  let id = rgb ? 'P3' : 'P2';
  return `${id}\n${image.length} ${image[0].length}\n${maxValue}\n`;
}

export const writeImageToFile = (image: number[][], outDir: string, rgb: boolean) => {
  let outImageString = "";
  outImageString = outImageString.concat(getImageHeader(image, rgb));
  for (let i = 0; i < image.length; i++) {
    for (let x = 0; x < image[0].length; x++) {
      outImageString = outImageString.concat(image[i][x].toString() + " ");
    }
    outImageString = outImageString.concat("\n");
  }
  fs.writeFileSync(outDir, outImageString);
}

export const parseImage = (dir: string, rgb: boolean = false) => {
    const image = fs.readFileSync(dir).toString();
    const content = image.split("\n");
    const pixels = [];
    const width = parseInt(content[1].split(" ")[0]);
    const height = parseInt(content[1].split(" ")[1]);
    for (let i = 3; i < content.length; i++) {
      const cols = content[i].split(" ");
      for (let x = 0; x < cols.length; x++) {
        if (isNaN(parseInt(cols[x]))) {
          continue;
        }
        pixels.push(parseInt(cols[x]));
      }
    }
    let chunkSize = height;
    if (rgb) {
      chunkSize = height * 3;
    }
    const result = [];
    for (let i = 0; i < pixels.length; i += chunkSize) {
      const chunk = pixels.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return { width, height, pixels: result };
};

export const maxValueMatrix = (n: number[][]) => {
    let max = n[0][0];
    for (let i = 0; i < n.length; i++) {
      if (Math.max.apply(Math, n[i]) > max) {
        max = Math.max.apply(Math, n[i]);
      }
    }
    return max;
}

export const minValueMatrix = (n: number[][]) => {
  let min = n[0][0];
  for (let i = 0; i < n.length; i++) {
    if (Math.min.apply(Math, n[i]) < min) {
      min = Math.min.apply(Math, n[i]);
    }
  }
  return min;
}