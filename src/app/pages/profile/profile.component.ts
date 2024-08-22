import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfileResponse } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { TabMenuItem } from '../../ui-components/tab-menu/tab-menu.component';

@Component({
  selector: 'social-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profile?: IProfileResponse;
  editable = false;

  tabs: TabMenuItem[] = [];

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (param) => {
      const id = param.get('id');

      this.editable = id === "profile";

      const promise = id && !this.editable
        ? this.profileService.getProfile(id)
        : this.profileService.getPersonalProfile();

      try {
        this.profile = await promise;

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
          },
          {
            url: url + 'groups',
            text: 'Groups',
          },
          {
            url: url + 'following',
            text: 'Following',
          },
        ];

        if (this.editable) {
          localStorage.setItem("id", this.profile.id);
          localStorage.setItem("firstName", this.profile.firstName);
          localStorage.setItem("lastName", this.profile.lastName!);
          localStorage.setItem("image", `${this.profile.image}`);
          this.tabs.push({ url: url + 'followed', text: "Followed" });
        }
      } catch (error: any) {
        this.router.navigate(['/not-found']);
      }
    });
  }
}
