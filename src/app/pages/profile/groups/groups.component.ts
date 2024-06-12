import { Component } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../../../helpers/pagination';
import { IGroup } from '../../../interfaces/group.interface';

@Component({
  selector: 'social-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent extends Pagination<IGroup> {
  layout : 'list' | 'grid' = "list";
  id     : string | null    = null;

  constructor(private readonly profileService: ProfileService,
    private activatedRoute: ActivatedRoute)
  {
    super();
  }

  override async requestPage() {
    this.page = this.id && this.id === 'profile'
      ? await this.profileService.getPersonalGroups(this.pageRequest)
      : await this.profileService.getProfileGroups(this.id!, this.pageRequest);
  }

  async ngOnInit() {
    this.activatedRoute.parent?.paramMap.subscribe(async (param) => {
      this.id = param.get('id');
    });
  }
}
