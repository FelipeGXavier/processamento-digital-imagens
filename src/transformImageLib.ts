import util from "util";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import crypto from "crypto";

const command = util.promisify(exec);

export type Options = {
  rgba: boolean;
  width?: number | null;
  height?: number | null;
  scaleFactor?: number | null;
};

export const resize = async (
  inputFileName: string,
  outputFilename: string,
  options: Options
) => {
  const inputDir = path.join(__dirname, "..", "/bin/in", inputFileName);
  const tempDir = path.join(
    __dirname,
    "..",
    "/tmp",
    `/temp__img_${crypto.randomUUID()}.png`
  );
  const outputDir = path.join(__dirname, "..", "/bin", outputFilename);

  let resizeOption = "";
  if (options.width != null && options.height != null) {
    resizeOption = `${options.width}X${options.height}!`;
  } else if (options.scaleFactor != null) {
    resizeOption = `${options.scaleFactor}%`;
  } else {
    throw new Error("Invalid Options");
  }

  await command(`convert -resize ${resizeOption} ${inputDir} ${tempDir}`);
  if (!options.rgba) {
    await command(
      `convert ${tempDir} -colorspace gray -compress none -depth 8 ${outputDir}`
    );
  } else {
    await command(`convert ${tempDir} -compress none ${outputDir}`);
  }
  fs.unlinkSync(tempDir);
};

export const rotate = async (
  inputFileName: string,
  outputFilename: string,
  degree: 90 | 180,
  rgba: boolean = false
) => {
  const inputDir = path.join(__dirname, "..", "/bin/in", inputFileName);
  const tempDir = path.join(
    __dirname,
    "..",
    "/tmp",
    `/temp__img_${crypto.randomUUID()}.png`
  );
  const outputDir = path.join(__dirname, "..", "/bin", outputFilename);
  await command(`convert ${inputDir} -rotate ${degree} ${tempDir}`);
  if (!rgba) {
    await command(
      `convert ${tempDir} -colorspace gray -compress none -depth 8 ${outputDir}`
    );
  } else {
    await command(`convert ${tempDir} -compress none ${outputDir}`);
  }
  fs.unlinkSync(tempDir);
};
