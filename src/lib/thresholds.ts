/**
 * Ambang batas dikelola oleh Divisi Analitik dan dapat diubah tanpa
 * mengubah kode panel. Di sistem nyata nilai ini datang dari API
 * konfigurasi; di prototipe disimpan sebagai satu berkas terpusat.
 */
export const thresholds = {
  rag: {
    critical: { spi: 0.9, cpi: 0.92, materialVariance: 5 },
    warning: { spi: 0.95, cpi: 0.96, materialVariance: 2.5 },
  },
  supplyDays: { critical: 4, warning: 9, ideal: 20 },
  findingAge: { reminder: 3, escalate: 7, board: 14 },
  riskScore: { high: 70, medium: 50 },
  materialVarianceTarget: 2,
  responseTimeTargetDays: 3,
  criticalAnomalyValue: 1000, // Rp juta — ambang isu kritis panel F2
} as const;
