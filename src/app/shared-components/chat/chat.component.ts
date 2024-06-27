import { Component, Input, SimpleChanges } from '@angular/core';
import { Pagination } from '../../helpers/pagination';
import { IMessage } from '../../interfaces/chat.interface';
import { ChatService } from '../../services/chat.service';
import { HttpClient, HubConnectionBuilder } from '@aspnet/signalr';
import { APIS_CHATS } from '../../constants/apis';
import { HUBS_CHAT } from '../../constants/hubs';

@Component({
  selector: 'social-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent extends Pagination<IMessage> {
  @Input() id?: string;
  message = "";
  currentUserId: string | null;

  hubConnection;
  connectionId?: string;

  constructor(private readonly chatService: ChatService) {
    super();
    this.currentUserId = localStorage.getItem("id");

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${HUBS_CHAT}/websocket/chat`)
      .build();

    this.hubConnection.on("MessageSent", (message: IMessage) =>
    {
      if (message.senderId != this.currentUserId) {
        this.page.items.unshift(message);
      }
    });
  }

  async ngOnInit() {
    try {
      await this.hubConnection.start();
      this.connectionId = await this.hubConnection.invoke<string>("GetConnectionId");

      console.info("Connected to chat hub with connection Id =", this.connectionId);
    } catch (error) {
      console.error("Error connecting to chat hub", error);
    }
  }

  override async requestPage() {
    this.page = await this.chatService.getMessages(this.id!, this.pageRequest);
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes["id"]?.currentValue) {
      this.pageRequest = { pageSize: 10, pageNumber: 0 };

      if (!this.connectionId) throw new Error("No Connection Id");

      await this.chatService.joinChat(this.id!, this.connectionId);

      await this.requestPage();
    }
  }

  async sendMessage() {
    const message = await this.chatService.sendMessage(this.id!, this.message);
    this.page.items.unshift(message);
    this.message = "";
  }

  isUser(id: string) {
    return id == this.currentUserId;
  }
}
