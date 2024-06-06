import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IProfile } from '../../interfaces/profile.interface';

@Component({
  selector: 'social-profile-grid-view',
  templateUrl: './profile-grid-view.component.html',
  styleUrl: './profile-grid-view.component.scss'
})
export class ProfileGridViewComponent {
  @Input() profile!: IProfile;

  items: MenuItem[] = [
    {
      label: "Block",
      icon: "pi pi-flag",
      command: () => { }
    },
    {
      label: "Report",
      icon: "pi pi-exclamation-circle",
      command: () => { }
    }
  ]
}
