/** Panel E1 — suara masyarakat, E2 — indeks risiko sosial, E3 — program komunitas. */

export interface SentimentMonth {
  month: string;
  positive: number;
  neutral: number;
  negative: number;
}

export const sentiment: SentimentMonth[] = [
  { month: 'Apr', positive: 142, neutral: 98, negative: 61 },
  { month: 'Mei', positive: 151, neutral: 104, negative: 72 },
  { month: 'Jun', positive: 138, neutral: 96, negative: 88 },
  { month: 'Jul', positive: 129, neutral: 101, negative: 104 },
  { month: 'Agu', positive: 118, neutral: 94, negative: 131 },
  { month: 'Sep', positive: 133, neutral: 99, negative: 118 },
];

export const voiceKpi = {
  incomingThisMonth: 350,
  incomingLastMonth: 343,
  avgResponseDays: 2.8,
  targetResponseDays: 1,
  disruptionIncidents12m: 4,
};

export interface SocialRiskRow {
  projectId: string;
  index: number;
  unanswered: number;
  /** Komponen indeks, masing-masing sudah dinormalisasi 0–100 */
  components: { sentiment: number; unanswered: number; responseDelay: number; incidents: number };
}

export const socialRisk: SocialRiskRow[] = [
  { projectId: 'PRJ-014', index: 78, unanswered: 24, components: { sentiment: 84, unanswered: 91, responseDelay: 62, incidents: 65 } },
  { projectId: 'PRJ-009', index: 71, unanswered: 19, components: { sentiment: 76, unanswered: 78, responseDelay: 58, incidents: 64 } },
  { projectId: 'PRJ-003', index: 52, unanswered: 11, components: { sentiment: 58, unanswered: 49, responseDelay: 47, incidents: 48 } },
  { projectId: 'PRJ-007', index: 44, unanswered: 9, components: { sentiment: 47, unanswered: 41, responseDelay: 52, incidents: 34 } },
  { projectId: 'PRJ-010', index: 41, unanswered: 7, components: { sentiment: 46, unanswered: 33, responseDelay: 44, incidents: 39 } },
  { projectId: 'PRJ-011', index: 38, unanswered: 5, components: { sentiment: 41, unanswered: 27, responseDelay: 39, incidents: 43 } },
  { projectId: 'PRJ-004', index: 33, unanswered: 4, components: { sentiment: 35, unanswered: 22, responseDelay: 36, incidents: 38 } },
  { projectId: 'PRJ-005', index: 29, unanswered: 3, components: { sentiment: 31, unanswered: 18, responseDelay: 33, incidents: 32 } },
];

export interface CommunityProgram {
  label: string;
  unit: string;
  target: number;
  actual: number;
  note: string;
}

export const communityPrograms: CommunityProgram[] = [
  { label: 'Warga lokal direkrut', unit: 'orang', target: 2400, actual: 1918, note: 'Tertinggal di Talumolo dan Randublatung' },
  { label: 'Klinik dan posyandu', unit: 'unit', target: 18, actual: 11, note: '4 unit dalam pembangunan' },
  { label: 'Rumah ibadah diperbaiki', unit: 'unit', target: 26, actual: 22, note: 'Sesuai jadwal' },
  { label: 'Ruas jalan warga', unit: 'km', target: 41, actual: 27.5, note: 'Terhambat musim hujan di Blora' },
];
