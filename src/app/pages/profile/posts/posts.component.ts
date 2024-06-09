import { Component } from '@angular/core';
import { IPage, IPageRequest } from '../../../interfaces/page.interface';
import { IPost } from '../../../interfaces/post.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'social-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts: IPage<IPost> = { items: [], total: 0 };
  loading = true;
  currentPage = 0;
  end = false;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.activatedRoute.paramMap.subscribe(async (param) => {
      const id = param.get('id');

      const personalProfile = id === 'profile';

      const pageRequest: IPageRequest = { pageNumber: this.currentPage };

      const promise =
        id && !personalProfile
          ? this.postService.getProfilePosts(id, pageRequest)
          : this.postService.getMyProfilePosts(pageRequest);

      const postsPage = await promise;

      if (postsPage.items.length == 0) {
        this.end = true;
        return;
      }

      this.posts.items.push(...postsPage.items);
      this.loading = false;
      this.currentPage++;
    });
  }
}
