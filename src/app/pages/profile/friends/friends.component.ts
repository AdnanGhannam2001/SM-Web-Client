import { Component } from '@angular/core';
import { IPage } from '../../../interfaces/page.interface';
import { IFriendship } from '../../../interfaces/profile.interface';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'socials-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {
  layout     : 'list' | 'grid' = "list";
  friends    : IPage<IFriendship> = { items: [], total: 0 };
  pageNumber?: number;
  pageSize  ?: number;
  search    ?: string;
  desc      ?: boolean;

  constructor(private readonly profileService: ProfileService) { }

  async ngOnInit() {
    this.friends = await this.profileService.getFriends({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search,
      desc: this.desc,
    });
  }
}
