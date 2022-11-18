import fs from "fs";

export const encodeImageRle = (inDir: string, outDir: string) => {
  const image = fs.readFileSync(inDir).toString();
  const content = image.split("\n");
  const pixels = [];
  const result = [];
  for (let i = 3; i < content.length; i++) {
    const cols = content[i].split(" ");
    for (let x = 0; x < cols.length; x++) {
      if (isNaN(parseInt(cols[x]))) {
        continue;
      }
      pixels.push(parseInt(cols[x]));
    }
  }
  for (let i = 0; i < pixels.length - 1; i++) {
    let counter = 1;
    while (pixels[i] == pixels[i + 1]) {
      counter++;
      i++;
    }
    if (counter >= 2) {
      result.push(`${pixels[i]}!${counter}`);
    } else {
      result.push(pixels[i]);
    }
  }
  let outImageString = "";
  outImageString = outImageString.concat("P2\n800 800\n\n");
  for (let x = 0; x < result.length; x++) {
    outImageString = outImageString.concat(result[x].toString() + " ");
  }
  fs.writeFileSync(outDir, outImageString);
};

export const decodeImageRle = (inDir: string, outDir: string) => {
  const image = fs.readFileSync(inDir).toString();
  const content = image.split(" ");
  const parsedImage = [];
  for (let i = 2; i < content.length; i++) {
    if (content[i].includes("!")) {
      const parts = content[i].split("!");
      const counter = parseInt(parts[1]);
      for (let x = 0; x < counter; x++) {
        parsedImage.push(parseInt(parts[0]));
      }
    } else {
      parsedImage.push(parseInt(content[i]));
    }
  }
  let outImageString = "";
  outImageString = outImageString.concat("P2\n800 800\n\n");
  for (let x = 0; x < parsedImage.length; x++) {
    outImageString = outImageString.concat(parsedImage[x].toString() + " ");
  }
  fs.writeFileSync(outDir, outImageString);
};
