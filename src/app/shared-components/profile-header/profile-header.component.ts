import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IProfileResponse, InformationVisibility } from '../../interfaces/profile.interface';
import { getCoverImage, getProfileImage } from '../../helpers/file-helper';

@Component({
  selector: 'social-profile-header[profile]',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {
  @Input() profile!: IProfileResponse;
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
      // TODO: Fix & Add Commands
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

  image(id: string) { return getProfileImage(id); }
  coverImage(id: string) { return getCoverImage(id); }

  get links() {
    if (!this.profile.socials) return [];
    return Object.entries(this.profile.socials);
  }

  onUpload() {
    window.location.reload();
  }
}
