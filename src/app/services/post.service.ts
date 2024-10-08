import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPage, IPageRequest } from '../interfaces/page.interface';
import { IComment, IPost, IPostRequest, IReaction, PostVisibilities, ReactionType } from '../interfaces/post.interface';
import { APIS_MAIN } from '../constants/apis';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PostService {

  constructor(private readonly http: HttpClient) { }

  getFollowedPosts(pageRequest: IPageRequest): Promise<IPage<IPost>> {
    return lastValueFrom(this.http.get<IPage<IPost>>(`${APIS_MAIN}/posts`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getFriendsPosts(pageRequest: IPageRequest): Promise<IPage<IPost>> {
    return lastValueFrom(this.http.get<IPage<IPost>>(`${APIS_MAIN}/posts/friends`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getFavoritePosts(pageRequest: IPageRequest): Promise<IPage<IPost>> {
    return lastValueFrom(this.http.get<IPage<IPost>>(`${APIS_MAIN}/posts/favorites`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getMyProfilePosts(pageRequest: IPageRequest): Promise<IPage<IPost>> {
    return lastValueFrom(this.http.get<IPage<IPost>>(`${APIS_MAIN}/posts/profile`, { withCredentials: true, params: { ...pageRequest } }));
  }

  getProfilePosts(id: string, pageRequest: IPageRequest): Promise<IPage<IPost>> {
    return lastValueFrom(this.http.get<IPage<IPost>>(`${APIS_MAIN}/posts/${id}`, { withCredentials: true, params: { ...pageRequest } }));
  }

  createPost(post: IPostRequest, file?: File): Promise<IPost> {
    const form = new FormData();
    form.append("content", post.content);
    form.append("visibility", post.visibility.toString());
    if (file) {
      form.append("file", file);
    }

    return lastValueFrom(this.http.post<IPost>(`${APIS_MAIN}/posts`, form, { withCredentials: true }));
  }

  updatePost(id: string, post: IPostRequest, file?: File): Promise<IPost> {
    const form = new FormData();
    form.append("content", post.content);
    form.append("visibility", post.visibility?.toString());
    if (file) {
      form.append("file", file);
    }

    return lastValueFrom(this.http.patch<IPost>(`${APIS_MAIN}/posts/${id}`, form, { withCredentials: true }));
  }

  deletePost(id: string): Promise<IPost> {
    return lastValueFrom(this.http.delete<IPost>(`${APIS_MAIN}/posts/${id}`, { withCredentials: true }));
  }

  createComment(postId: string, content: string, parentId?: string): Promise<IComment> {
    const headers = new HttpHeaders();

    headers.append("Content-Type", "application/json");

    return lastValueFrom(
      this.http.post<IComment>(`${APIS_MAIN}/posts/${postId}`,
        { content },
        { headers, withCredentials: true, params: { ...(parentId ? { parentId }: {}) } }
      )
    );
  }

  getHiddenPosts(pageRequest: IPageRequest): Promise<IPage<IPost>> {
    return lastValueFrom(this.http.get<IPage<IPost>>(`${APIS_MAIN}/posts/hidden`, { withCredentials: true, params: { ...pageRequest } }));
  }

  hide(id: string): Promise<IPost> {
    return lastValueFrom(this.http.post<IPost>(`${APIS_MAIN}/posts/${id}/hide`, {}, { withCredentials: true }));
  }

  unhide(id: string): Promise<IPost> {
    return lastValueFrom(this.http.delete<IPost>(`${APIS_MAIN}/posts/${id}/hide`, { withCredentials: true }));
  }

  getReactions(id: string, pageRequest: IPageRequest): Promise<IPage<IReaction>> {
    return lastValueFrom(this.http.get<IPage<IReaction>>(`${APIS_MAIN}/posts/${id}/reactions`, { withCredentials: true, params: { ...pageRequest } }));
  }

  react(id: string, type: ReactionType): Promise<IReaction> {
    return lastValueFrom(this.http.post<IReaction>(`${APIS_MAIN}/posts/${id}/react`, {}, { withCredentials: true, params: { type } }));
  }

  unreact(id: string): Promise<IReaction> {
    return lastValueFrom(this.http.delete<IReaction>(`${APIS_MAIN}/posts/${id}/react`, { withCredentials: true }));
  }

  getComments(id: string, pageRequest: IPageRequest, parentId?: string): Promise<IPage<IComment>> {
    return lastValueFrom(
      this.http.get<IPage<IComment>>(`${APIS_MAIN}/posts/${id}/comments`,
        {
          withCredentials: true,
          params: {
            ...pageRequest,
            ...(parentId ? { parentId }: {})
          }
        }
      )
    );
  }

  updateComment(postId: string, commentId: string, content: string) : Promise<IComment> {
    return lastValueFrom(
      this.http.patch<IComment>(`${APIS_MAIN}/posts/${postId}/comments/${commentId}`,
        { content },
        { withCredentials: true }
      )
    );
  }

  deleteComment(postId: string, commentId: string, parentId?: string): Promise<IComment> {
    return lastValueFrom(
      this.http.delete<IComment>(`${APIS_MAIN}/posts/${postId}/comments/${commentId}`,
        { withCredentials: true, params: { ...(parentId ? { parentId }: {}) } }
      )
    );
  }

  getVisibilities() {
    return Object.entries(PostVisibilities).filter(([_, value]) => isNaN(Number(value)));
  }
}
