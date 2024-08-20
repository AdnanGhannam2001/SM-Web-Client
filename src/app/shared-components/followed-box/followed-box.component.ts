import { Component } from '@angular/core';
import { IFollow } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { IPage } from '../../interfaces/page.interface';
import { getProfileImage } from '../../helpers/file-helper';

@Component({
  selector: 'social-followed-box',
  templateUrl: './followed-box.component.html',
  styleUrl: './followed-box.component.scss'
})
export class FollowedBoxComponent {
  followed: IPage<IFollow> = { items: [], total: 0 };
  showButton = false;

  image(id: string) { return getProfileImage(id); }

  constructor(private profileService: ProfileService) { }

  async ngOnInit() {
    this.followed = await this.profileService.getFollowed({ pageSize: 10 });
  }
}
