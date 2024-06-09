import { Component } from '@angular/core';
import { IGroup } from '../../../interfaces/group.interface';
import { IPage } from '../../../interfaces/page.interface';
import { GroupService } from '../../../services/group.service';
import { ProfileService } from '../../../services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'social-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  groups: IPage<IGroup> = { items: [], total: 0 };
  layout: 'list' | 'grid' = "list";
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

      this.groups = id && !personalProfile
        ? await this.profileService.getProfileGroups(id, pageRequest)
        : await this.profileService.getPersonalGroups(pageRequest);
    });
  }
}
