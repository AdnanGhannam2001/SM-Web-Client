import { Component } from '@angular/core';
import { IGroup } from '../../interfaces/group.interface';
import { TabMenuItem } from '../../ui-components/tab-menu/tab-menu.component';
import { GroupService } from '../../services/group.service';
import { Pagination } from '../../bases/pagination';

@Component({
  selector: 'social-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent extends Pagination<IGroup> {
  layout: 'list' | 'grid' = "list";
  tabs: TabMenuItem[];
  loading = true;

  constructor(private groupService: GroupService) {
    super();

    this.tabs = [
      { text: "All Groups", url: "/groups" },
      { text: "Create a Group", url: "/create-group" },
    ];
  }

  override async requestPage() {
    this.page = await this.groupService.getGroups(this.pageRequest);
  }

  async ngOnInit() {
    await this.requestPage();
    this.loading = false;
  }
}
