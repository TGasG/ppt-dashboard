/** Panel B1 — kurva-S dan B2 — anggaran vs realisasi. */

export interface SCurvePoint {
  month: string;
  plan: number;
  actual: number | null;
  /** Proyeksi mulai dari titik aktual terakhir agar garis tersambung. */
  projection: number | null;
}

export const sCurve: SCurvePoint[] = [
  { month: 'Jan', plan: 8.2, actual: 8.0, projection: null },
  { month: 'Feb', plan: 14.1, actual: 13.8, projection: null },
  { month: 'Mar', plan: 21.0, actual: 20.3, projection: null },
  { month: 'Apr', plan: 28.4, actual: 27.1, projection: null },
  { month: 'Mei', plan: 35.9, actual: 34.0, projection: null },
  { month: 'Jun', plan: 43.2, actual: 40.6, projection: null },
  { month: 'Jul', plan: 50.8, actual: 47.5, projection: null },
  { month: 'Agu', plan: 58.1, actual: 54.4, projection: null },
  { month: 'Sep', plan: 65.4, actual: 61.5, projection: 61.5 },
  { month: 'Okt', plan: 72.0, actual: null, projection: 68.5 },
  { month: 'Nov', plan: 79.3, actual: null, projection: 75.4 },
  { month: 'Des', plan: 86.5, actual: null, projection: 82.4 },
];

export const scheduleKpi = {
  spi: 0.94,
  lateMilestones: 23,
  totalMilestones: 186,
  avgFinishDeviation: 38,
  physicalProgress: 61.5,
  plannedProgress: 65.4,
  /** Laju rata-rata tiga bulan terakhir, poin persen per bulan */
  monthlyRate: 6.97,
};

export interface BudgetRow {
  label: string;
  /** Rp miliar, anggaran sampai periode berjalan */
  budget: number;
  actual: number;
  /** Baris pemborosan ditampilkan terpisah */
  isWaste?: boolean;
}

export const budgetRows: BudgetRow[] = [
  { label: 'Perumahan', budget: 1842, actual: 1798 },
  { label: 'Gedung', budget: 2986, actual: 3142 },
  { label: 'Infrastruktur', budget: 4021, actual: 3907 },
];

export const reworkRow: BudgetRow = { label: 'Perbaikan ulang', budget: 38, actual: 74.3, isWaste: true };

export const costKpi = {
  cpi: 0.96,
  bac: 16535,
  eac: 17224,
  reworkCost: 74.3,
  reworkLastYear: 81.6,
};
