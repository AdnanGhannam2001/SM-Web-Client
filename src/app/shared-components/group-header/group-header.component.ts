import { Component, Input } from '@angular/core';
import { IGroup, MemberRoleType } from '../../interfaces/group.interface';
import { GroupService } from '../../services/group.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { getGroupCoverImage, getGroupImage } from '../../helpers/file-helper';

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

  oldState = this.group;
  updating = false;
  updatingSettings = false;
  inviting = false;
  loading = false;

  items: MenuItem[] = [];
  visibilities: any[] = [];
  roles: any[] = [];

  constructor(private readonly groupService: GroupService,
              private readonly router: Router,
              private readonly messageService: MessageService) {}

  ngOnInit() {
    this.visibilities = this.groupService.getVisibilities().map(([key, value]) => ({ name: value, code: Number(key) }));
    this.roles = this.groupService.getRoles().map(([key, value]) => ({ name: value, code: Number(key) }));

    if (this.group.members.at(0)?.role == this.group.settings.editDetailsRole) {
      this.items.push(...[
        {
          label: "Update Group",
          command: () => this.startUpdating()
        },
        {
          label: "Update Group Settings",
          command: () => this.startUpdatingSettings()
        },
        {
          label: "Invite to Group",
          command: async () => await this.startInviting()
        },
        {
          label: "Delete Group",
          command: async () => await this.delete()
        }
      ]);
    } else {
      this.items.push({ label: "No Actions..." })
    }
  }

  image(id: string) { return getGroupImage(id); }
  coverImage(id: string) { return getGroupCoverImage(id); }

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

  startUpdating() {
    this.updating = true;
    this.oldState = {...this.group};
  }

  startUpdatingSettings() {
    this.updatingSettings = true;
    this.oldState = {...this.group};
  }

  async update() {
    this.loading = true;

    try {
      this.group = await this.groupService.updateGroup(this.group.id, this.group);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
      });
    } catch (error: any) {
      this.group = {...this.oldState};
      this.messageService.add({
        severity: 'danger',
        summary: 'Failed',
        detail: error?.error?.Message,
      });
    }

    this.updating = false;
    this.loading = false;
  }

  async updateSettings() {
    this.loading = true;

    try {
      this.group.settings = await this.groupService.updateGroupSettings(this.group.id, this.group.settings);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
      });
    } catch (error: any) {
      this.group = {...this.oldState};
      console.log({ error });
      this.messageService.add({
        severity: 'danger',
        summary: 'Failed',
        detail: error?.error?.Message,
      });
    }

    this.updatingSettings = false;
    this.loading = false;
  }

  async delete() {
    await this.groupService.deleteGroup(this.group.id);
    this.router.navigate(['/']);
  }

  startInviting() {
    this.inviting = true;
  }

  async invite(id: string) {
    await this.groupService.sendInvite(this.group.id, id, "");
  }

  async reload() {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    await this.router.navigate([this.router.url]);
  }

  async onUpload() {
    console.log("reloading...");
    await this.reload();
  }

  async deleteImage() {
    await this.groupService.removeImage(this.group.id);
    await this.reload();
  }

  async deleteCoverImage() {
    await this.groupService.removeCoverImage(this.group.id);
    await this.reload();
  }
}
