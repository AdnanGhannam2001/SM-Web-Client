import { Component, Input } from '@angular/core';
import { INotification } from '../../interfaces/notification.interface';
import { NotificaitonService } from '../../services/notificaiton.service';
import { IPage } from '../../interfaces/page.interface';

@Component({
  selector: 'social-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  page: IPage<INotification> = { items: [], total: 0 };
  loading: boolean = true;

  constructor(private readonly notificationService: NotificaitonService) { }

  async ngOnInit() {
    const pageRequest = { pageSize: 10 };
    this.page = await this.notificationService.getNotifications(pageRequest);
    this.loading = false;
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
