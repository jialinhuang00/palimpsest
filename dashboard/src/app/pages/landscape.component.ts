import { Component, HostListener, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { REPOS, SURVEYED_AT, TREND } from '../data/repos';
import { ENF_DEF, Enforcement, ModelsWho, Repo, WA_GLYPH, WHO_DEF } from '../data/repo.model';
import { RepoDrawerComponent } from '../components/repo-drawer.component';
import { TreeViewComponent } from '../components/tree-view.component';

@Component({
  selector: 'app-landscape',
  standalone: true,
  imports: [CommonModule, RepoDrawerComponent, TreeViewComponent],
  template: `
    <div class="shell">
      <header class="topbar">
        <div>
          <p class="eyebrow">palimpsest · landscape</p>
          <h1 [class.small]="page() > 0">Whose self? Expressed, or governed?</h1>
        </div>
        <nav class="dots">
          @for (p of pages; track p.i) {
            <button
              [class.on]="page() === p.i"
              (click)="goto(p.i)"
              [attr.aria-label]="p.label">
              <span class="lb mono">{{ p.label }}</span>
            </button>
          }
        </nav>
      </header>

      <div class="stage" [attr.data-page]="page()">
        <section class="chartpane">
          <div class="chartbox">
            <div class="matrix" role="group" aria-label="agent-self landscape: who is modeled × enforcement">
              <div class="ycol">
                @for (enf of enfRows; track enf) {
                  <div class="ylab mono deflab" [attr.data-def]="enfDef[enf]">{{ enf }}</div>
                }
              </div>
              <div class="cellgrid">
                @for (enf of enfRows; track enf) {
                  @for (who of whoCols; track who) {
                    <div class="cell" [class.herocell]="who === 'user' && enf === 'enforced'">
                      @for (r of cell(who, enf); track r.slug) {
                        <button class="chip"
                          [class.hero]="r.hero"
                          [class.dim]="dimmed(r.slug)"
                          [class.on]="focus() === r.slug"
                          (pointerenter)="hover(r.slug, $event)"
                          (pointermove)="hover(r.slug, $event)"
                          (pointerleave)="unhover()"
                          (click)="open(r.slug)">
                          <span class="cdot"></span>{{ r.name }}
                          <span class="wa">{{ waGlyph[r.writeAccess] }}</span>
                        </button>
                      }
                      @if (who === 'user' && enf === 'enforced') {
                        <span class="cellnote mono">my own agent, governed</span>
                      }
                    </div>
                  }
                }
              </div>
              <div class="corner"></div>
              <div class="xrow">
                @for (who of whoCols; track who) {
                  <div class="xlab mono deflab" [attr.data-def]="whoDef[who]">{{ who }}</div>
                }
              </div>
              <div class="corner"></div>
              <div class="xends mono">
                <span>← a separate other</span>
                <span>an extension of me →</span>
              </div>
              <div class="corner"></div>
              <div class="legendrow mono">
                <span>writes: <b>A</b> agent-self · <b>U</b> user, open · <b>G</b> user, gated · <b>L</b> locked</span>
                <span class="asof">surveyed {{ surveyedAt }}</span>
              </div>
            </div>
          </div>

          @if (page() === 0) {
            <div class="intro">
              <p class="sub">
                Is the agent <b>a separate other</b>, or <b>an extension of you</b>; do the files exist to
                <b>express a personality</b>, or to <b>hold it honest</b>. Exactly one repo sits in the
                enforced × extension-of-me cell.
                <span class="note mono">Click any repo for detail.</span>
              </p>
            </div>
          }
        </section>

        <section class="contentpane">
          @if (page() === 1) {
            <article class="pane essay">
              <p class="lead">{{ trend.headline }}</p>

              @for (m of trend.movements; track m.title) {
                <h3>{{ m.title }}</h3>
                <p>{{ m.body }}</p>
              }

              <hr />

              @for (c of trend.closing; track c) {
                <p>{{ c }}</p>
              }
            </article>
          }

          @if (page() === 2) {
            <div class="pane">
              <p class="paneEyebrow eyebrow">{{ repos.length }} repos · click a row for detail</p>
              <ul class="rows">
                @for (r of repos; track r.slug) {
                  <li>
                    <button class="row"
                      [class.hero]="r.hero"
                      [class.on]="focus() === r.slug"
                      (pointerenter)="hovered.set(r.slug)"
                      (pointerleave)="hovered.set(null)"
                      (click)="open(r.slug)">
                      <span class="rname">{{ r.name }}</span>
                      <span class="rchip">{{ r.chip }}</span>
                      <span class="rmeta mono">
                        <span class="v" [class]="r.enforcement">{{ r.enforcement }}</span>
                        <span class="d">{{ r.identityFileCount }} identity files</span>
                      </span>
                    </button>
                  </li>
                }
              </ul>
            </div>
          }
        </section>
      </div>

      <button class="arrow prev" (click)="prevPage()" [disabled]="page() === 0" aria-label="previous">←</button>
      <button class="arrow next" (click)="nextPage()" [disabled]="page() === 2" aria-label="next">→</button>
    </div>

    @if (peek(); as r) {
      <div class="tip" [style.left.px]="tip()!.x" [style.top.px]="tip()!.y">
        <div class="tiphd">
          <b [class.hero]="r.hero">{{ r.name }}</b>
          <span class="tipd mono">{{ r.identityFileCount }} identity files</span>
        </div>
        <p class="tipsub">{{ r.chip }}</p>
        <app-tree-view [nodes]="r.tree" [compact]="true" />
      </div>
    }

    <app-repo-drawer
      [repo]="selected()"
      [prev]="prevRepo()"
      [next]="nextRepo()"
      (close)="selected.set(null)"
      (go)="open($event)" />
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .shell {
        position: relative;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        padding: clamp(14px, 2vmin, 22px) clamp(44px, 4vw, 60px) clamp(12px, 1.6vmin, 18px);
        overflow: hidden;
      }

      .topbar {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 20px;
        flex: none;
        margin-bottom: clamp(4px, 1vmin, 10px);
      }
      h1 {
        font-size: clamp(19px, 2.9vmin, 26px);
        margin: 5px 0 0;
        font-weight: 600;
        transition: font-size 0.4s ease;
      }
      h1.small {
        font-size: clamp(15px, 2vmin, 18px);
      }
      .dots {
        display: flex;
        gap: 6px;
        flex: none;
        padding-top: 8px;
      }
      .dots button {
        background: none;
        border: 1px solid var(--line);
        border-radius: 999px;
        padding: 4px 11px;
        cursor: pointer;
        color: var(--faint);
        transition: all 0.18s;
      }
      .dots button:hover {
        border-color: var(--line2);
        color: var(--mut);
      }
      .dots button.on {
        border-color: var(--heroDim);
        color: var(--hero);
        background: rgba(143, 217, 74, 0.06);
      }
      .lb {
        font-size: 10px;
        letter-spacing: 0.07em;
        text-transform: uppercase;
      }

      .stage {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: 1fr 0fr;
        column-gap: 0;
        align-items: stretch;
        transition: grid-template-columns 0.55s cubic-bezier(0.22, 0.8, 0.3, 1),
          column-gap 0.55s cubic-bezier(0.22, 0.8, 0.3, 1);
      }
      .stage[data-page='1'],
      .stage[data-page='2'] {
        grid-template-columns: 0.82fr 1.18fr;
        column-gap: clamp(20px, 3vw, 44px);
      }

      .chartpane {
        min-width: 0;
        min-height: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      /* the chart claims every pixel the pane isn't using */
      .chartbox {
        flex: 1;
        min-height: 0;
        display: flex;
        align-items: stretch;
      }
      .intro {
        flex: none;
        animation: fade 0.45s ease both;
      }
      .sub {
        color: var(--mut);
        font-size: 12.5px;
        line-height: 1.7;
        max-width: 86ch;
        margin: 0;
      }
      .sub b {
        color: var(--ink);
        font-weight: 600;
      }
      .note {
        color: var(--faint);
        font-size: 11px;
        margin-left: 10px;
      }

      .contentpane {
        min-width: 0;
        height: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
      }
      .pane {
        width: 100%;
        max-height: 100%;
        overflow-y: auto;
        overscroll-behavior: contain;
        padding-right: 14px;
        scrollbar-width: thin;
        scrollbar-color: var(--line2) transparent;
        animation: slidein 0.5s cubic-bezier(0.22, 0.8, 0.3, 1) both;
      }
      .pane::-webkit-scrollbar {
        width: 7px;
      }
      .pane::-webkit-scrollbar-track {
        background: transparent;
      }
      .pane::-webkit-scrollbar-thumb {
        background: var(--line2);
        border-radius: 4px;
      }
      .pane::-webkit-scrollbar-thumb:hover {
        background: #3b4759;
      }

      @keyframes slidein {
        from {
          opacity: 0;
          transform: translateX(22px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      /* ── page 2: trend, as prose ─────────────── */
      /* centred in its column — a left-hugged measure leaves dead space on the right */
      .essay {
        max-width: 68ch;
        margin-inline: auto;
      }
      .essay .lead {
        font-size: 15.5px;
        line-height: 1.8;
        color: var(--ink);
        margin: 0 0 26px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--line);
      }
      .essay h3 {
        font-size: 12px;
        font-family: var(--mono);
        font-weight: 500;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--heroDim);
        margin: 22px 0 7px;
      }
      .essay h3:first-of-type {
        margin-top: 0;
      }
      .essay p {
        margin: 0;
        font-size: 13.5px;
        line-height: 1.85;
        color: var(--mut);
      }
      .essay p + p {
        margin-top: 14px;
      }
      .essay hr {
        border: none;
        border-top: 1px solid var(--line);
        margin: 26px 0 20px;
      }

      /* ── page 3: repo rows ───────────────────── */
      .paneEyebrow {
        margin: 0 0 10px;
      }
      .rows {
        list-style: none;
        margin: 0;
        padding: 0;
        border: 1px solid var(--line);
        border-radius: var(--r);
        overflow: hidden;
      }
      .rows li + li .row {
        border-top: 1px solid var(--line);
      }
      .row {
        width: 100%;
        max-width: 100%;
        display: flex;
        align-items: center;
        gap: 14px;
        overflow: hidden;
        background: var(--panel);
        border: none;
        padding: 10px 15px;
        font: inherit;
        color: inherit;
        text-align: left;
        cursor: pointer;
        transition: background 0.14s;
      }
      .row:hover,
      .row.on {
        background: var(--panel2);
      }
      .rname {
        flex: 0 0 auto;
        font-size: 13px;
        font-weight: 600;
        white-space: nowrap;
      }
      .row.hero .rname {
        color: var(--hero);
      }
      /* takes the slack and truncates instead of pushing the row wide */
      .rchip {
        flex: 1 1 auto;
        min-width: 0;
        font-size: 11.5px;
        color: var(--faint);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .rmeta {
        flex: 0 0 auto;
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 10px;
        white-space: nowrap;
      }
      .rmeta .v {
        text-transform: uppercase;
        letter-spacing: 0.07em;
        color: var(--faint);
        border: 1px solid var(--line2);
        border-radius: 999px;
        padding: 2px 7px;
      }
      .rmeta .v.enforced {
        color: var(--heroInk);
        border-color: var(--heroDim);
      }
      .rmeta .d {
        color: var(--heroDim);
        min-width: 62px;
        text-align: right;
      }

      /* ── matrix ──────────────────────────────── */
      .matrix {
        flex: 1;
        min-height: 0;
        width: 100%;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: 1fr auto auto auto;
        column-gap: 12px;
        row-gap: 7px;
      }
      .ycol {
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        align-items: center;
      }
      .ylab,
      .xlab {
        font-size: 11px;
        color: var(--mut);
        letter-spacing: 0.05em;
      }
      .ylab {
        text-align: right;
      }
      .xrow {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }
      .xlab {
        text-align: center;
      }
      .xends {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: var(--faint);
        letter-spacing: 0.04em;
      }
      .legendrow {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
        font-size: 10px;
        color: var(--faint);
        letter-spacing: 0.04em;
      }
      .legendrow b {
        color: var(--mut);
        font-weight: 600;
      }
      .legendrow .asof {
        opacity: 0.75;
      }

      /* hoverable axis labels reveal the tier definition */
      .deflab {
        position: relative;
        cursor: help;
        text-decoration: underline dotted var(--line2);
        text-underline-offset: 3px;
      }
      .deflab::after {
        content: attr(data-def);
        position: absolute;
        z-index: 20;
        width: 250px;
        background: #0d121a;
        border: 1px solid var(--line2);
        border-radius: 8px;
        padding: 8px 11px;
        font-size: 10.5px;
        line-height: 1.55;
        color: var(--mut);
        text-align: left;
        white-space: normal;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.12s;
      }
      .deflab:hover::after {
        opacity: 1;
      }
      .ylab.deflab::after {
        left: calc(100% + 10px);
        top: 50%;
        transform: translateY(-50%);
      }
      .xlab.deflab::after {
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
      }
      .cellgrid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 1px;
        background: var(--line);
        border: 1px solid var(--line);
        border-radius: var(--r);
        overflow: hidden;
      }
      .cell {
        position: relative;
        min-height: 0;
        background: var(--bg);
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-content: center;
        align-items: center;
        justify-content: center;
        padding: 14px;
      }
      .cell.herocell {
        background: rgba(143, 217, 74, 0.05);
      }
      .cellnote {
        position: absolute;
        right: 12px;
        bottom: 10px;
        font-size: 10.5px;
        color: var(--hero);
        letter-spacing: 0.04em;
        pointer-events: none;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        background: var(--panel);
        border: 1px solid var(--line2);
        border-radius: 999px;
        padding: 6px 12px;
        font: inherit;
        font-size: 12px;
        color: var(--ink);
        cursor: pointer;
        transition: border-color 0.15s, background 0.15s, opacity 0.15s;
      }
      .chip .cdot {
        flex: none;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #cdd8e6;
      }
      .chip:hover {
        background: var(--panel2);
        border-color: #3b4759;
      }
      .chip.hero {
        color: var(--hero);
        border-color: var(--heroDim);
        font-weight: 600;
      }
      .chip.hero .cdot {
        width: 9px;
        height: 9px;
        background: var(--hero);
        box-shadow: 0 0 6px rgba(143, 217, 74, 0.65);
      }
      .chip .wa {
        font-family: var(--mono);
        font-size: 9px;
        color: var(--faint);
        border-left: 1px solid var(--line2);
        padding-left: 6px;
        letter-spacing: 0.05em;
      }
      .chip.hero .wa {
        color: var(--heroDim);
        border-left-color: var(--heroDim);
      }
      .chip.dim {
        opacity: 0.26;
      }
      .chip.on {
        color: var(--hero);
        border-color: var(--hero);
        background: rgba(143, 217, 74, 0.06);
      }

      /* ── hover popover ───────────────────────── */
      .tip {
        position: fixed;
        z-index: 30;
        width: 380px;
        max-height: 320px;
        overflow: hidden;
        pointer-events: none;
        background: #0d121a;
        border: 1px solid var(--line2);
        border-radius: 10px;
        padding: 12px 14px 14px;
        box-shadow: 0 18px 44px rgba(0, 0, 0, 0.62);
        animation: pop 0.13s ease both;
      }
      @keyframes pop {
        from {
          opacity: 0;
          transform: translateY(4px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      .tiphd {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
      }
      .tiphd b {
        font-size: 13px;
        font-weight: 600;
      }
      .tiphd b.hero {
        color: var(--hero);
      }
      .tipd {
        font-size: 10px;
        color: var(--heroDim);
        flex: none;
      }
      .tipsub {
        margin: 3px 0 10px;
        font-size: 11px;
        color: var(--faint);
        padding-bottom: 9px;
        border-bottom: 1px solid var(--line);
      }
      /* the tree can outrun the box; fade the cut instead of clipping hard */
      .tip::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 34px;
        background: linear-gradient(to bottom, transparent, #0d121a);
      }

      /* ── arrows ──────────────────────────────── */
      .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: 1px solid var(--line);
        background: var(--panel);
        color: var(--mut);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.16s;
        z-index: 5;
      }
      .arrow:hover:not(:disabled) {
        border-color: var(--hero);
        color: var(--hero);
      }
      .arrow:disabled {
        opacity: 0.18;
        cursor: default;
      }
      .arrow.prev {
        left: clamp(6px, 1.2vw, 18px);
      }
      .arrow.next {
        right: clamp(6px, 1.2vw, 18px);
      }

      @media (max-width: 860px) {
        .shell {
          height: auto;
          overflow: visible;
          padding: 20px 16px 60px;
        }
        .stage,
        .stage[data-page='1'],
        .stage[data-page='2'] {
          grid-template-columns: 1fr;
          row-gap: 26px;
        }
        .pane {
          max-height: none;
          overflow: visible;
        }
        .chartpane {
          height: auto;
        }
        .chartbox {
          display: block;
        }
        .cell {
          min-height: 88px;
        }
        .arrow {
          position: static;
          transform: none;
        }
      }
    `,
  ],
})
export class LandscapeComponent {
  repos: Repo[] = REPOS;
  trend = TREND;

  /* enforced on top so "governed" reads as the destination, matching the title */
  whoCols: ModelsWho[] = ['character', 'mixed', 'user'];
  enfRows: Enforcement[] = ['enforced', 'declared', 'none'];
  whoDef = WHO_DEF;
  enfDef = ENF_DEF;
  waGlyph = WA_GLYPH;
  surveyedAt = SURVEYED_AT;

  cell(who: ModelsWho, enf: Enforcement): Repo[] {
    return this.repos.filter((r) => r.modelsWho === who && r.enforcement === enf);
  }

  pages = [
    { i: 0, label: 'map' },
    { i: 1, label: 'trend' },
    { i: 2, label: 'repos' },
  ];

  page = signal(0);
  hovered = signal<string | null>(null);
  selected = signal<Repo | null>(null);
  tip = signal<{ x: number; y: number } | null>(null);

  /** the hover popover: map page only, and never while the drawer owns the screen */
  peek = computed(() => {
    if (this.page() !== 0 || this.selected() || !this.tip()) return null;
    const s = this.hovered();
    return s ? (REPOS.find((r) => r.slug === s) ?? null) : null;
  });

  private static readonly TIP_W = 400;
  private static readonly TIP_H = 340;

  hover(slug: string, e: PointerEvent) {
    this.hovered.set(slug);
    // clamp so the popover never runs off the viewport
    this.tip.set({
      x: Math.min(e.clientX + 18, window.innerWidth - LandscapeComponent.TIP_W),
      y: Math.min(e.clientY + 16, window.innerHeight - LandscapeComponent.TIP_H),
    });
  }

  unhover() {
    this.hovered.set(null);
    this.tip.set(null);
  }

  /** the open drawer wins over hover for highlighting */
  focus = computed(() => this.selected()?.slug ?? this.hovered());

  private index = computed(() => {
    const s = this.selected();
    return s ? REPOS.findIndex((r) => r.slug === s.slug) : -1;
  });
  prevRepo = computed(() => (this.index() > 0 ? REPOS[this.index() - 1] : null));
  nextRepo = computed(() => {
    const i = this.index();
    return i >= 0 && i < REPOS.length - 1 ? REPOS[i + 1] : null;
  });

  goto(i: number) {
    this.page.set(i);
  }
  nextPage() {
    this.page.update((p) => Math.min(2, p + 1));
  }
  prevPage() {
    this.page.update((p) => Math.max(0, p - 1));
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (this.selected()) return; // drawer owns the keyboard while open
    if (e.key === 'ArrowRight') this.nextPage();
    if (e.key === 'ArrowLeft') this.prevPage();
  }

  open(slug: string) {
    this.selected.set(REPOS.find((r) => r.slug === slug) ?? null);
  }

  dimmed(slug: string): boolean {
    const f = this.focus();
    return !!f && f !== slug;
  }

  fmt(n: number) {
    return n.toLocaleString('en-US');
  }
}
