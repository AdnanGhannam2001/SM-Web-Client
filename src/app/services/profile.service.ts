import { Injectable } from '@angular/core';
import { IPage, IPageRequest } from '../interfaces/page.interface';
import { IBlock, IFavoriteDiscussion, IFollow, IFriendship, IFriendshipRequest, IProfile, ISettings } from '../interfaces/profile.interface';
import { HttpClient } from '@angular/common/http';
import { APIS_MAIN } from '../constants/apis';
import { lastValueFrom } from 'rxjs';
import { IDiscussion, IGroup, IInvite } from '../interfaces/group.interface';

@Injectable()
export class ProfileService {

  constructor(private readonly http: HttpClient) { }

  getProfiles(pageRequest: IPageRequest): Promise<IPage<IProfile>> {
    return lastValueFrom(this.http.get<IPage<IProfile>>(`${APIS_MAIN}/profiles`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getPersonalProfile(): Promise<IProfile> {
    return lastValueFrom(this.http.get<IProfile>(`${APIS_MAIN}/profiles/profile`, { withCredentials: true }));
  }

  updateProfile(profile: IProfile): Promise<IProfile> {
    return lastValueFrom(this.http.patch<IProfile>(`${APIS_MAIN}/profiles/profile`, profile, { withCredentials: true }));
  }

  getProfile(id: string): Promise<IProfile> {
    return lastValueFrom(this.http.get<IProfile>(`${APIS_MAIN}/profiles/${id}`, { withCredentials: true }));
  }

  getSettings(): Promise<ISettings> {
    return lastValueFrom(this.http.get<ISettings>(`${APIS_MAIN}/profiles/settings`, { withCredentials: true }));
  }

  updateSettings(settings: ISettings): Promise<ISettings> {
    return lastValueFrom(this.http.patch<ISettings>(`${APIS_MAIN}/profiles/settings`, settings, { withCredentials: true }));
  }

  getBlocked(pageRequest: IPageRequest): Promise<IPage<IBlock>> {
    return lastValueFrom(this.http.get<IPage<IBlock>>(`${APIS_MAIN}/profiles/blocked`, { withCredentials: true, params: { ...pageRequest } }));
  }

  block(id: string, reason?: string): Promise<IBlock> {
    return lastValueFrom(this.http.post<IBlock>(`${APIS_MAIN}/profiles/${id}/block`, reason, { withCredentials: true }));
  }

  unblock(id: string): Promise<IBlock> {
    return lastValueFrom(this.http.delete<IBlock>(`${APIS_MAIN}/profiles/${id}/block`, { withCredentials: true }));
  }

  getFollowed(pageRequest: IPageRequest): Promise<IPage<IFollow>> {
    return lastValueFrom(this.http.get<IPage<IFollow>>(`${APIS_MAIN}/profiles/followed`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getFollowing(pageRequest: IPageRequest): Promise<IPage<IFollow>> {
    return lastValueFrom(this.http.get<IPage<IFollow>>(`${APIS_MAIN}/profiles/following`, { withCredentials: true, params: { ...pageRequest } }));
  }

  follow(id: string): Promise<IFollow> {
    return lastValueFrom(this.http.post<IFollow>(`${APIS_MAIN}/profiles/${id}/follow`, {}, { withCredentials: true }));
  }

  unfollow(id: string): Promise<IFollow> {
    return lastValueFrom(this.http.delete<IFollow>(`${APIS_MAIN}/profiles/${id}/follow`, { withCredentials: true }));
  }

  getSentRequests(pageRequest: IPageRequest): Promise<IPage<IFriendshipRequest>> {
    return lastValueFrom(this.http.get<IPage<IFriendshipRequest>>(`${APIS_MAIN}/profiles/sent`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getReceivedRequests(pageRequest: IPageRequest): Promise<IPage<IFriendshipRequest>> {
    return lastValueFrom(this.http.get<IPage<IFriendshipRequest>>(`${APIS_MAIN}/profiles/received`, { withCredentials: true, params: { ...pageRequest } }));
  }

  sendRequest(id: string): Promise<IFriendshipRequest> {
    return lastValueFrom(this.http.post<IFriendshipRequest>(`${APIS_MAIN}/profiles/${id}/request`, {}, { withCredentials: true }));
  }

  cancelRequest(id: string): Promise<IFriendshipRequest> {
    return lastValueFrom(this.http.delete<IFriendshipRequest>(`${APIS_MAIN}/profile/${id}/request`, { withCredentials: true }));
  }

  respond(id: string, accept: boolean): Promise<{}> {
    return lastValueFrom(this.http.delete<{}>(`${APIS_MAIN}/profile/${id}/respond`, { withCredentials: true, params: { accept } }));
  }

  getFriends(pageRequest: IPageRequest): Promise<IPage<IFriendship>> {
    return lastValueFrom(this.http.get<IPage<IFriendship>>(`${APIS_MAIN}/profiles/friends`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getProfileFriends(id: string, pageRequest: IPageRequest): Promise<IPage<IFriendship>> {
    return lastValueFrom(this.http.get<IPage<IFriendship>>(`${APIS_MAIN}/profiles/${id}/friends`, { withCredentials: true, params: { ...pageRequest } }));
  }

  cancelFriendship(id: string): Promise<IFriendship> {
    return lastValueFrom(this.http.delete<IFriendship>(`${APIS_MAIN}/profiles/${id}/remove`, { withCredentials: true }));
  }

  getPersonalGroups(pageRequest: IPageRequest): Promise<IPage<IGroup>> {
    return lastValueFrom(this.http.get<IPage<IGroup>>(`${APIS_MAIN}/profiles/groups`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getReceivedInvites(pageRequest: IPageRequest): Promise<IPage<IInvite>> {
    return lastValueFrom(this.http.get<IPage<IInvite>>(`${APIS_MAIN}/profiles/invites`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getFavoriteDiscussions(pageRequest: IPageRequest): Promise<IPage<IDiscussion>> {
    return lastValueFrom(this.http.get<IPage<IDiscussion>>(`${APIS_MAIN}/profiles/favorite-discussions`, { withCredentials: true, params: { ...pageRequest } }));
  }

  addToFavoriteDiscussions(id: string, discussionsId: string): Promise<IFavoriteDiscussion> {
    return lastValueFrom(this.http.post<IFavoriteDiscussion>(`${APIS_MAIN}/profiles/favorite-discussions/${id}/${discussionsId}`, {}, { withCredentials: true }));
  }

  deleteFromFavoriteDiscussions(discussionsId: string): Promise<IFavoriteDiscussion> {
    return lastValueFrom(this.http.delete<IFavoriteDiscussion>(`${APIS_MAIN}/profiles/favorite-discussions/${discussionsId}`, { withCredentials: true }));
  }
}