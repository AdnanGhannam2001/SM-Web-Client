import { Component } from '@angular/core';
import { IFollow } from '../../../interfaces/profile.interface';
import { Pagination } from '../../../helpers/pagination';
import { ProfileService } from '../../../services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrl: './followed.component.scss'
})
export class FollowedComponent extends Pagination<IFollow> {
  layout : 'list' | 'grid' = "list";
  id     : string | null    = null;

  constructor(private readonly profileService: ProfileService,
              private activatedRoute: ActivatedRoute)
  {
    super();
  }

  override async requestPage() {
    this.page = await this.profileService.getFollowed(this.pageRequest);
  }

  async ngOnInit() {
    this.activatedRoute.parent?.paramMap.subscribe(async (param) => {
      this.id = param.get('id');
      await this.requestPage();
    });
  }
}
