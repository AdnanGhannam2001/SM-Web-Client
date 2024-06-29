import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IMessage } from '../../interfaces/chat.interface';
import { MenuItem } from 'primeng/api';
import { MemberRoleType } from '../../interfaces/group.interface';

@Component({
  selector: 'social-chat-message[message]',
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
  @Input() message!: IMessage;
  @Input() role?: MemberRoleType;
  @Output() onUpdate = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter();

  items: MenuItem[] = [];
  currentUserId: string | null;
  updatingMessage?: string;

  constructor() {
    this.currentUserId = localStorage.getItem("id");
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["message"]?.currentValue) {
      if (this.isSameUser(this.message.senderId)) {
        this.items.push(...[
          {
            label: "Update",
            command: () => this.startUpdating()
          },
          {
            label: "Delete",
            command: () => this.onDelete.emit()
          }
        ]);
      } else if (this.role && this.role <= MemberRoleType.Organizer) {
        this.items.push({
          label: "Delete",
          command: () => this.onDelete.emit()
        });
      }
    }
  }

  startUpdating() {
    this.updatingMessage = this.message.content;
  }

  update() {
    this.onUpdate.emit(this.updatingMessage);
    this.updatingMessage = undefined;
  }

  isSameUser(id: string) {
    return id == this.currentUserId;
  }
}
