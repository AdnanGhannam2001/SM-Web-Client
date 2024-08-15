import { Component } from '@angular/core';
import { Pagination } from '../../bases/pagination';
import { INotification } from '../../interfaces/notification.interface';
import { NotificaitonService } from '../../services/notificaiton.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent extends Pagination<INotification> {
  constructor(private readonly notificationService: NotificaitonService) { super(); }

  override async requestPage(): Promise<void> {
    this.page = await this.notificationService.getNotifications(this.pageRequest);
  }

  async ngOnInit() {
    await this.requestPage();
  }

  async markAs(id: string, read: boolean) {
    await this.notificationService.updateNotifications(id, read);
    let notificaiton = this.page.items.find(x => x.id === id);
    notificaiton!.isRead = read;
  }

  async deleteNotification(id: string) {
    await this.notificationService.deleteNotifications(id);
    this.page.items = this.page.items.filter(x => x.id !== id);
    this.page.total--;
  }
}
