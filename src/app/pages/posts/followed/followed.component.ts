import { Component } from '@angular/core';
import { Pagination } from '../../../helpers/pagination';
import { IPost } from '../../../interfaces/post.interface';
import { PostService } from '../../../services/post.service';
import { LOGIN_REDIRECT_URI } from '../../../constants/apis';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrl: './followed.component.scss'
})
export class FollowedComponent extends Pagination<IPost> {
  loading = true;
  end = false;

  constructor(private readonly postService: PostService) { super(); }

  async ngOnInit() {
    await this.requestPage();
  }

  override async requestPage() {
    try {
      const postPage = await this.postService.getFollowedPosts(this.pageRequest);
      this.loading = false;

      if (postPage.items.length == 0) {
        this.end = true;
        return;
      }

      this.page.items.push(...postPage.items);
      (this.pageRequest.pageNumber!)++;
    } catch (error: any) {
      if (error.url?.startsWith(LOGIN_REDIRECT_URI)) window.location.href = error.url;
    }
  }
}