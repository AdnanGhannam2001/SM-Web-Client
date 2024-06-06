import { Component } from '@angular/core';
import { IProfile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { IPage, IPageRequest } from '../../interfaces/page.interface';

@Component({
  selector: 'social-followed-box',
  templateUrl: './followed-box.component.html',
  styleUrl: './followed-box.component.scss'
})
export class FollowedBoxComponent {
  followed: IPage<IProfile> = { items: [], total: 0 };
  showButton = false;

  constructor(private profileService: ProfileService) { }

  async ngOnInit() {
    this.followed = await this.profileService.getProfiles({ pageSize: 10 });
  }
}
