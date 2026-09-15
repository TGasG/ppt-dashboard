/** Konteks kepala halaman: identitas sistem dan kesegaran data per aliran. */

export const dashboardMeta = {
  system: 'Papan Direksi',
  subtitle: 'Dashboard Progres Proyek',
  org: 'PT Pembangunan Property',
  unit: 'Digital Transformation Office',
  /** Waktu acuan tampilan; di sistem nyata diisi oleh API agregat. */
  generatedAt: '2026-09-15T07:42:00+07:00',
  viewer: { name: 'Dewan Direksi', scope: 'Seluruh proyek', rights: 'Lihat, ekspor' },
};

export interface FeedStatus {
  label: string;
  freshness: string;
  state: 'segar' | 'tertunda';
  detail: string;
}

export const feeds: FeedStatus[] = [
  { label: 'ERP', freshness: 'harian 06.00', state: 'segar', detail: 'Keuangan, PM, inventory, procurement' },
  { label: 'Aplikasi inspeksi', freshness: 'waktu nyata', state: 'segar', detail: '14 lokasi terhubung' },
  { label: 'Sensor IoT', freshness: '5 menit', state: 'tertunda', detail: 'Gerbang Talumolo terputus 42 menit' },
  { label: 'Social CRM', freshness: '30 menit', state: 'segar', detail: 'Kanal aduan warga aktif' },
];
