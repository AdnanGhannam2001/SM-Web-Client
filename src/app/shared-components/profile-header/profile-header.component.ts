import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IProfile, InformationVisibility } from '../../interfaces/profile.interface';

@Component({
  selector: 'social-profile-header[profile]',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {
  @Input() profile!: IProfile;
  @Input() editable = false;
  @Input() online = false;

  items: MenuItem[] = [];

  ngOnInit() {
    if (this.editable) {
      this.items = [
        {
          label: "Change Profile Image",
          icon: "pi pi-camera",
          routerLink: "/settings/profile-img"
        },
        {
          label: "Change Cover Image",
          icon: "pi pi-image",
          routerLink: "/settings/cover-img"
        },
        {
          label: "Go to Settings",
          icon: "pi pi-user-edit",
          routerLink: "/settings"
        }
      ];
    } else {
      this.items = [
        {
          label: "Send Request",
          icon: "pi pi-send",
          command: () => { }
        },
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
      ];
    }
  }

  get links() {
    if (this.profile.settings.socials == InformationVisibility.Private) return [];
    return Object.keys(this.profile.socials);
  }
}
