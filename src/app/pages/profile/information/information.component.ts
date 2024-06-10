import { Component, Inject } from '@angular/core';
import { IProfileResponse } from '../../../interfaces/profile.interface';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'social-information',
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {
  editable = false;
  profile?: IProfileResponse;

  constructor(@Inject(ProfileComponent) private readonly parent: ProfileComponent) {}

  async ngAfterViewChecked() {
    this.profile = this.parent.profile;
  }
}
