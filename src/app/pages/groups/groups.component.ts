import { Component } from '@angular/core';
import { IPage } from '../../interfaces/page.interface';
import { IGroup } from '../../interfaces/group.interface';
import { TabMenuItem } from '../../ui-components/tab-menu/tab-menu.component';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'social-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  groups: IPage<IGroup> = { items: [], total: 0 };
  layout: 'list' | 'grid' = "list";
  tabs: TabMenuItem[];
  search = "";

  constructor(private groupService: GroupService) {
    this.tabs = [
      { text: "All Groups", url: "/groups" },
      { text: "Create a Group", url: "/create-group" },
    ];
  }

  async ngOnInit() {
    // TODO Add Page Request
    this.groups = await this.groupService.getGroups({ });
  }

  // TODO
  onSearch() { }
}
