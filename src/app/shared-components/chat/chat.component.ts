import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Pagination } from '../../bases/pagination';
import { IChat, IMessage } from '../../interfaces/chat.interface';
import { ChatService } from '../../services/chat.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { HUBS_CHAT } from '../../constants/hubs';
import { ProfileService } from '../../services/profile.service';
import { getGroupImage, getProfileImage } from '../../helpers/file-helper';

@Component({
  selector: 'social-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent extends Pagination<IMessage> {
  @Input() chat?: IChat;
  @Output() onChatsButtonClick = new EventEmitter<MouseEvent>();

  message = "";

  hubConnection?: HubConnection;
  connectionId?: string;

  profileImage(id: string) { return getProfileImage(id); }
  groupImage(id: string) { return getGroupImage(id); }

  constructor(private readonly chatService: ChatService,
              private readonly profileService: ProfileService
  ) {
    super();
  }

  chatsButtonClick(event: MouseEvent) {
    this.onChatsButtonClick.emit(event);
  }

  async ngOnInit() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${HUBS_CHAT}/chat`)
      .build();

    this.hubConnection.on("MessageSent", async (message: IMessage) => {
      message.sender = (await this.profileService.getProfilesNamesByIds([message.senderId]))[0];
      this.page.items.unshift(message);
    });

    this.hubConnection.on("MessageUpdated", (messageId: string, content: string) => {
      const message = this.page.items.find(x => x.id == messageId)
      if (message) {
        message.content = content;
      }
    });

    this.hubConnection.on("MessageDeleted", (messageId: string) => {
      this.page.items.find(x => x.id == messageId)
      this.page.items = this.page.items.filter(x => x.id != messageId);
    });

    try {
      await this.hubConnection.start();
      this.connectionId = await this.hubConnection.invoke<string>("GetConnectionId");

      console.info("Connected to chat hub with connection Id =", this.connectionId);
    } catch (error) {
      console.error("Error connecting to chat hub", error);
    }
  }

  override async requestPage() {
    const response = await this.chatService.getMessages(this.chat!.id, this.pageRequest);

    const ids: Array<string> = [];
    for (let chat of response.items) {
      ids.push(chat.senderId);
    }

    const profiles = await this.profileService.getProfilesNamesByIds(ids);

    for (let mesage of response.items) {
      mesage.sender = profiles.find(x => x.id == mesage.senderId);
    }

    this.page = response;
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes["chat"]?.currentValue) {
      this.pageRequest = { pageSize: 10, pageNumber: 0 };

      if (!this.connectionId) throw new Error("No Connection Id");

      await this.chatService.joinChat(this.chat!.id, this.connectionId);

      await this.requestPage();
    }
  }

  async sendMessage() {
    await this.chatService.sendMessage(this.chat!.id, this.message);
    this.message = "";
  }

  async updateMessage(id: string, content: string) {
    await this.chatService.updateMessage(this.chat!.id, id, content);
  }

  async deleteMessage(id: string) {
    await this.chatService.deleteMessage(this.chat!.id, id);
  }
}
