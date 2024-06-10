import { Component } from '@angular/core';
import { IProfileResponse } from '../../../interfaces/profile.interface';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'social-privacy',
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {
  profile?: IProfileResponse;
  visibilities;

  constructor(private readonly profileService: ProfileService) {
    this.visibilities = profileService.getVisibilities().map(([key, value]) => ({ name: value, code: Number(key) }));
  }

  async ngOnInit() {
    this.profile = await this.profileService.getPersonalProfile();
  }

  onUpdate() {
    this.profileService.updateSettings(this.profile!.settings);
  }
}
