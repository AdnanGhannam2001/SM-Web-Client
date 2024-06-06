import { Component } from '@angular/core';
import { IPage } from '../../interfaces/page.interface';
import { IGroup } from '../../interfaces/group.interface';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'social-groups-box',
  templateUrl: './groups-box.component.html',
  styleUrl: './groups-box.component.scss'
})
export class GroupsBoxComponent {
  groups: IPage<IGroup> = { items: [], total: 0 };

  constructor(private groupService: GroupService) { }

  async ngOnInit() {
    this.groups = await this.groupService.getGroups({ pageSize: 10 })
  }
}