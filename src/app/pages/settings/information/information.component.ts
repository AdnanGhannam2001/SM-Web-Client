import { Component } from '@angular/core';
import { Gender, IProfileResponse } from '../../../interfaces/profile.interface';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'social-information',
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {
  Genders = Object.values(Gender);
  profile?: IProfileResponse;

  constructor(private readonly profileService: ProfileService) { }

  async ngOnInit() {
    this.profile = await this.profileService.getPersonalProfile();
  }

  // TODO
  onUpdate() { }
}
