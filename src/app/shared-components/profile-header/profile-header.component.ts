import { Component, Input } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { IProfileResponse, InformationVisibility } from '../../interfaces/profile.interface';
import { getCoverImage, getProfileImage } from '../../helpers/file-helper';
import { Router } from '@angular/router';
import { ProfileBaseComponent } from '../../bases/profile-base-component';
import { ProfileService } from '../../services/profile.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'social-profile-header[profile]',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent extends ProfileBaseComponent {
  @Input() online = false;

  constructor(private readonly router: Router,
    messageService: MessageService,
    profileService: ProfileService,
    groupService: GroupService
  ) { super(messageService, profileService, groupService); }

  image(id: string) { return getProfileImage(id); }
  coverImage(id: string) { return getCoverImage(id); }

  get links() {
    if (!this.profile.socials) return [];
    return Object.entries(this.profile.socials);
  }

  async reload() {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    await this.router.navigate([this.router.url]);
  }

  async onUpload() {
    console.log("reloading...");
    await this.reload();
  }

  async deleteImage() {
    await this.profileService.removeImage();
    await this.reload();
  }

  async deleteCoverImage() {
    await this.profileService.removeCoverImage();
    await this.reload();
  }
}
