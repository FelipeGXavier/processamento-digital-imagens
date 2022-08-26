import fs from 'fs'
import path from 'path';

const randomPixel = (min: number, max: number): number => {
    return Math.round(
        Math.random() * (max - min) + min
    );
}

type Image = {
    ext: string;
    header: string;
    isRgb: boolean;
}

export const PBM: Image = {ext: ".ppm", header: "P1", isRgb: false}
export const PGM: Image = {ext: ".pgm", header: "P2", isRgb: false}
export const PPM: Image = {ext: ".ppm", header: "P3", isRgb: true}

export type ImagePixelRange = {
    start: number,
    end: number
}

export const createRandomImage = (imageInfo: Image, 
                                  width: number,
                                  height: number,
                                  range: ImagePixelRange,
                                  filename: string,
                                  outDir = path.join(__dirname, "..", "/bin")) => {
    const header = `${imageInfo.header}\n${width} ${height}\n\n`;
    let outImageString = "";
    outImageString = outImageString.concat(header);
    for (let i = 0; i < width; i++) {
        for (let x = 0; x < height; x++) {
            if(!imageInfo.isRgb) {
                outImageString = outImageString.concat(randomPixel(range.start, range.end).toString() + " ");
            } else {
                for (let j = 0; j < 3; j++) {
                    outImageString = outImageString.concat(randomPixel(range.start, range.end).toString() + " ");
                }
            }
        }
        outImageString = outImageString.concat("\n");
    }
    fs.writeFileSync(`${outDir}/${filename}${imageInfo.ext}`, outImageString);
}