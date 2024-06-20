import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupVisibilities, IDiscussion, IGroup, IGroupSettings, IInvite, IJoinRequest, IKicked, IMember, MemberRoleType } from '../interfaces/group.interface';
import { lastValueFrom } from 'rxjs';
import { APIS_MAIN } from '../constants/apis';
import { IPage, IPageRequest } from '../interfaces/page.interface';
import { IPost } from '../interfaces/post.interface';

@Injectable()
export class GroupService {

  constructor(private readonly http: HttpClient) { }

  createGroup(group: IGroup): Promise<IGroup> {
    return lastValueFrom(this.http.post<IGroup>(`${APIS_MAIN}/groups`, group, { withCredentials: true }));
  }

  getGroups(pageRequest: IPageRequest): Promise<IPage<IGroup>> {
    return lastValueFrom(this.http.get<IPage<IGroup>>(`${APIS_MAIN}/groups`, { withCredentials: true, params: { ...pageRequest } }));
  }

  updateGroup(id: string, group: IGroup): Promise<IGroup> {
    return lastValueFrom(this.http.patch<IGroup>(`${APIS_MAIN}/groups/${id}`, group, { withCredentials: true }));
  }

  deleteGroup(id: string): Promise<IGroup> {
    return lastValueFrom(this.http.delete<IGroup>(`${APIS_MAIN}/groups/${id}`, { withCredentials: true }));
  }

  getGroup(id: string): Promise<IGroup> {
    return lastValueFrom(this.http.get<IGroup>(`${APIS_MAIN}/groups/${id}`, { withCredentials: true }));
  }

  updateGroupSettings(id: string, settings: IGroupSettings): Promise<IGroupSettings> {
    return lastValueFrom(this.http.patch<IGroupSettings>(`${APIS_MAIN}/groups/${id}/settings`, settings, { withCredentials: true }));
  }

  getGroupPosts(id: string, pageRequest: IPageRequest) : Promise<IPage<IPost>> {
    return lastValueFrom(this.http.get<IPage<IPost>>(`${APIS_MAIN}/groups/${id}/posts`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getMembers(id: string, pageRequest: IPageRequest): Promise<IPage<IMember>> {
    return lastValueFrom(this.http.get<IPage<IMember>>(`${APIS_MAIN}/groups/${id}/members`, { withCredentials: true, params: { ...pageRequest } }));
  }

  sendJoinRequest(id: string, content: string): Promise<IJoinRequest> {
    return lastValueFrom(this.http.post<IJoinRequest>(`${APIS_MAIN}/groups/${id}/request`, { content }, { withCredentials: true }));
  }

  cancelJoinRequest(id: string): Promise<IJoinRequest> {
    return lastValueFrom(this.http.delete<IJoinRequest>(`${APIS_MAIN}/groups/${id}/request`, { withCredentials: true }));
  }

  getRequests(id: string, pageRequest: IPageRequest): Promise<IPage<IJoinRequest>> {
    return lastValueFrom(this.http.get<IPage<IJoinRequest>>(`${APIS_MAIN}/groups/${id}/requests`, { withCredentials: true, params: { ...pageRequest } }));
  }

  respondToRequest(id: string, requesterId: string, accept: boolean): Promise<{}> {
    return lastValueFrom(
      this.http.patch<IJoinRequest>(`${APIS_MAIN}/groups/${id}/requests/${requesterId}`,
        {},
        { withCredentials: true, params: { accept } },
      )
    );
  }

  sendInvite(id: string, profileId: string, message: string): Promise<IInvite> {
    return lastValueFrom(this.http.post<IInvite>(`${APIS_MAIN}/groups/${id}/invite/${profileId}`, message, { withCredentials: true }));
  }

  respondToInvite(id: string, senderId: string, accept: boolean): Promise<IInvite> {
    return lastValueFrom(this.http.patch<IInvite>(`${APIS_MAIN}/groups/${id}/invites/${senderId}`, {}, { withCredentials: true, params: { accept } }));
  }

  getKicked(id: string, pageRequest: IPageRequest): Promise<IPage<IKicked>> {
    return lastValueFrom(this.http.get<IPage<IKicked>>(`${APIS_MAIN}/groups/${id}/kicked`, { withCredentials: true, params: { ...pageRequest } }));
  }

  kick(id: string, memberId: string, reason: string): Promise<IMember> {
    const headers = new HttpHeaders();
    headers.append("reason", reason);

    return lastValueFrom(this.http.delete<IMember>(`${APIS_MAIN}/groups/${id}/kick/${memberId}`, { headers, withCredentials: true }));
  }

  leave(id: string): Promise<{}> {
    return lastValueFrom(this.http.delete<IMember>(`${APIS_MAIN}/groups/${id}/leave`, { withCredentials: true }));
  }

  removeMember(id: string, memberId: string): Promise<IMember> {
    return lastValueFrom(this.http.delete<IMember>(`${APIS_MAIN}/groups/${id}/remove/${memberId}`, { withCredentials: true }));
  }

  changeRole(id: string, memberId: string, role: MemberRoleType): Promise<IMember> {
    return lastValueFrom(this.http.patch<IMember>(`${APIS_MAIN}/groups/${id}/change-role/${memberId}`, {}, { withCredentials: true, params: { role }}));
  }

  getDiscussions(id: string, pageRequest: IPageRequest): Promise<IPage<IDiscussion>> {
    return lastValueFrom(this.http.get<IPage<IDiscussion>>(`${APIS_MAIN}/groups/${id}/discussions`, { withCredentials: true, params: { ...pageRequest } }));
  }

  createDiscussions(id: string, discussion: IDiscussion): Promise<IDiscussion> {
    return lastValueFrom(this.http.post<IDiscussion>(`${APIS_MAIN}/groups/${id}/discussions`, {discussion}, { withCredentials: true }));
  }

  getDiscussion(id: string, discussionId: string): Promise<IDiscussion> {
    return lastValueFrom(this.http.get<IDiscussion>(`${APIS_MAIN}/groups/${id}/discussions/${discussionId}`, { withCredentials: true }));
  }

  updateDiscussion(id: string, discussionId: string, discussion: IDiscussion): Promise<IDiscussion> {
    return lastValueFrom(this.http.patch<IDiscussion>(`${APIS_MAIN}/groups/${id}/discussions/${discussionId}`, discussion, { withCredentials: true }));
  }

  deleteDiscussion(id: string, discussionId: string): Promise<IDiscussion> {
    return lastValueFrom(this.http.delete<IDiscussion>(`${APIS_MAIN}/groups/${id}/discussions/${discussionId}`, { withCredentials: true }));
  }

  getVisibilities() {
    return Object.entries(GroupVisibilities).filter(([_, value]) => isNaN(Number(value)));
  }

  getRoles() {
    return Object.entries(MemberRoleType).filter(([_, value]) => isNaN(Number(value)));
  }
}
