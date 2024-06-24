import { Component, Input } from '@angular/core';

export type Size = "big" | "medium" | "small";

@Component({
  selector: 'social-item-showcase',
  host: {
    "[class]": "size + ' ' + direction",
  },
  templateUrl: './item-showcase.component.html',
  styleUrl: './item-showcase.component.scss'
})
export class ItemShowcaseComponent {
  @Input() image? = "";
  @Input() url? = "";
  @Input() content?: string;
  @Input() description?: string;
  @Input() badge?: string;
  @Input() badgeColor?: string;
  @Input() rounded = true;
  @Input() online = false;
  @Input() size: Size = "small";
  @Input() direction: "row" | "column" = "row";
}
