import { Component } from '@angular/core';
import { Pagination } from '../../../helpers/pagination';
import { IFollow } from '../../../interfaces/profile.interface';
import { ProfileService } from '../../../services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'social-following',
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingComponent extends Pagination<IFollow> {
  layout : 'list' | 'grid' = "list";
  id     : string | null    = null;

  constructor(private readonly profileService: ProfileService,
              private activatedRoute: ActivatedRoute)
  {
    super();
  }

  override async requestPage() {
    const id = this.id !== "profile" ? this.id : localStorage.getItem("id");
    this.page = await this.profileService.getFollowing(id!, this.pageRequest);
  }

  async ngOnInit() {
    this.activatedRoute.parent?.paramMap.subscribe(async (param) => {
      this.id = param.get('id');
      await this.requestPage();
    });
  }
}
