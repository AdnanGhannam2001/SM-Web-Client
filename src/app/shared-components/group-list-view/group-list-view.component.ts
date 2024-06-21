import { Component, Input } from '@angular/core';
import { GroupVisibilities, IGroup } from '../../interfaces/group.interface';
import { GroupService } from '../../services/group.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'social-group-list-view[group]',
  templateUrl: './group-list-view.component.html',
  styleUrl: './group-list-view.component.scss'
})
export class GroupListViewComponent {
  @Input() group!: IGroup;

  constructor(private readonly groupService: GroupService,
              private readonly router: Router,
              private readonly messageService: MessageService) {}

  get visibility() {
    return this.groupService.getVisibilities().find(x => Number(x[0]) == this.group.visibility)?.[1].toString();
  }

  get color() {
    return this.group.visibility == GroupVisibilities.Public
      ? "var(--green-300)"
      : "var(--red-300)";
  }

  async leave() {
    await this.groupService.leave(this.group.id);
    this.router.navigate(['/']);
  }

  async cancelRequest() {
    await this.groupService.cancelJoinRequest(this.group.id);
    this.group.joinRequests.pop();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Request is cancelled',
    });
  }

  async join() {
    const request = await this.groupService.sendJoinRequest(this.group.id, "");
    this.group.joinRequests.push(request);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Request was sent',
    });
  }
}
