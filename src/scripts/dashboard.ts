/**
 * Perilaku antarmuka Papan Direksi.
 *
 * Tiga hal saja: penyaring global, panel rincian proyek, dan keterangan
 * angka saat penunjuk diarahkan ke sebuah tanda grafik. Tidak ada
 * perhitungan KPI di sini — seluruh angka datang sudah jadi dari server.
 */

type Rag = 'merah' | 'kuning' | 'hijau';

interface ClientProject {
  id: string;
  short: string;
  category: string;
  rag: Rag;
  value: number;
  risk: number;
}

const idFmt = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 });
const fmt2 = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt1 = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const rupiahMiliar = (m: number) =>
  Math.abs(m) >= 1000 ? `Rp ${fmt2.format(m / 1000)} T` : `Rp ${idFmt.format(m)} M`;

/* ------------------------------------------------------------------ data */

const dataEl = document.querySelector<HTMLScriptElement>('[data-projects-json]');
const allProjects: ClientProject[] = dataEl ? JSON.parse(dataEl.textContent ?? '[]') : [];

const matches = (p: ClientProject, filter: string) => {
  if (filter === 'semua') return true;
  if (filter === 'perhatian') return p.rag !== 'hijau';
  return p.category === filter;
};

/* -------------------------------------------------------- penyaring global */

const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'));
const scopeEl = document.querySelector<HTMLElement>('[data-filter-scope]');
const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-project-card]'));
const emptyEl = document.querySelector<HTMLElement>('[data-empty]');
const rows = Array.from(document.querySelectorAll<HTMLElement>('[data-project-row]'));
const matrixCells = Array.from(document.querySelectorAll<HTMLElement>('[data-col]'));
const aggregateNotes = Array.from(document.querySelectorAll<HTMLElement>('[data-aggregate-note]'));
const riskItems = Array.from(document.querySelectorAll<HTMLElement>('[data-risk-item]'));

const scopeText = (filter: string, n: number) => {
  if (filter === 'semua') return 'Menampilkan seluruh portofolio';
  if (filter === 'perhatian') return `Menampilkan ${n} proyek yang perlu perhatian`;
  return `Menampilkan ${n} proyek kategori ${filter}`;
};

function updateSummary(visible: ClientProject[]) {
  const counts: Record<Rag, number> = { merah: 0, kuning: 0, hijau: 0 };
  for (const p of visible) counts[p.rag] += 1;

  const total = visible.reduce((s, p) => s + p.value, 0);
  const critical = visible.filter((p) => p.rag === 'merah').reduce((s, p) => s + p.value, 0);
  const share = total ? (critical / total) * 100 : 0;

  const set = (key: string, text: string) => {
    const el = document.querySelector<HTMLElement>(`[data-sum="${key}"]`);
    if (el) el.textContent = text;
  };

  set('count', idFmt.format(visible.length));
  set('total', rupiahMiliar(total));
  set('critical', rupiahMiliar(critical));
  set('share', `${fmt1.format(share)}%`);
  (['merah', 'kuning', 'hijau'] as Rag[]).forEach((r) => set(`rag-${r}`, String(counts[r])));

  const shareBar = document.querySelector<HTMLElement>('[data-sum="sharebar"]');
  if (shareBar) shareBar.style.width = `${share}%`;

  const stack = document.querySelector<HTMLElement>('[data-sum="stackbar"]');
  if (stack) {
    (['merah', 'kuning', 'hijau'] as Rag[]).forEach((r) => {
      const seg = stack.querySelector<HTMLElement>(`[data-seg="${r}"]`);
      if (!seg) return;
      seg.style.flex = String(counts[r]);
      seg.hidden = counts[r] === 0;
    });
    stack.setAttribute(
      'aria-label',
      `${counts.merah} kritis, ${counts.kuning} waspada, ${counts.hijau} sesuai rencana`,
    );
  }

  // daftar sudah terurut dari skor tertinggi; sisakan lima yang lolos penyaring
  const allowed = new Set(visible.map((p) => p.id));
  let shown = 0;
  for (const item of riskItems) {
    const keep = allowed.has(item.dataset.riskItem ?? '') && shown < 5;
    item.hidden = !keep;
    if (keep) shown += 1;
  }
}

function applyFilter(filter: string) {
  const visible = allProjects.filter((p) => matches(p, filter));
  const allowed = new Set(visible.map((p) => p.id));

  for (const card of cards) card.hidden = !allowed.has(card.dataset.id ?? '');
  for (const row of rows) row.hidden = !allowed.has(row.dataset.projectRow ?? '');
  for (const cell of matrixCells) cell.hidden = !allowed.has(cell.dataset.col ?? '');

  if (emptyEl) emptyEl.hidden = visible.length > 0;
  for (const note of aggregateNotes) note.hidden = filter === 'semua';

  for (const btn of filterButtons) {
    btn.setAttribute('aria-pressed', String(btn.dataset.filter === filter));
  }

  if (scopeEl) scopeEl.textContent = scopeText(filter, visible.length);

  updateSummary(visible);
}

for (const btn of filterButtons) {
  const key = btn.dataset.filter ?? 'semua';
  const countEl = btn.querySelector<HTMLElement>('[data-filter-count]');
  if (countEl) countEl.textContent = String(allProjects.filter((p) => matches(p, key)).length);
  btn.addEventListener('click', () => applyFilter(key));
}

/* --------------------------------------------------- panel rincian proyek */

const drawer = document.querySelector<HTMLDialogElement>('#project-drawer');
const details = Array.from(document.querySelectorAll<HTMLElement>('[data-detail]'));
const scroller = drawer?.querySelector<HTMLElement>('.drawer__content');

function openProject(id: string) {
  if (!drawer) return;
  let found = false;
  for (const d of details) {
    const hit = d.dataset.detail === id;
    d.hidden = !hit;
    found ||= hit;
  }
  if (!found) return;
  if (scroller) scroller.scrollTop = 0;
  if (!drawer.open) drawer.showModal();
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  const opener = target.closest<HTMLElement>('[data-project-open]');
  if (opener) {
    openProject(opener.dataset.projectOpen ?? '');
    return;
  }

  const card = target.closest<HTMLElement>('[data-project-card]');
  if (card) {
    openProject(card.dataset.id ?? '');
    return;
  }

  if (target.closest('[data-drawer-close]')) {
    drawer?.close();
    return;
  }

  // klik di luar isi laci menutup laci
  if (drawer?.open && target === drawer) drawer.close();
});

/* ------------------------------------------------- keterangan angka (tip) */

const tip = document.createElement('div');
tip.className = 'charttip';
tip.setAttribute('role', 'tooltip');
tip.hidden = true;
document.body.append(tip);

function renderTip(raw: string) {
  const [title, ...lines] = raw.split('\n');
  const rows = lines
    .map((l) => {
      const [k, v] = l.split('\t');
      return v === undefined
        ? `<div class="charttip__note">${k}</div>`
        : `<div class="charttip__row"><span>${k}</span><b>${v}</b></div>`;
    })
    .join('');
  tip.innerHTML = `<div class="charttip__title">${title}</div>${rows}`;
}

function placeTip(x: number, y: number) {
  const pad = 14;
  const r = tip.getBoundingClientRect();
  let left = x + pad;
  let top = y + pad;
  if (left + r.width > window.innerWidth - 8) left = x - r.width - pad;
  if (top + r.height > window.innerHeight - 8) top = y - r.height - pad;
  tip.style.left = `${Math.max(8, left)}px`;
  tip.style.top = `${Math.max(8, top)}px`;
}

/** Tanda grafik yang sedang menampilkan keterangan, dan cara ia dipicu. */
let tipAnchor: HTMLElement | null = null;
let tipFromFocus = false;

function showTipFor(el: HTMLElement, x: number, y: number, fromFocus = false) {
  renderTip(el.dataset.tip ?? '');
  tip.hidden = false;
  tipAnchor = el;
  tipFromFocus = fromFocus;
  placeTip(x, y);
}

function hideTip() {
  tip.hidden = true;
  tipAnchor = null;
  tipFromFocus = false;
}

/** Tempelkan kembali keterangan di bawah tanda yang sedang difokuskan. */
function anchorTip() {
  if (!tipAnchor) return;
  const r = tipAnchor.getBoundingClientRect();
  placeTip(r.left + r.width / 2, r.bottom);
}

document.addEventListener('pointerover', (e) => {
  const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-tip]');
  if (!el) return;
  showTipFor(el, e.clientX, e.clientY);
});

document.addEventListener('pointermove', (e) => {
  if (tip.hidden) return;
  const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-tip]');
  if (!el) {
    hideTip();
    return;
  }
  placeTip(e.clientX, e.clientY);
});

document.addEventListener('pointerout', (e) => {
  if (tipFromFocus) return;
  const to = (e as PointerEvent).relatedTarget as HTMLElement | null;
  if (to?.closest('[data-tip]')) return;
  hideTip();
});

// papan tik: tanda grafik yang dapat difokuskan menampilkan keterangan yang sama
document.addEventListener('focusin', (e) => {
  const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-tip]');
  if (!el) {
    hideTip();
    return;
  }
  const r = el.getBoundingClientRect();
  showTipFor(el, r.left + r.width / 2, r.bottom, true);
});

document.addEventListener('focusout', (e) => {
  const to = (e as FocusEvent).relatedTarget as HTMLElement | null;
  if (to?.closest('[data-tip]')) return;
  hideTip();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideTip();
});

// menggulung halaman lewat papan tik tidak boleh menghapus keterangan yang
// sedang dibaca; cukup tempelkan kembali di bawah tandanya
window.addEventListener(
  'scroll',
  () => {
    if (tipFromFocus) anchorTip();
    else if (!tip.hidden) hideTip();
  },
  { passive: true },
);

/* ---------------------------------------------------------------- ekspor */

document.querySelector('[data-export]')?.addEventListener('click', () => window.print());

/* ------------------------------------------------------------ inisialisasi */

applyFilter('semua');
