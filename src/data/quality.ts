/** Panel D1 — tren temuan, D2 — umur temuan terbuka, D3 — keselamatan dan sumber daya. */

export interface FindingMonth {
  month: string;
  closed: number;
  open: number;
}

export const findingTrend: FindingMonth[] = [
  { month: 'Okt 25', closed: 62, open: 2 },
  { month: 'Nov 25', closed: 58, open: 3 },
  { month: 'Des 25', closed: 71, open: 3 },
  { month: 'Jan 26', closed: 64, open: 4 },
  { month: 'Feb 26', closed: 69, open: 4 },
  { month: 'Mar 26', closed: 77, open: 5 },
  { month: 'Apr 26', closed: 73, open: 6 },
  { month: 'Mei 26', closed: 81, open: 7 },
  { month: 'Jun 26', closed: 86, open: 9 },
  { month: 'Jul 26', closed: 79, open: 12 },
  { month: 'Agu 26', closed: 92, open: 22 },
  { month: 'Sep 26', closed: 54, open: 40 },
];

export const qualityKpi = {
  passRate: 93.1,
  passRatePrev: 94.8,
  openFindings: 117,
  severeOpen: 15,
  /** Kenaikan temuan terbuka tiga bulan terakhir, persen */
  openTrendPct: 233,
};

export interface AgeBucket {
  label: string;
  count: number;
  severe: number;
  critical?: boolean;
}

export const ageBuckets: AgeBucket[] = [
  { label: '0–3 hari', count: 38, severe: 2 },
  { label: '4–7 hari', count: 31, severe: 3 },
  { label: '8–14 hari', count: 27, severe: 4 },
  { label: 'Lebih dari 14 hari', count: 21, severe: 6, critical: true },
];

export const followUpKpi = {
  avgDays: 9.4,
  targetDays: 3,
  avgDaysPrev: 11.2,
};

export const safetyKpi = {
  attendance: 91.4,
  attendancePlan: 95,
  equipmentUtilisation: 63.2,
  equipmentTarget: 75,
  incidentsThisMonth: 3,
  incidentsLastMonth: 5,
  daysWithoutSevereIncident: 128,
  idlestSite: { projectId: 'PRJ-011', utilisation: 38 },
};
