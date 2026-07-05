import fs from "fs";
import path from "path";
import { galleryCaptions } from "./gallery-captions";

const IMAGE_EXTENSIONS = new Set([
  ".webp",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".avif",
]);

export type SiteImage = {
  src: string;
  alt: string;
  filename: string;
  caption?: string;
};

/** Кодирует имя файла для URL (пробелы, скобки и т.д.) */
export function imagePath(filename: string): string {
  return `/images/${encodeURIComponent(filename)}`;
}

function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function isImageFile(filename: string): boolean {
  return IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

/** Читает все изображения из public/images (webp, png, jpg и др.) */
export function getSiteImages(): {
  heroImage: string | null;
  galleryImages: SiteImage[];
} {
  const imagesDir = path.join(process.cwd(), "public", "images");

  if (!fs.existsSync(imagesDir)) {
    return { heroImage: null, galleryImages: [] };
  }

  const files = fs
    .readdirSync(imagesDir)
    .filter(isImageFile)
    .sort(naturalSort);

  const galleryImages: SiteImage[] = files.map((file) => {
    const caption = galleryCaptions[file];
    return {
      src: imagePath(file),
      alt: caption ?? "Студия красоты Эсперанза",
      filename: file,
      caption,
    };
  });

  const heroFile =
    files.find((f) => /^salon-hero\.(webp|png|jpe?g|avif|gif)$/i.test(f)) ??
    files.find((f) => /^XXXL\.(webp|png|jpe?g|avif|gif)$/i.test(f)) ??
    files[0] ??
    null;

  return {
    heroImage: heroFile ? imagePath(heroFile) : null,
    galleryImages,
  };
}
