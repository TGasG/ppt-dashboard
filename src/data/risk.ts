/** Panel F2 — isu kritis menunggu keputusan direksi. */

export type IssueStatus = 'Menunggu keputusan' | 'Dalam penanganan' | 'Baru';
export type IssueSource = 'Eskalasi temuan' | 'Anomali material' | 'Stok kritis' | 'Diajukan Direktur Operasi';

export interface CriticalIssue {
  id: string;
  title: string;
  projectId: string;
  owner: string;
  due: string;
  status: IssueStatus;
  source: IssueSource;
  /** Dampak dalam Rp juta bila tersedia */
  impact?: number;
}

/** Tanggal acuan dashboard: 15 September 2026. */
export const today = '2026-09-15';

export const criticalIssues: CriticalIssue[] = [
  {
    id: 'ISU-2026-081',
    title: 'Selisih material besi beton tidak terlacak di gerbang Talumolo',
    projectId: 'PRJ-014',
    owner: 'Rangga Wicaksana',
    due: '2026-09-10',
    status: 'Menunggu keputusan',
    source: 'Anomali material',
    impact: 1840,
  },
  {
    id: 'ISU-2026-084',
    title: 'Selisih material fasad melampaui Rp 1 M pada dua paket subkontrak',
    projectId: 'PRJ-007',
    owner: 'Prasetyo Nugroho',
    due: '2026-09-12',
    status: 'Menunggu keputusan',
    source: 'Anomali material',
    impact: 2310,
  },
  {
    id: 'ISU-2026-086',
    title: 'Enam temuan berat berumur lebih dari 14 hari belum ditindaklanjuti',
    projectId: 'PRJ-014',
    owner: 'Rangga Wicaksana',
    due: '2026-09-14',
    status: 'Dalam penanganan',
    source: 'Eskalasi temuan',
  },
  {
    id: 'ISU-2026-089',
    title: 'Pekerjaan pier head terancam berhenti — besi beton tersisa 2 hari',
    projectId: 'PRJ-014',
    owner: 'Rangga Wicaksana',
    due: '2026-09-17',
    status: 'Menunggu keputusan',
    source: 'Stok kritis',
    impact: 950,
  },
  {
    id: 'ISU-2026-090',
    title: 'Pembebasan lahan STA 14+200 belum tuntas, menahan pekerjaan rigid pavement',
    projectId: 'PRJ-009',
    owner: 'Anindita Kusuma',
    due: '2026-09-30',
    status: 'Dalam penanganan',
    source: 'Diajukan Direktur Operasi',
    impact: 4200,
  },
  {
    id: 'ISU-2026-092',
    title: 'Penolakan warga koridor Ngemplak terhadap rencana pekerjaan malam',
    projectId: 'PRJ-010',
    owner: 'Bimo Respati',
    due: '2026-09-25',
    status: 'Dalam penanganan',
    source: 'Diajukan Direktur Operasi',
  },
  {
    id: 'ISU-2026-094',
    title: 'Revisi harga satuan pekerjaan MEP melampaui anggaran 6%',
    projectId: 'PRJ-005',
    owner: 'Prasetyo Nugroho',
    due: '2026-09-22',
    status: 'Baru',
    source: 'Diajukan Direktur Operasi',
    impact: 680,
  },
  {
    id: 'ISU-2026-095',
    title: 'Temuan berat retak struktur pile cap zona B menunggu keputusan perkuatan',
    projectId: 'PRJ-004',
    owner: 'Rangga Wicaksana',
    due: '2026-09-19',
    status: 'Baru',
    source: 'Eskalasi temuan',
    impact: 520,
  },
];
