import type { Project } from '../data/projects';
import { thresholds } from './thresholds';

export type Rag = 'merah' | 'kuning' | 'hijau';

export const ragLabel: Record<Rag, string> = {
  merah: 'Kritis',
  kuning: 'Waspada',
  hijau: 'Sesuai rencana',
};

/** Aturan penetapan status RAG sesuai spesifikasi panel A. */
export function ragOf(p: Project): Rag {
  const { critical, warning } = thresholds.rag;
  if (p.spi < critical.spi || p.cpi < critical.cpi || p.materialVariance > critical.materialVariance)
    return 'merah';
  if (p.spi < warning.spi || p.cpi < warning.cpi || p.materialVariance > warning.materialVariance)
    return 'kuning';
  return 'hijau';
}

/** Alasan singkat mengapa proyek berstatus merah atau kuning. */
export function ragReasons(p: Project): string[] {
  const { critical, warning } = thresholds.rag;
  const out: string[] = [];
  if (p.spi < critical.spi) out.push('SPI di bawah 0,90');
  else if (p.spi < warning.spi) out.push('SPI di bawah 0,95');
  if (p.cpi < critical.cpi) out.push('CPI di bawah 0,92');
  else if (p.cpi < warning.cpi) out.push('CPI di bawah 0,96');
  if (p.materialVariance > critical.materialVariance) out.push('Selisih material di atas 5%');
  else if (p.materialVariance > warning.materialVariance) out.push('Selisih material di atas 2,5%');
  return out;
}

/** Kartu diberi penanda "Anomali" bila selisih material melewati ambang kritis. */
export const isAnomali = (p: Project) => p.materialVariance > thresholds.rag.critical.materialVariance;

/** Warna CSS untuk pita status. */
export const ragColor: Record<Rag, string> = {
  merah: 'var(--red)',
  kuning: 'var(--amber)',
  hijau: 'var(--green)',
};

/** Kelas warna hari pasokan untuk matriks C2. */
export function supplyBand(days: number): { key: 'kritis' | 'segera' | 'ideal' | 'mengendap'; label: string } {
  const t = thresholds.supplyDays;
  if (days <= t.critical) return { key: 'kritis', label: 'Terancam berhenti' };
  if (days <= t.warning) return { key: 'segera', label: 'Perlu pemesanan segera' };
  if (days <= t.ideal) return { key: 'ideal', label: 'Ideal' };
  return { key: 'mengendap', label: 'Modal mengendap' };
}
