import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../data/repo.model';

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="tree" [class.root]="depth === 0" [class.compact]="compact">
      @for (node of nodes; track node.name; let last = $last) {
        <li [class.last]="last">
          <span class="row">
            <span class="glyph mono">{{ last ? '└─' : '├─' }}</span>
            @if (href(node); as h) {
              <a class="name mono" [class.id]="node.identity" [href]="h" target="_blank" rel="noopener">{{ node.name }}</a>
            } @else {
              <span class="name mono" [class.dir]="!!node.children" [class.id]="node.identity">
                {{ node.name }}
              </span>
            }
            @if (node.identity) {
              <span class="badge">identity</span>
            }
          </span>
          @if (node.note) {
            <div class="note">{{ node.note }}</div>
          }
          @if (node.children?.length) {
            <app-tree-view [nodes]="node.children!" [depth]="depth + 1" [compact]="compact"
              [linkBase]="linkBase" [pathPrefix]="childPrefix(node)" />
          }
        </li>
      }
    </ul>
  `,
  styles: [
    `
      .tree {
        list-style: none;
        margin: 0;
        padding: 0 0 0 18px;
        border-left: 1px solid var(--line);
      }
      .tree.root {
        padding-left: 0;
        border-left: none;
      }
      li {
        margin: 2px 0;
      }
      .row {
        display: flex;
        align-items: baseline;
        gap: 8px;
        flex-wrap: wrap;
      }
      .glyph {
        color: var(--line2);
        font-size: 12px;
        user-select: none;
      }
      .tree.root > li > .row > .glyph {
        display: none;
      }
      .name {
        font-size: 13px;
        color: var(--mut);
      }
      .name.dir {
        color: var(--ink);
        font-weight: 600;
      }
      .name.id {
        color: var(--hero);
        font-weight: 600;
      }
      a.name {
        text-decoration: none;
      }
      a.name:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
      }
      .badge {
        font-family: var(--mono);
        font-size: 9.5px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--heroDim);
        border: 1px solid var(--heroDim);
        border-radius: 999px;
        padding: 1px 6px;
        line-height: 1.5;
      }
      .note {
        font-size: 12px;
        color: var(--faint);
        margin: 0 0 4px 28px;
        line-height: 1.5;
      }
      .tree.root > li > .note {
        margin-left: 0;
      }

      /* popover variant: same structure, tighter */
      .tree.compact {
        padding-left: 13px;
      }
      .tree.compact.root {
        padding-left: 0;
      }
      .tree.compact .name {
        font-size: 11.5px;
      }
      .tree.compact .note {
        font-size: 10.5px;
        line-height: 1.45;
        margin-left: 24px;
      }
      .tree.compact.root > li > .note {
        margin-left: 0;
      }
      .tree.compact .badge {
        display: none;
      }
    `,
  ],
})
export class TreeViewComponent {
  @Input({ required: true }) nodes!: TreeNode[];
  @Input() depth = 0;
  @Input() compact = false;
  /** e.g. https://github.com/owner/repo/blob/main/ — null disables linking */
  @Input() linkBase: string | null = null;
  @Input() pathPrefix = '';

  /** only single clean paths become links; compound labels ("a, b, c", "x … y") stay text */
  private static readonly CLEAN = /^[A-Za-z0-9._/-]+$/;

  href(node: TreeNode): string | null {
    if (!this.linkBase || node.children?.length) return null;
    const full = this.pathPrefix + node.name;
    // the whole path must be clean (a dirty ancestor label poisons it) and end in a file-looking leaf
    if (!TreeViewComponent.CLEAN.test(full) || full.endsWith('/')) return null;
    if (!full.split('/').pop()!.includes('.')) return null;
    return this.linkBase + full;
  }

  childPrefix(node: TreeNode): string {
    return this.pathPrefix + (node.name.endsWith('/') ? node.name : node.name + '/');
  }
}
