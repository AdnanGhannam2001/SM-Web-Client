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

  constructor(private readonly profileService: ProfileService) { }

  async ngOnInit() {
    this.profile = await this.profileService.getPersonalProfile();
  }
}