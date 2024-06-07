import { Component, Input } from '@angular/core';

@Component({
  selector: 'social-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  @Input() icon?: string;
  @Input() label: string = "";
  @Input() url?: string;
  @Input() badge?: string;
}
