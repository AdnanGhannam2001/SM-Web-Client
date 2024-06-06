import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { TabMenuItem } from '../../ui-components/tab-menu/tab-menu.component';
import { LOGIN_REDIRECT_URI } from '../../constants/apis';

@Component({
  selector: 'social-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profile?: IProfile;

  tabs: TabMenuItem[] = [];

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (param) => {
      const id = param.get('id');

      console.log({ id })
      const promise = id && id !== "profile"
        ? this.profileService.getProfile(id)
        : this.profileService.getPersonalProfile();

      try {
        this.profile = await promise;

        const url = `/profile/${id}/`;

        this.tabs = [
          {
            url,
            text: 'Timeline',
          },
          {
            url: url + 'info',
            text: 'Information',
          },
          {
            url: url + 'friends',
            text: 'Friends',
            badge: this.profile.friends?.length + '',
          },
          {
            url: url + 'groups',
            text: 'Groups',
            badge: this.profile.memberOf?.length + '',
          },
        ];
      } catch (error: any) {
        if (error.url?.startsWith(LOGIN_REDIRECT_URI)) window.location.href = error.url;
        this.router.navigate(['/not-found']);
      }
    });
  }
}
