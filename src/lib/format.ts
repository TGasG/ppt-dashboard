const nf = (min: number, max = min) =>
  new Intl.NumberFormat('id-ID', { minimumFractionDigits: min, maximumFractionDigits: max });

const int = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 });

/** 1234,5 → "1.234,5" */
export const num = (v: number, digits = 0) => (digits ? nf(digits).format(v) : int.format(v));

/** Rasio SPI/CPI dengan koma desimal: 0.89 → "0,89" */
export const ratio = (v: number) => nf(2).format(v);

/** 63.5 → "63,5%" */
export const pct = (v: number, digits = 1) => `${nf(digits).format(v)}%`;

/** Rp miliar → "Rp 1,24 T" atau "Rp 890 M" */
export function rupiahMiliar(miliar: number): string {
  if (Math.abs(miliar) >= 1000) return `Rp ${nf(2).format(miliar / 1000)} T`;
  return `Rp ${nf(miliar % 1 === 0 ? 0 : 1).format(miliar)} M`;
}

/** Rp juta → "Rp 1,84 M" atau "Rp 640 jt" */
export function rupiahJuta(juta: number): string {
  if (Math.abs(juta) >= 1000) return `Rp ${nf(2).format(juta / 1000)} M`;
  return `Rp ${int.format(juta)} jt`;
}

/** Tanggal ISO → "12 Agu 2027" */
export function tanggal(iso: string): string {
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(`${iso}T00:00:00`),
  );
}

/** Selisih hari antara dua tanggal ISO */
export function selisihHari(a: string, b: string): number {
  const ms = new Date(`${a}T00:00:00`).getTime() - new Date(`${b}T00:00:00`).getTime();
  return Math.round(ms / 86_400_000);
}

/** +14 → "+14 hari", -5 → "−5 hari" (minus tipografis) */
export function hariDeviasi(d: number): string {
  if (d === 0) return 'tepat';
  return `${d > 0 ? '+' : '−'}${Math.abs(d)} hari`;
}

/** "Sekar Maharani" → "SM" */
export const inisial = (nama: string) =>
  nama
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
