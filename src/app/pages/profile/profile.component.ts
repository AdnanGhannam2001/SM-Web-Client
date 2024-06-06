import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { TabMenuItem } from '../../ui-components/tab-menu/tab-menu.component';

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

      const promise = id && id !== "profile"
        ? this.profileService.getProfile(id)
        : this.profileService.getPersonalProfile();

      try {
        const profile = await promise;

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
            badge: profile.friends?.length + '',
          },
          {
            url: url + 'groups',
            text: 'Groups',
            badge: profile.memberOf?.length + '',
          },
        ];
      } catch (error) {
        this.router.navigate(['/not-found']);
      }
    });
  }
}
