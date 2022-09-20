import { initMatrix, parseImage } from "./util";
import fs from 'fs';

export const getHistogramPlotValues = (inDir: string, outDir: string, channel?: number) => {
    let image = parseImage(inDir);
    if (channel) {
       image = parseImage(inDir, true); 
    }
    const result = []
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
}

const hightlightByHistogram = () => {

}