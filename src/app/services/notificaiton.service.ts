import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPage, IPageRequest } from '../interfaces/page.interface';
import { INotification } from '../interfaces/notification.interface';
import { lastValueFrom } from 'rxjs';
import { APIS_NOTIFICATIONS } from '../constants/apis';

@Injectable({ providedIn: 'root' })
export class NotificaitonService {
  constructor(private readonly http: HttpClient) { }

  getNotifications(pageRequest: IPageRequest): Promise<IPage<INotification>> {
    return lastValueFrom(this.http.get<IPage<INotification>>(
      `${APIS_NOTIFICATIONS}/notifications`, { withCredentials: true, params: { ...pageRequest } }));
  }

  updateNotifications(id: string, read: boolean): Promise<INotification> {
    return lastValueFrom(this.http.patch<INotification>(
      `${APIS_NOTIFICATIONS}/notifications/${id}`, {}, { withCredentials: true, params: { read } }));
  }

  deleteNotifications(id: string): Promise<INotification> {
    return lastValueFrom(this.http.delete<INotification>(
      `${APIS_NOTIFICATIONS}/notifications/${id}`, { withCredentials: true }));
  }
}
