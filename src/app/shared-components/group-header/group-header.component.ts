import { Component, Input } from '@angular/core';
import { IGroup } from '../../interfaces/group.interface';
import { GroupService } from '../../services/group.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'social-group-header[group]',
  templateUrl: './group-header.component.html',
  styleUrl: './group-header.component.scss',
})
export class GroupHeaderComponent {
  @Input() group!: IGroup;
  get visibility() {
    return this.groupService
      .getVisibilities()
      .find((x) => Number(x[0]) == this.group.visibility)?.[1];
  }

  constructor(private readonly groupService: GroupService,
              private readonly router: Router,
              private readonly messageService: MessageService) {}

  async leave() {
    await this.groupService.leave(this.group.id);
    this.router.navigate(['/']);
  }

  async cancelRequest() {
    await this.groupService.cancelJoinRequest(this.group.id);
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
