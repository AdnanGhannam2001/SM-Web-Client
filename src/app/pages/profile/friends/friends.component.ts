import { Component } from '@angular/core';
import { IPage } from '../../../interfaces/page.interface';
import { IFriendship } from '../../../interfaces/profile.interface';
import { ProfileService } from '../../../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'socials-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {
  layout     : 'list' | 'grid' = "list";
  friends    : IPage<IFriendship> = { items: [], total: 0 };
  pageNumber: number = 0;
  pageSize  : number = 20;
  search    : string = "";
  desc      : boolean = true;

  constructor(private readonly profileService: ProfileService,
    private activatedRoute: ActivatedRoute) {}


  async ngOnInit() {
    const pageRequest =  {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search,
      desc: this.desc,
    };

    this.activatedRoute.paramMap.subscribe(async (param) => {
      const id = param.get('id');

      const personalProfile = id === "profile";

      this.friends = id && !personalProfile
        ? await this.profileService.getProfileFriends(id, pageRequest)
        : await this.profileService.getFriends(pageRequest);
    });
  }
}
