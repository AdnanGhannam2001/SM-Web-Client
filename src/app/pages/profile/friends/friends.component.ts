import { Component } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../../../helpers/pagination';
import { IFriendship } from '../../../interfaces/profile.interface';

@Component({
  selector: 'socials-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent extends Pagination<IFriendship> {
  layout : 'list' | 'grid' = "list";
  id     : string | null    = null;

  constructor(private readonly profileService: ProfileService,
              private activatedRoute: ActivatedRoute)
  {
    super();
  }

  override async requestPage() {
    this.page = this.id && this.id === 'profile'
      ? await this.profileService.getFriends(this.pageRequest)
      : await this.profileService.getProfileFriends(this.id!, this.pageRequest);
  }

  async ngOnInit() {
    this.activatedRoute.parent?.paramMap.subscribe(async (param) => {
      this.id = param.get('id');
    });
  }
}
