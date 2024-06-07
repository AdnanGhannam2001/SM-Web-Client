import { Component } from '@angular/core';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor (private readonly sidebarService: SidebarService) { }

  get sidebarOpened() { return this.sidebarService.opened; };
  set sidebarOpened(state: boolean) { this.sidebarService.opened = state; };
}
