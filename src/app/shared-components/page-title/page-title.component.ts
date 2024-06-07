import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'social-page-title',
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {
  @Input() title!: string;

  @HostBinding("attr.title") get getTitle() { return ""; }
}
