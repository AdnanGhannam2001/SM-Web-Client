import { Component } from '@angular/core';
import { IPage, IPageRequest } from '../../../interfaces/page.interface';
import { IPost } from '../../../interfaces/post.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { Pagination } from '../../../bases/pagination';

@Component({
  selector: 'social-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent extends Pagination<IPost> {
  loading = true;
  end     = false;
  id : string | null = null;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute)
  {
    super();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (param) => {
      this.id = param.get('id');

      await this.requestPage();
    });
  }

  override async requestPage() {
      const promise = this.id && this.id === 'profile'
          ? this.postService.getMyProfilePosts(this.pageRequest)
          : this.postService.getProfilePosts(this.id!, this.pageRequest);

      const postsPage = await promise;

      if (postsPage.items.length == 0) {
        this.end = true;
        return;
      }

      this.page.items.push(...postsPage.items);
      this.loading = false;
      (this.pageRequest.pageNumber!)++;

      if (postsPage.items.length < this.pageRequest.pageSize!) {
        this.end = true;
      }
  }
}
