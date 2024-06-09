import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfile, IProfileResponse } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { TabMenuItem } from '../../ui-components/tab-menu/tab-menu.component';
import { LOGIN_REDIRECT_URI } from '../../constants/apis';

@Component({
  selector: 'social-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profile?: IProfileResponse;

  tabs: TabMenuItem[] = [];

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (param) => {
      const id = param.get('id');

      const personalProfile = id === "profile";

      const promise = id && !personalProfile
        ? this.profileService.getProfile(id)
        : this.profileService.getPersonalProfile();

      try {
        this.profile = await promise;

        if (personalProfile) {
          localStorage.setItem("id", this.profile.id);
          localStorage.setItem("firstName", this.profile.firstName);
          localStorage.setItem("lastName", this.profile.lastName!);
          localStorage.setItem("image", this.profile.image ?? "");
        }

        const url = `/profiles/${id}/`;

        this.tabs = [
          {
            url,
            text: 'Posts',
          },
          {
            url: url + 'info',
            text: 'Information',
          },
          {
            url: url + 'friends',
            text: 'Friends',
            // badge: this.profile.friends?.length + '',
          },
          {
            url: url + 'groups',
            text: 'Groups',
            // badge: this.profile.memberOf?.length + '',
          },
        ];
      } catch (error: any) {
        if (error.url?.startsWith(LOGIN_REDIRECT_URI)) window.location.href = error.url;
        this.router.navigate(['/not-found']);
      }
    });
  }
}
