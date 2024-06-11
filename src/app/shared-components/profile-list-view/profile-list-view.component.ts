import { Component, Input } from '@angular/core';
import { IProfile } from '../../interfaces/profile.interface';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'social-profile-list-view[profile]',
  templateUrl: './profile-list-view.component.html',
  styleUrl: './profile-list-view.component.scss'
})
export class ProfileListViewComponent {
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
