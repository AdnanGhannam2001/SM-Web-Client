import { Component } from '@angular/core';
import { IPage } from '../../interfaces/page.interface';
import { IGroup } from '../../interfaces/group.interface';
import { GroupService } from '../../services/group.service';
import { getGroupImage } from '../../helpers/file-helper';

@Component({
  selector: 'social-groups-box',
  templateUrl: './groups-box.component.html',
  styleUrl: './groups-box.component.scss'
})
export class GroupsBoxComponent {
  groups: IPage<IGroup> = { items: [], total: 0 };

  image(id: string) { return getGroupImage(id); }

  constructor(private readonly groupService: GroupService) { }

  async ngOnInit() {
    this.groups = await this.groupService.getGroups({ pageSize: 10 })
  }
}
