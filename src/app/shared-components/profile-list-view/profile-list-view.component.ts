import { Component, Input } from '@angular/core';
import { IProfile } from '../../interfaces/profile.interface';
import { MenuItem, MessageService } from 'primeng/api';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'social-profile-list-view[profile]',
  templateUrl: './profile-list-view.component.html',
  styleUrl: './profile-list-view.component.scss'
})
export class ProfileListViewComponent {
  @Input() profile!: IProfile;
  @Input() isFriend = false;
  @Input() isFollowed = false;
  // TODO fix this in the BE
  @Input() isPending = false;

  items: MenuItem[] = [
    {
      label: "Block",
      icon: "pi pi-flag",
      command: () => { }
    },
    {
      label: "Report",
      icon: "pi pi-exclamation-circle",
      command: () => { }
    }
  ];

  constructor(private readonly messageService: MessageService, private readonly profileService: ProfileService) { }

  ngOnInit() {
    this.isFriend = this.isFriend ?? this.profile.friends.length > 0;
    this.isFollowed = this.isFollowed ?? this.profile.followedBy.length > 0;
    this.isPending = this.isPending ?? this.profile.sentRequests.length > 0;
  }

  async followBtnClicked() {
    if (this.isFollowed) {
      await this.unfollow(this.profile.id);
    } else {
      await this.follow(this.profile.id);
    }
  }

  async friendBtnClicked() {
    if (this.isFriend) {
      await this.cancelFriendship(this.profile.id);
    } else if (this.isPending) {
      await this.cancelRequest(this.profile.id);
    } else {
      await this.sendRequest(this.profile.id);
    }
  }

  async sendRequest(id: string) {
    try {
      await this.profileService.sendRequest(id);

      this.messageService.add({
        severity: 'success',
        summary: "Success",
        detail: "Sent a friendship request"
      });

      this.isPending = true;
    } catch (error) {
      this.messageService.add({
        severity: 'danger',
        summary: "Failed",
        detail: "Couldn't send a request"
      });
    }
  }

  async cancelRequest(id: string) {
    try {
      await this.profileService.cancelRequest(id);

      this.messageService.add({
        severity: 'success',
        summary: "Success",
        detail: "Friendship request cancelled"
      });

      this.isPending = false;
    } catch (error) {
      this.messageService.add({
        severity: 'danger',
        summary: "Failed",
        detail: "Couldn't cancel the request"
      });
    }
  }

  async cancelFriendship(id: string) {
    try {
      await this.profileService.cancelFriendship(id);

      this.messageService.add({
        severity: 'success',
        summary: "Success",
        detail: "Friendship cancelled"
      });

      this.isPending = false;
      this.isFriend = false;
    } catch (error) {
      this.messageService.add({
        severity: 'danger',
        summary: "Failed",
        detail: "Couldn't cancel friendship"
      });
    }
  }

  async follow(id: string) {
    try {
      await this.profileService.follow(id);

      this.messageService.add({
        severity: 'success',
        summary: "Success",
        detail: "Start following user"
      });

      this.isFollowed = true;
    } catch (error) {
      this.messageService.add({
        severity: 'danger',
        summary: "Failed",
        detail: "Couldn't follow user"
      });
    }
  }

  async unfollow(id: string) {
    try {
      await this.profileService.unfollow(id);

      this.messageService.add({
        severity: 'success',
        summary: "Success",
        detail: "Unfollowed user"
      });

      this.isFollowed = false;
    } catch (error) {
      this.messageService.add({
        severity: 'danger',
        summary: "Failed",
        detail: "Couldn't unfollow user"
      });
    }
  }
}
