import { Component } from '@angular/core';
import { IGroup } from '../../../interfaces/group.interface';
import { IPage } from '../../../interfaces/page.interface';
import { GroupService } from '../../../services/group.service';

@Component({
  selector: 'social-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  groups: IPage<IGroup> = { items: [], total: 0 };
  layout: 'list' | 'grid' = "list";

  constructor(private groupService: GroupService) { }

  async ngOnInit() {
    // TODO: Add required service
  }
}
