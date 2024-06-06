import { Component, Input } from '@angular/core';

export interface TabMenuItem {
  icon?: string;
  url?: string;
  text: string;
  badge?: string;
};

@Component({
  selector: 'social-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent {
  @Input() items: TabMenuItem[] = [];
}
