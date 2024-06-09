import { Component } from '@angular/core';
import { IPage } from '../../interfaces/page.interface';
import { IPost } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { LOGIN_REDIRECT_URI } from '../../constants/apis';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts: IPage<IPost> = { items: [], total: 0 };
  loading = true;
  currentPage = 0;
  end = false;

  constructor(private readonly postService: PostService) {}

  async ngOnInit() {
    await this.getPage();
  }

  async getPage() {
    try {
      const postPage = await this.postService.getPosts({ pageSize: 20, pageNumber: this.currentPage });

      if (postPage.items.length == 0) {
        this.end = true;
        return;
      }

      this.posts.items.push(...(postPage).items);
      this.loading = false;
      this.currentPage++;
    } catch (error: any) {
      if (error.url?.startsWith(LOGIN_REDIRECT_URI)) window.location.href = error.url;
    }
  }
}
