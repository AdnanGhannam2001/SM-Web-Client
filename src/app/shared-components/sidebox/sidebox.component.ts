import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'social-sidebox',
  templateUrl: './sidebox.component.html',
  styleUrl: './sidebox.component.scss',
})
export class SideboxComponent {
  @Input() title = '';
  @Input() count = 0;
  @Input() showButton = false;
  @Input() seeMoreUrl = '';

  @HostBinding('attr.title') get getTitle() {
    return '';
  }
}
