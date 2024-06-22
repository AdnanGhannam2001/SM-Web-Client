import { Component } from '@angular/core';
import { GroupVisibilities, IGroupRequest, MemberRoleType } from '../../interfaces/group.interface';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'social-create-group',
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss'
})
export class CreateGroupComponent {
  group: IGroupRequest = {
    visibility: GroupVisibilities.Public,
    settings: {
      editDetailsRole: MemberRoleType.Admin,
      inviterRole: MemberRoleType.Organizer,
      postingRole: MemberRoleType.Normal,
    }
  };

  visibilities: any[] = [];
  roles: any[] = [];

  constructor(private readonly groupService: GroupService, private readonly router: Router) {
    this.visibilities = this.groupService.getVisibilities().map(([key, value]) => ({ name: value, code: Number(key) }));
    this.roles = this.groupService.getRoles().map(([key, value]) => ({ name: value, code: Number(key) }));
  }

  async create() {
    const group = await this.groupService.createGroup(this.group);
    this.router.navigate([`/groups/${group.id}`]);
  }
}
