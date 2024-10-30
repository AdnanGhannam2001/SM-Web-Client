import { Component, Input, SimpleChanges } from "@angular/core";
import { MenuItem, MessageService } from "primeng/api";
import { MemberRoleType, IMember } from "../interfaces/group.interface";
import { IProfile } from "../interfaces/profile.interface";
import { GroupService } from "../services/group.service";
import { ProfileService } from "../services/profile.service";

@Component({template: ""})
export abstract class ProfileBaseComponent {
  @Input() profile!: IProfile;
  @Input() isFriend = false;
  @Input() isFollowed = false;
  @Input() isPending = false;
  @Input() profileRole?: MemberRoleType;
  @Input() membership?: IMember;
  @Input() editable? = false;

  isBlocked = false;

  items: MenuItem[] = [];

  constructor(
    protected readonly messageService: MessageService,
    protected readonly profileService: ProfileService,
    protected readonly groupService: GroupService
  ) { }

  ngOnInit() {
    this.isFriend = this.isFriend || (this.profile.friends !== undefined && this.profile.friends.length > 0);
    this.isFollowed = this.isFollowed || this.profile.followedBy.length > 0;
    this.isPending =
      this.isPending ||
      (this.profile.sentRequests !== undefined && this.profile.sentRequests.length > 0) ||
      (this.profile.receivedRequests !== undefined && this.profile.receivedRequests.length > 0);

    this.updateItems();
  }

  updateItems() {
    this.items = [{
      label: this.isBlocked ? 'Unblock' : 'Block',
      icon: 'pi pi-flag',
      command: async () => await this.block(),
    }];

    if (this.profileRole !== undefined && this.membership !== undefined && this.membership.role <= this.profileRole) {
      this.items.push(...[
        {
          label: "Kick",
          icon: "pi pi-ban",
          command: async () => await this.kick()
        },
        {
          label: "Remove",
          icon: "pi pi-minus",
          command: async () => this.removeMember()
        }
      ]);

      if (this.membership.role === MemberRoleType.Admin) {
        if (this.profileRole > MemberRoleType.Admin) {
          this.items.push({
            label: "Premote",
            icon: "pi pi-angle-double-up",
            command: async () => await this.changeRole(--(this.profileRole!))
          });
        }
        if (this.profileRole < MemberRoleType.Normal) {
          this.items.push({
            label: "Demote",
            icon: "pi pi-angle-double-down",
            command: async () => await this.changeRole(++(this.profileRole!))
          });
        }
      }
    }

    this.items.push(this.isFollowed
      ? {
        label: "Unfollow",
        icon: "pi pi-heart",
        command: async () => await this.followBtnClicked()
      }
      : {
        label: "Follow",
        icon: "pi pi-heart-fill",
        command: async () => await this.followBtnClicked()
      });

    this.items.push(this.isFriend
      ? {
        label: "Unfriend",
        icon: "pi pi-user-plus",
        command: async () => await this.friendBtnClicked()
      }
      : this.isPending
        ? {
          label: "Cancel Request",
          icon: "pi pi-users",
          command: async () => await this.friendBtnClicked()
        }
        : {
          label: "Send Request",
          icon: "pi pi-users",
          command: async () => await this.friendBtnClicked()
        }
      );
  }

  async kick() {
    try {
      await this.groupService.kick(this.membership!.groupId, this.profile.id, "");

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Member is kicked',
      });
    } catch(error: any) {
      this.messageService.add({
        severity: 'danger',
        summary: 'Failed',
        detail: error.error.Message,
      });
    }
  }

  async removeMember() {
    try {
      await this.groupService.removeMember(this.membership!.groupId, this.profile.id)

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Member is removed',
      });
    } catch(error: any) {
      this.messageService.add({
        severity: 'danger',
        summary: 'Failed',
        detail: error.error.Message,
      });
    }
  }

  async block() {
    if (!this.isBlocked) {
      await this.profileService.block(this.profile.id);
    } else {
      await this.profileService.unblock(this.profile.id);
    }

    this.isBlocked = !this.isBlocked;
    this.updateItems();
  }

  async followBtnClicked() {
    if (this.isFollowed) {
      await this.unfollow(this.profile.id);
    } else {
      await this.follow(this.profile.id);
    }

    this.updateItems();
  }

  async friendBtnClicked() {
    if (this.isFriend) {
      await this.cancelFriendship(this.profile.id);
    } else if (this.isPending) {
      await this.cancelRequest(this.profile.id);
    } else {
      await this.sendRequest(this.profile.id);
    }

    this.updateItems();
  }

  async sendRequest(id: string) {
    try {
      await this.profileService.sendRequest(id);

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Sent a friendship request',
      });

      this.isPending = true;
    } catch (error) {
      this.messageService.add({
        severity: 'danger',
        summary: 'Failed',
        detail: "Couldn't send a request",
      });
    }
  }

  async cancelRequest(id: string) {
    try {
      await this.profileService.cancelRequest(id);

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Friendship request cancelled',
      });

      this.isPending = false;
    } catch (error) {
      this.messageService.add({
        severity: 'danger',
        summary: 'Failed',
        detail: "Couldn't cancel the request",
      });
    }
  }

  async cancelFriendship(id: string) {
    try {
      await this.profileService.cancelFriendship(id);

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Friendship cancelled',
      });

      this.isPending = false;
      this.isFriend = false;
    } catch (error) {
      this.messageService.add({
        severity: 'danger',
        summary: 'Failed',
        detail: "Couldn't cancel friendship",
      });
    }
  }

  async follow(id: string) {
    try {
      await this.profileService.follow(id);

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Start following user',
      });

      this.isFollowed = true;
    } catch (error) {
      this.messageService.add({
        severity: 'danger',
        summary: 'Failed',
        detail: "Couldn't follow user",
      });
    }
  }

  async unfollow(id: string) {
    try {
      await this.profileService.unfollow(id);

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Unfollowed user',
      });

      this.isFollowed = false;
    } catch (error) {
      this.messageService.add({
        severity: 'danger',
        summary: 'Failed',
        detail: "Couldn't unfollow user",
      });
    }
  }

  getBadge() {
    if (this.profileRole !== undefined) return this.groupService.getRoles().find(x => Number(x[0]) == this.profileRole)?.[1].toString();
    return undefined;
  }

  async changeRole(role: MemberRoleType) {
    await this.groupService.changeRole(this.membership!.groupId, this.profile.id, role);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Role was updated',
    });
  }
}
