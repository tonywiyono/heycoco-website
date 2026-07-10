import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { rename, unlink } from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.join(__dirname, "../public/logo.png");

const { data, info } = await sharp(logoPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  // Knock out near-black background pixels
  if (r < 40 && g < 40 && b < 40) {
    data[i + 3] = 0;
  }
}

const tmpPath = `${logoPath}.tmp`;

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(tmpPath);

await unlink(logoPath).catch(() => {});
await rename(tmpPath, logoPath);

console.log("Logo background made transparent:", logoPath);
