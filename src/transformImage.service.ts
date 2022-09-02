import fs from "fs";
import path from "path";

const parseImage = () => {
  const image = fs
    .readFileSync(path.join(__dirname, "..", "/bin/in/Entrada_EscalaCinza.pgm"))
    .toString();
  const content = image.split("\n");
  const pixels = [];
  const width = parseInt(content[1].split(" ")[0]);
  const height = parseInt(content[1].split(" ")[1]);
  for (let i = 2; i < content.length; i++) {
    pixels[i - 2] = parseInt(content[i]);
  }
  const chunkSize = width;
  const result = [];
  for (let i = 0; i < pixels.length; i += chunkSize) {
    const chunk = pixels.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return { width, height, pixels: result };
};

export const resize = (width: number, height: number) => {
  const image = parseImage();

  image.pixels.forEach((x) => {
    fs.appendFileSync(
      path.join(__dirname, "..", "/bin/in/out.pgm"),
      x.toString() + "\n"
    );
  });

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

resize(1920, 1080);
