import { Component } from '@angular/core';
import { Pagination } from '../../bases/pagination';
import { IChat } from '../../interfaces/chat.interface';
import { ChatService } from '../../services/chat.service';
import { GroupService } from '../../services/group.service';
import { ProfileService } from '../../services/profile.service';
import { getGroupCoverImage, getGroupImage, getProfileImage } from '../../helpers/file-helper';

@Component({
  selector: 'social-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent extends Pagination<IChat> {
  visible: boolean = false;
  end = false;
  loading = true;
  selected?: number;

  groupImage(id: string) { return getGroupImage(id); }
  profileImage(id: string) { return getProfileImage(id); }

  constructor(private readonly chatService: ChatService,
              private readonly groupService: GroupService,
              private readonly profileService: ProfileService)
  { super(); }

  override async requestPage() {
    this.pageRequest.desc = false;
    const response = await this.chatService.getChats(this.pageRequest);

    if (response.items.length == 0) {
      this.end = true;
      return;
    }

    const groupsIds: Array<string> = [];
    const profilesIds: Array<string> = [];

    for (let chat of response.items) {
      if (chat.isGroup) {
        groupsIds.push(chat.id);
      } else {
        const myid = localStorage.getItem("id");
        const ids = chat.id.split('|');

        for (let id of ids) {
          if (id != myid) {
            profilesIds.push(id);
            break;
          }
        }
      }
    }

    const groupsNames = await this.groupService.getGroupsNamesByIds(groupsIds);
    const profilesNames = await this.profileService.getProfilesNamesByIds(profilesIds);

    for (let chat of response.items) {
      if (chat.isGroup) {
        chat.group = groupsNames.find(x => x.id == chat.id)
      } else {
        chat.user = profilesNames.find(x => chat.id.includes(x.id));
      }
    }

    this.page.items.push(...response.items);

    this.page.total = response.total;
    (this.pageRequest.pageNumber!)++;

    if (response.items.length < this.pageRequest.pageSize!) {
      this.end = true;
    }
  }

  async ngOnInit() {
    await this.requestPage();
    this.loading = false;
    this.selected = 0;
  }

  showDialog() {
    this.visible = true;
  }

  async open(id: string) {
    this.selected = this.page.items.findIndex(chat => chat.id == id);
    console.log(this.selected)
    this.visible = false;
  }
}
