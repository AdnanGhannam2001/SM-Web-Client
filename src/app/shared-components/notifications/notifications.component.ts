import { Component } from '@angular/core';
import { INotification } from '../../interfaces/notification.interface';
import { NotificaitonService } from '../../services/notificaiton.service';
import { IPage } from '../../interfaces/page.interface';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { HUBS_NOTIFICATIONS } from '../../constants/hubs';

@Component({
  selector: 'social-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  page: IPage<INotification> = { items: [], total: 0 };
  loading: boolean = true;

  hubConnection;

  constructor(private readonly notificationService: NotificaitonService) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${HUBS_NOTIFICATIONS}/notification`)
      .build();

    this.hubConnection.on("Notify", (notification: INotification) => {
      this.page.items.unshift(notification);
      this.page.total++;
    });
  }

  async ngOnInit() {
    const pageRequest = { pageSize: 10 };
    this.page = await this.notificationService.getNotifications(pageRequest);
    this.loading = false;

    try {
      await this.hubConnection.start();
      const connectionId = await this.hubConnection.invoke<string>("GetConnectionId");
      await this.notificationService.start(connectionId);

      console.info("Connected to notification hub with connection Id =", connectionId);
    } catch (error) {
      console.error("Error connecting to notification hub", error);
    }
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
