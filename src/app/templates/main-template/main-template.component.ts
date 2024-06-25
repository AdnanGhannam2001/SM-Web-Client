import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'social-main-template',
  templateUrl: './main-template.component.html',
  styleUrl: './main-template.component.scss'
})
export class MainTemplateComponent {
  constructor (private readonly sidebarService: SidebarService) { }

  get sidebarOpened() { return this.sidebarService.opened; };
  set sidebarOpened(state: boolean) { this.sidebarService.opened = state; };
}
