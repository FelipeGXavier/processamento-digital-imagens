import { createRandomPbmImage } from "./pbm.service";
import path from 'path';

createRandomPbmImage(1000, 1000, path.join(__dirname, "..", "/bin"), "image_1000_1000");