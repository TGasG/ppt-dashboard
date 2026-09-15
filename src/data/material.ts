/** Panel C1 — jejak material, dan C2 — keseimbangan stok antar proyek. */

export interface TraceStage {
  label: string;
  /** Rp miliar, jendela 30 hari terakhir */
  value: number;
  note?: string;
}

export const traceStages: TraceStage[] = [
  { label: 'Dipesan ke pemasok', value: 92.6 },
  { label: 'Diterima gudang', value: 90.6, note: 'Selisih timbangan dan penolakan mutu di pintu gudang' },
  { label: 'Keluar gudang', value: 89.5, note: 'Susut wajar penyimpanan' },
  {
    label: 'Tercatat terpasang',
    value: 83.4,
    note: 'Titik paling dicurigai berdasarkan temuan audit: dokumen serah terima tidak cocok dengan pembacaan RFID gerbang',
  },
];

export const traceKpi = {
  warehouseToSiteVariance: 6.8,
  untrackedValue: 6085, // Rp juta
  sensorAnomalies7d: 17,
  sensorAnomaliesPrev7d: 11,
};

export interface SupplyCell {
  projectId: string;
  days: number;
}

export interface MaterialRow {
  material: string;
  unit: string;
  cells: SupplyCell[];
}

/** Hari pasokan = stok di lokasi / rata-rata pemakaian harian 14 hari terakhir. */
export const supplyMatrix: MaterialRow[] = [
  {
    material: 'Semen',
    unit: 'sak',
    cells: [
      { projectId: 'PRJ-001', days: 14 }, { projectId: 'PRJ-002', days: 24 },
      { projectId: 'PRJ-003', days: 5 },  { projectId: 'PRJ-004', days: 19 },
      { projectId: 'PRJ-005', days: 11 }, { projectId: 'PRJ-006', days: 12 },
      { projectId: 'PRJ-007', days: 8 },  { projectId: 'PRJ-008', days: 17 },
      { projectId: 'PRJ-009', days: 13 }, { projectId: 'PRJ-010', days: 21 },
      { projectId: 'PRJ-011', days: 16 }, { projectId: 'PRJ-012', days: 15 },
      { projectId: 'PRJ-013', days: 18 }, { projectId: 'PRJ-014', days: 6 },
    ],
  },
  {
    material: 'Besi beton',
    unit: 'ton',
    cells: [
      { projectId: 'PRJ-001', days: 12 }, { projectId: 'PRJ-002', days: 22 },
      { projectId: 'PRJ-003', days: 10 }, { projectId: 'PRJ-004', days: 23 },
      { projectId: 'PRJ-005', days: 9 },  { projectId: 'PRJ-006', days: 11 },
      { projectId: 'PRJ-007', days: 4 },  { projectId: 'PRJ-008', days: 20 },
      { projectId: 'PRJ-009', days: 9 },  { projectId: 'PRJ-010', days: 26 },
      { projectId: 'PRJ-011', days: 34 }, { projectId: 'PRJ-012', days: 14 },
      { projectId: 'PRJ-013', days: 19 }, { projectId: 'PRJ-014', days: 2 },
    ],
  },
  {
    material: 'Batu split',
    unit: 'm³',
    cells: [
      { projectId: 'PRJ-001', days: 18 }, { projectId: 'PRJ-002', days: 26 },
      { projectId: 'PRJ-003', days: 15 }, { projectId: 'PRJ-004', days: 21 },
      { projectId: 'PRJ-005', days: 13 }, { projectId: 'PRJ-006', days: 16 },
      { projectId: 'PRJ-007', days: 12 }, { projectId: 'PRJ-008', days: 24 },
      { projectId: 'PRJ-009', days: 6 },  { projectId: 'PRJ-010', days: 29 },
      { projectId: 'PRJ-011', days: 27 }, { projectId: 'PRJ-012', days: 17 },
      { projectId: 'PRJ-013', days: 22 }, { projectId: 'PRJ-014', days: 7 },
    ],
  },
  {
    material: 'Pasir beton',
    unit: 'm³',
    cells: [
      { projectId: 'PRJ-001', days: 16 }, { projectId: 'PRJ-002', days: 19 },
      { projectId: 'PRJ-003', days: 12 }, { projectId: 'PRJ-004', days: 18 },
      { projectId: 'PRJ-005', days: 14 }, { projectId: 'PRJ-006', days: 13 },
      { projectId: 'PRJ-007', days: 10 }, { projectId: 'PRJ-008', days: 22 },
      { projectId: 'PRJ-009', days: 11 }, { projectId: 'PRJ-010', days: 23 },
      { projectId: 'PRJ-011', days: 25 }, { projectId: 'PRJ-012', days: 16 },
      { projectId: 'PRJ-013', days: 20 }, { projectId: 'PRJ-014', days: 5 },
    ],
  },
  {
    material: 'Bata ringan',
    unit: 'm³',
    cells: [
      { projectId: 'PRJ-001', days: 20 }, { projectId: 'PRJ-002', days: 17 },
      { projectId: 'PRJ-003', days: 9 },  { projectId: 'PRJ-004', days: 26 },
      { projectId: 'PRJ-005', days: 15 }, { projectId: 'PRJ-006', days: 18 },
      { projectId: 'PRJ-007', days: 7 },  { projectId: 'PRJ-008', days: 31 },
      { projectId: 'PRJ-009', days: 28 }, { projectId: 'PRJ-010', days: 24 },
      { projectId: 'PRJ-011', days: 23 }, { projectId: 'PRJ-012', days: 21 },
      { projectId: 'PRJ-013', days: 12 }, { projectId: 'PRJ-014', days: 13 },
    ],
  },
  {
    material: 'Keramik',
    unit: 'm²',
    cells: [
      { projectId: 'PRJ-001', days: 22 }, { projectId: 'PRJ-002', days: 14 },
      { projectId: 'PRJ-003', days: 11 }, { projectId: 'PRJ-004', days: 33 },
      { projectId: 'PRJ-005', days: 8 },  { projectId: 'PRJ-006', days: 19 },
      { projectId: 'PRJ-007', days: 16 }, { projectId: 'PRJ-008', days: 27 },
      { projectId: 'PRJ-009', days: 35 }, { projectId: 'PRJ-010', days: 30 },
      { projectId: 'PRJ-011', days: 29 }, { projectId: 'PRJ-012', days: 26 },
      { projectId: 'PRJ-013', days: 7 },  { projectId: 'PRJ-014', days: 18 },
    ],
  },
  {
    material: 'Aspal hotmix',
    unit: 'ton',
    cells: [
      { projectId: 'PRJ-001', days: 25 }, { projectId: 'PRJ-002', days: 28 },
      { projectId: 'PRJ-003', days: 21 }, { projectId: 'PRJ-004', days: 30 },
      { projectId: 'PRJ-005', days: 24 }, { projectId: 'PRJ-006', days: 22 },
      { projectId: 'PRJ-007', days: 20 }, { projectId: 'PRJ-008', days: 26 },
      { projectId: 'PRJ-009', days: 3 },  { projectId: 'PRJ-010', days: 15 },
      { projectId: 'PRJ-011', days: 19 }, { projectId: 'PRJ-012', days: 23 },
      { projectId: 'PRJ-013', days: 27 }, { projectId: 'PRJ-014', days: 4 },
    ],
  },
];

export interface TransferSuggestion {
  material: string;
  from: string;
  to: string;
  qty: string;
  /** Rp juta */
  saving: number;
  reason: string;
}

export const transferSuggestions: TransferSuggestion[] = [
  {
    material: 'Besi beton',
    from: 'PRJ-011',
    to: 'PRJ-014',
    qty: '180 ton',
    saving: 412,
    reason: 'Defisit 2 hari pasokan berhadapan dengan surplus 34 hari; jarak angkut laut 2 hari',
  },
  {
    material: 'Aspal hotmix',
    from: 'PRJ-004',
    to: 'PRJ-009',
    qty: '620 ton',
    saving: 288,
    reason: 'Rigid pavement STA 9+400 terjadwal 4 hari lagi, stok tersisa 3 hari',
  },
  {
    material: 'Batu split',
    from: 'PRJ-010',
    to: 'PRJ-009',
    qty: '1.250 m³',
    saving: 224,
    reason: 'Selisih 23 hari pasokan antar lokasi berjarak 61 km',
  },
  {
    material: 'Semen',
    from: 'PRJ-002',
    to: 'PRJ-003',
    qty: '900 sak',
    saving: 68,
    reason: 'Pemakaian dua minggu ke depan naik 40% di Taman Asri Gedebage',
  },
  {
    material: 'Bata ringan',
    from: 'PRJ-008',
    to: 'PRJ-007',
    qty: '640 m³',
    saving: 96,
    reason: 'Pekerjaan dinding lantai 21–28 dimulai pekan depan',
  },
];
