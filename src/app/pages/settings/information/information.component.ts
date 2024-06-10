import { Component } from '@angular/core';
import { Gender, IProfileResponse } from '../../../interfaces/profile.interface';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'social-information',
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {
  profile?: IProfileResponse;
  visibilities;
  genders;

  constructor(private readonly profileService: ProfileService) {
    this.visibilities = profileService.getVisibilities();
    this.genders = profileService.getGenders().map(([key, value]) => ({ name: value, code: Number(key) }));
  }

  async ngOnInit() {
    this.profile = await this.profileService.getPersonalProfile();
  }

  async onUpdate() {
    try {
      await this.profileService.updateProfile({
        firstName: this.profile?.firstName,
        lastName: this.profile?.lastName,
        dateOfBirth: this.profile?.dateOfBirth,
        gender: this.profile?.gender,
        phoneNumber: this.profile?.phoneNumber?.value,
        bio: this.profile?.bio,
        jobInformations: this.profile?.jobInformations,
        socials: this.profile?.socials,
      });
    } catch (error) {
      // TODO display validation errors
      console.warn(error)
    }
  }
}
