import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPage, IPageRequest } from '../interfaces/page.interface';
import { lastValueFrom } from 'rxjs';
import { IChat, IMessage } from '../interfaces/chat.interface';
import { APIS_CHATS } from '../constants/apis';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private readonly http: HttpClient) { }

  getChats(pageRequest: IPageRequest): Promise<IPage<IChat>> {
    return lastValueFrom(this.http.get<IPage<IChat>>(`${APIS_CHATS}/chats`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getMessages(id: string, pageRequest: IPageRequest): Promise<IPage<IMessage>> {
    return lastValueFrom(this.http.get<IPage<IMessage>>(`${APIS_CHATS}/chats/${id}`, { withCredentials: true, params: { ...pageRequest } }));
  }

  sendMessage(id: string, content: string): Promise<IMessage> {
    return lastValueFrom(this.http.post<IMessage>(`${APIS_CHATS}/chats/${id}`, { content }, { withCredentials: true }));
  }

  joinChat(id: string, connectionId: string): Promise<void> {
    return lastValueFrom(this.http.post<void>(`${APIS_CHATS}/chats/${id}/join`, {}, { withCredentials: true, params: { connectionId } }));
  }

  updateMessage(id: string, messageId: string, content: string): Promise<void> {
    return lastValueFrom(this.http.patch<void>(`${APIS_CHATS}/chats/${id}/${messageId}`, { content }, { withCredentials: true }));
  }

  deleteMessage(id: string, messageId: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${APIS_CHATS}/chats/${id}/${messageId}`, { withCredentials: true }));
  }
}
