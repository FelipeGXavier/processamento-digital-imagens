import fs from 'fs'

const randomPixel = (min: number, max: number): number => {
    return Math.round(
        Math.random() * (max - min) + min
    );
}

export const createRandomPbmImage = (width: number, height: number, outDir: string, filename: string) => {
    const header = `P1\n${width} ${height}\n\n`;
    let outImageString = "";
    outImageString = outImageString.concat(header);
    for (let i = 0; i < width; i++) {
        for (let x = 0; x < height; x++) {
            outImageString = outImageString.concat(randomPixel(0, 1).toString());
        }
        outImageString = outImageString.concat("\n");
    }
    fs.writeFileSync(`${outDir}/${filename}.pbm`, outImageString);
}