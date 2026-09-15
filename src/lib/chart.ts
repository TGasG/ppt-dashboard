/** Pembantu skala sederhana untuk grafik SVG yang dirender di server. */

export interface Box {
  w: number;
  h: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const innerW = (b: Box) => b.w - b.left - b.right;
export const innerH = (b: Box) => b.h - b.top - b.bottom;

/** Skala linear domain → rentang piksel. */
export const linear = (d0: number, d1: number, r0: number, r1: number) => (v: number) =>
  r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);

/** Posisi tengah pita ke-i dari n pita yang membagi lebar w. */
export const band = (i: number, n: number, w: number, pad = 0.22) => {
  const step = w / n;
  const bw = step * (1 - pad);
  return { x: i * step + (step - bw) / 2, w: bw, center: i * step + step / 2 };
};

/** Titik ke-i dari n titik yang tersebar rata dari 0 sampai w. */
export const point = (i: number, n: number, w: number) => (n === 1 ? w / 2 : (i / (n - 1)) * w);

/** Deret nilai sumbu yang rapi. */
export const ticks = (max: number, count = 5) =>
  Array.from({ length: count + 1 }, (_, i) => (max / count) * i);
