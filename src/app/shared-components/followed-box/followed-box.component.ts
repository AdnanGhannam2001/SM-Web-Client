import { Component } from '@angular/core';
import { IFollow } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { IPage } from '../../interfaces/page.interface';
import { LOGIN_REDIRECT_URI } from '../../constants/apis';

@Component({
  selector: 'social-followed-box',
  templateUrl: './followed-box.component.html',
  styleUrl: './followed-box.component.scss'
})
export class FollowedBoxComponent {
  followed: IPage<IFollow> = { items: [], total: 0 };
  showButton = false;

  constructor(private profileService: ProfileService) { }

  async ngOnInit() {
    try {
      this.followed = await this.profileService.getFollowed({ pageSize: 10 });
    } catch (error: any) {
      if (error.url?.startsWith(LOGIN_REDIRECT_URI)) window.location.href = error.url;
    }
  }
}
