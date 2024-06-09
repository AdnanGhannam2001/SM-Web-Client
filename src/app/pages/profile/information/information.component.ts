import { Component } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfileResponse } from '../../../interfaces/profile.interface';

@Component({
  selector: 'social-information',
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {
  editable = false;
  profile?: IProfileResponse;

  constructor(
    private readonly profileService: ProfileService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (param) => {
      const id = param.get('id');

      const promise = id
        ? this.profileService.getProfile(id)
        : this.profileService.getPersonalProfile();

      this.profile = await promise;
    });
  }
}
