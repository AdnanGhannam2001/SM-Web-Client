import { Injectable } from '@angular/core';
import { IPage, IPageRequest } from '../interfaces/page.interface';
import { Gender, IBlock, IFavoriteDiscussion, IFollow, IFriendship, IFriendshipRequest, IProfile, IProfileResponse, IProfileUpdateRequest, ISettings, InformationVisibility } from '../interfaces/profile.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIS_MAIN } from '../constants/apis';
import { lastValueFrom } from 'rxjs';
import { IDiscussion, IGroup, IInvite } from '../interfaces/group.interface';

@Injectable()
export class ProfileService {

  constructor(private readonly http: HttpClient) { }

  getProfiles(pageRequest: IPageRequest): Promise<IPage<IProfile>> {
    return lastValueFrom(this.http.get<IPage<IProfile>>(`${APIS_MAIN}/profiles`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getProfilesNamesByIds(ids: Array<string>): Promise<Array<IProfileResponse>> {
    const headers = new HttpHeaders({ ids });

    return lastValueFrom(this.http.get<Array<IProfileResponse>>(`${APIS_MAIN}/profiles/ids`, { withCredentials: true, headers }));
  }

  getPersonalProfile(): Promise<IProfileResponse> {
    return lastValueFrom(this.http.get<IProfileResponse>(`${APIS_MAIN}/profiles/profile`, { withCredentials: true }));
  }

  updateProfile(profile: IProfileUpdateRequest): Promise<IProfile> {
    return lastValueFrom(this.http.patch<IProfile>(`${APIS_MAIN}/profiles`, profile, { withCredentials: true }));
  }

  removeImage(): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${APIS_MAIN}/profiles/profile/image`, { withCredentials: true }));
  }

  removeCoverImage(): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${APIS_MAIN}/profiles/profile/cover-image`, { withCredentials: true }));
  }

  getProfile(id: string): Promise<IProfileResponse> {
    return lastValueFrom(this.http.get<IProfileResponse>(`${APIS_MAIN}/profiles/${id}`, { withCredentials: true }));
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
    return lastValueFrom(this.http.post<IBlock>(`${APIS_MAIN}/profiles/${id}/block`, { reason }, { withCredentials: true }));
  }

  unblock(id: string): Promise<IBlock> {
    return lastValueFrom(this.http.delete<IBlock>(`${APIS_MAIN}/profiles/${id}/block`, { withCredentials: true }));
  }

  getFollowed(pageRequest: IPageRequest): Promise<IPage<IFollow>> {
    return lastValueFrom(this.http.get<IPage<IFollow>>(`${APIS_MAIN}/profiles/followed`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getFollowing(id: string, pageRequest: IPageRequest): Promise<IPage<IFollow>> {
    return lastValueFrom(this.http.get<IPage<IFollow>>(`${APIS_MAIN}/profiles/${id}/following`, { withCredentials: true, params: { ...pageRequest } }));
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
    return lastValueFrom(this.http.delete<IFriendshipRequest>(`${APIS_MAIN}/profiles/${id}/request`, { withCredentials: true }));
  }

  respond(id: string, accept: boolean): Promise<{}> {
    return lastValueFrom(this.http.post<{}>(`${APIS_MAIN}/profiles/${id}/respond`, {}, { withCredentials: true, params: { accept } }));
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
    return lastValueFrom(this.http.get<IPage<IGroup>>(`${APIS_MAIN}/profiles/profile/groups`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getProfileGroups(id: string, pageRequest: IPageRequest): Promise<IPage<IGroup>> {
    return lastValueFrom(this.http.get<IPage<IGroup>>(`${APIS_MAIN}/${id}/groups`, { withCredentials: true, params: { ...pageRequest } }));
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

  getVisibilities() {
    return Object.entries(InformationVisibility).filter(([_, value]) => isNaN(Number(value)));
  }

  getGenders() {
    return Object.entries(Gender).filter(([_, value]) => isNaN(Number(value)));
  }
}
