import fs from "fs";
import path from "path";

// const parseImage = (dir: string) => {
//   const image = fs.readFileSync(dir).toString();
//   const content = image.split("\n");
//   const pixels = [];
//   const width = parseInt(content[1].split(" ")[0]);
//   const height = parseInt(content[1].split(" ")[1]);
//   for (let i = 2; i < content.length; i++) {
//     for (let x = 0; x < content[i].length; x++) {
//       pixels[i - 2 + x] = parseInt(content[i]);
//     }
//   }
//   const chunkSize = width;
//   const result = [];
//   for (let i = 0; i < pixels.length; i += chunkSize) {
//     const chunk = pixels.slice(i, i + chunkSize);
//     result.push(chunk);
//   }
//   return { width, height, pixels: result };
// };

const parseImage = (dir: string) => {
  const image = fs.readFileSync(dir).toString();
  const content = image.split("\n");
  const width = parseInt(content[1].split(" ")[0]);
  const height = parseInt(content[1].split(" ")[1]);

  const result: number[][] = [];

  for (let i = 0; i < width; i++) {
    result[i] = [];
  }

  for (let i = 2; i < content.length; i++) {
    if (content[i].length <= 1) {
      continue;
    }
    const cols = content[i].split(" ");
    for (let x = 0; x < cols.length; x++) {
      result[i - 2][x] = parseInt(cols[x]);
    }
  }
  return { width, height, pixels: result };
};

export const resize = (width: number, height: number) => {
  const image = parseImage(
    path.join(__dirname, "..", "/bin/in/Entrada_EscalaCinza.pgm")
  );

  const sx = image.width / width;
  const sy = image.height / height;

  const result: number[][] = [];
  for (let i = 0; i < width; i++) {
    result[i] = [];
  }

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
  const result: number[][] = [];
  for (let i = 0; i < image.width; i++) {
    result[i] = [];
  }

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
