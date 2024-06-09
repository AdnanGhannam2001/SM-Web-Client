import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPage, IPageRequest } from '../interfaces/page.interface';
import { IComment, IPost, IPostRequest, IReaction, ReactionType } from '../interfaces/post.interface';
import { APIS_MAIN } from '../constants/apis';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PostService {

  constructor(private readonly http: HttpClient) { }

  getPosts(pageRequest: IPageRequest): Promise<IPage<IPost>> {
    return lastValueFrom(this.http.get<IPage<IPost>>(`${APIS_MAIN}/posts`, { withCredentials: true, params: { ...pageRequest } }));
  }

  createPost(post: IPostRequest): Promise<IPost> {
    return lastValueFrom(this.http.post<IPost>(`${APIS_MAIN}/posts`, post, { withCredentials: true }));
  }

  updatePost(id: string, post: IPost): Promise<IPost> {
    return lastValueFrom(this.http.patch<IPost>(`${APIS_MAIN}/posts/${id}`, post, { withCredentials: true }));
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

  getHidden(pageRequest: IPageRequest): Promise<IPage<IPost>> {
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

  deleteComment(postId: string, commentId: string, parentId?: string): Promise<IComment> {
    return lastValueFrom(
      this.http.delete<IComment>(`${APIS_MAIN}/posts/${postId}/comments/${commentId}`,
        { withCredentials: true, params: { ...(parentId ? { parentId }: {}) } }
      )
    );
  }
}
