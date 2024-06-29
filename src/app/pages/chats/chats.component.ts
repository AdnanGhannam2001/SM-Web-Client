import { Component } from '@angular/core';
import { Pagination } from '../../bases/pagination';
import { IChat } from '../../interfaces/chat.interface';
import { ChatService } from '../../services/chat.service';
import { GroupService } from '../../services/group.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'social-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent extends Pagination<IChat> {
  visible: boolean = false;
  chat?: IChat;
  end = false;
  loading = true;

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

    for (let chat of response.items) {
      if (chat.isGroup) {
        chat.group = await this.groupService.getGroup(chat.id);
      } else {
        const myid = localStorage.getItem("id");
        const ids = chat.id.split('|');

        for (let id of ids) {
          if (id != myid) {
            chat.user = await this.profileService.getProfile(id);
            break;
          }
        }
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
    this.chat = this.page.items[0];
  }

  showDialog() {
    this.visible = true;
  }

  async open(id: string) {
    this.chat = this.page.items.find(chat => chat.id == id);
    this.visible = false;
  }
}
