import { Component, Input, SimpleChanges } from '@angular/core';
import { Pagination } from '../../helpers/pagination';
import { IMessage } from '../../interfaces/chat.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'social-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent extends Pagination<IMessage> {
  @Input() id?: string;
  message = "";

  constructor(private readonly chatService: ChatService) { super(); }

  override async requestPage() {
    console.warn(this.id)
    this.page = await this.chatService.getMessages(this.id!, this.pageRequest);
    console.info(this.page)
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes["id"]?.currentValue) {
      await this.requestPage();
    }
  }

  async sendMessage() {
    const message = await this.chatService.sendMessage(this.id!, this.message);
    this.page.items.unshift(message);
    this.message = "";
  }
}
