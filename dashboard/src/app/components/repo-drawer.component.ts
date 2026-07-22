import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Repo } from '../data/repo.model';
import { SURVEYED_AT } from '../data/repos';
import { TreeViewComponent } from './tree-view.component';

@Component({
  selector: 'app-repo-drawer',
  standalone: true,
  imports: [CommonModule, TreeViewComponent],
  template: `
    <div class="backdrop" [class.on]="!!repo" (click)="close.emit()"></div>

    <aside class="drawer" [class.on]="!!repo" role="dialog" aria-modal="true">
      @if (repo; as r) {
        <div class="scroll">
          <button class="x" (click)="close.emit()" aria-label="close">✕</button>

          <header>
            <div class="hd">
              <h2 [class.hero]="r.hero">{{ r.name }}</h2>
              <span class="verdict" [class]="r.enforcement">{{ r.enforcement }}</span>
            </div>
            <p class="tag">{{ r.tagline }}</p>
            <div class="facts mono">
              <span>{{ r.language }}</span>
              @if (r.license) { <span>{{ r.license }}</span> }
              <span>{{ r.stars === null ? 'not published' : fmt(r.stars) + ' ★' }}</span>
              @if (r.fileCount !== null) {
                <span>{{ fmt(r.fileCount) }} files in repo</span>
              }
              @if (r.url) {
                <a [href]="r.url" target="_blank" rel="noopener">{{ short(r.url) }} ↗</a>
              }
              <span class="asof">surveyed {{ surveyedAt }}</span>
            </div>
          </header>

          <section>
            <p class="eyebrow">the angle</p>
            <p class="angle">{{ r.angle }}</p>
            @if (r.quote) {
              <blockquote>
                <p>{{ r.quote.text }}</p>
                <cite class="mono">{{ r.quote.source }}</cite>
              </blockquote>
            }
          </section>

          <section class="stats">
            <div class="card pos">
              <p class="eyebrow">position</p>
              <div class="bar">
                <span class="lbl mono">character</span>
                <div class="track"><i [style.left.%]="r.x * 100"></i></div>
                <span class="lbl mono">the user</span>
              </div>
              <div class="bar">
                <span class="lbl mono">self-policed</span>
                <div class="track"><i [style.left.%]="r.y * 100"></i></div>
                <span class="lbl mono">enforced</span>
              </div>
              <p class="vn">{{ r.enforcementNote }}</p>
            </div>

            <div class="card ratio">
              <p class="eyebrow">who can write it</p>
              <div class="big mono">
                <b>{{ r.writeAccess }}</b>
              </div>
              <p class="vn">{{ r.writeNote }}</p>
            </div>
          </section>

          <section>
            <p class="eyebrow">where identity lives</p>
            <div class="card treecard">
              <app-tree-view [nodes]="r.tree" [linkBase]="linkBase(r)" />
            </div>
          </section>

          <section>
            <p class="eyebrow">what surprised me</p>
            <ul class="notes">
              @for (n of r.notes; track n) {
                <li>{{ n }}</li>
              }
            </ul>
          </section>

          <nav class="pager">
            @if (prev) {
              <button (click)="go.emit(prev!.slug)">← {{ prev.name }}</button>
            } @else { <span></span> }
            @if (next) {
              <button (click)="go.emit(next!.slug)">{{ next.name }} →</button>
            }
          </nav>
        </div>
      }
    </aside>
  `,
  styles: [
    `
      .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(4, 6, 9, 0.62);
        backdrop-filter: blur(2px);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.22s ease;
        z-index: 40;
      }
      .backdrop.on {
        opacity: 1;
        pointer-events: auto;
      }
      .drawer {
        position: fixed;
        top: 0;
        right: 0;
        height: 100dvh;
        width: min(560px, 94vw);
        background: var(--panel);
        border-left: 1px solid var(--line2);
        box-shadow: -24px 0 60px rgba(0, 0, 0, 0.55);
        transform: translateX(100%);
        transition: transform 0.28s cubic-bezier(0.22, 0.8, 0.3, 1);
        z-index: 41;
      }
      .drawer.on {
        transform: translateX(0);
      }
      .scroll {
        height: 100%;
        overflow-y: auto;
        overscroll-behavior: contain;
        padding: 26px clamp(18px, 3.4vw, 30px) 48px;
        scrollbar-width: thin;
        scrollbar-color: var(--line2) transparent;
      }
      .scroll::-webkit-scrollbar {
        width: 7px;
      }
      .scroll::-webkit-scrollbar-track {
        background: transparent;
      }
      .scroll::-webkit-scrollbar-thumb {
        background: var(--line2);
        border-radius: 4px;
      }
      .x {
        position: sticky;
        top: 0;
        float: right;
        margin: -6px -6px 0 0;
        background: none;
        border: none;
        color: var(--faint);
        font-size: 15px;
        cursor: pointer;
        padding: 4px 6px;
        line-height: 1;
      }
      .x:hover {
        color: var(--ink);
      }

      header {
        border-bottom: 1px solid var(--line);
        padding-bottom: 18px;
        margin-bottom: 24px;
      }
      .hd {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }
      h2 {
        font-size: 22px;
        margin: 0;
        font-weight: 600;
      }
      h2.hero {
        color: var(--hero);
      }
      .verdict {
        font-family: var(--mono);
        font-size: 9.5px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 3px 8px;
        border-radius: 999px;
        border: 1px solid var(--line2);
        color: var(--faint);
      }
      .verdict.enforced {
        color: var(--heroInk);
        border-color: var(--heroDim);
      }
      .asof {
        color: var(--faint);
        opacity: 0.75;
      }
      .tag {
        color: var(--mut);
        font-size: 13px;
        margin: 9px 0 12px;
      }
      .facts {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
        font-size: 11px;
        color: var(--faint);
      }
      .facts a {
        color: var(--mut);
        text-decoration: none;
      }
      .facts a:hover {
        color: var(--hero);
      }

      section {
        margin-bottom: 30px;
      }
      .angle {
        font-size: 13.5px;
        line-height: 1.75;
        margin: 9px 0 0;
      }
      blockquote {
        margin: 18px 0 0;
        padding: 12px 16px;
        border-left: 2px solid var(--heroDim);
        background: rgba(143, 217, 74, 0.04);
        border-radius: 0 8px 8px 0;
      }
      blockquote p {
        margin: 0 0 7px;
        font-size: 12.5px;
        line-height: 1.65;
      }
      cite {
        font-style: normal;
        font-size: 10.5px;
        color: var(--faint);
      }

      .stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      @media (max-width: 520px) {
        .stats {
          grid-template-columns: 1fr;
        }
      }
      .pos,
      .ratio {
        padding: 13px 15px 15px;
      }
      .bar {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 13px;
      }
      .lbl {
        font-size: 9.5px;
        color: var(--faint);
        white-space: nowrap;
      }
      .track {
        position: relative;
        flex: 1;
        height: 3px;
        background: var(--line);
        border-radius: 2px;
      }
      .track i {
        position: absolute;
        top: 50%;
        width: 9px;
        height: 9px;
        margin: -4.5px 0 0 -4.5px;
        border-radius: 50%;
        background: var(--hero);
        box-shadow: 0 0 8px rgba(143, 217, 74, 0.5);
        transition: left 0.3s ease;
      }
      .vn {
        font-size: 11px;
        color: var(--faint);
        line-height: 1.6;
        margin: 13px 0 0;
      }
      .big {
        display: flex;
        align-items: baseline;
        gap: 6px;
        margin-top: 9px;
      }
      .big b {
        font-size: 28px;
        color: var(--hero);
        font-weight: 600;
        line-height: 1;
      }
      .big span {
        font-size: 12px;
        color: var(--faint);
      }

      .treecard {
        padding: 16px 18px;
        margin-top: 9px;
        overflow-x: auto;
      }
      .notes {
        margin: 9px 0 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 9px;
      }
      .notes li {
        font-size: 12.5px;
        line-height: 1.7;
        color: var(--mut);
        padding-left: 15px;
        position: relative;
      }
      .notes li::before {
        content: '·';
        position: absolute;
        left: 3px;
        color: var(--heroDim);
        font-weight: 700;
      }

      .pager {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        border-top: 1px solid var(--line);
        padding-top: 16px;
      }
      .pager button {
        background: none;
        border: none;
        color: var(--mut);
        font-size: 12px;
        font-family: inherit;
        cursor: pointer;
        padding: 4px 0;
      }
      .pager button:hover {
        color: var(--hero);
      }
    `,
  ],
})
export class RepoDrawerComponent {
  @Input() repo: Repo | null = null;
  @Input() prev: Repo | null = null;
  @Input() next: Repo | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() go = new EventEmitter<string>();

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.repo) this.close.emit();
  }

  surveyedAt = SURVEYED_AT;

  fmt(n: number) {
    return n.toLocaleString('en-US');
  }
  short(url: string) {
    return url.replace('https://github.com/', '');
  }
  linkBase(r: Repo): string | null {
    return r.url && r.branch ? `${r.url}/blob/${r.branch}/` : null;
  }
}
