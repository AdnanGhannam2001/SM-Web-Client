import { Component } from '@angular/core';
import { Pagination } from '../../../helpers/pagination';
import { IPost } from '../../../interfaces/post.interface';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-hidden',
  templateUrl: './hidden.component.html',
  styleUrl: './hidden.component.scss'
})
export class HiddenComponent extends Pagination<IPost> {
  loading = true;
  end = false;

  constructor(private readonly postService: PostService) { super(); }

  async ngOnInit() {
    await this.requestPage();
  }

  override async requestPage() {
    const postPage = await this.postService.getHiddenPosts(this.pageRequest);
    this.loading = false;

    if (postPage.items.length == 0) {
      this.end = true;
      return;
    }

    this.page.items.push(...postPage.items);
    (this.pageRequest.pageNumber!)++;

    if (postPage.items.length < this.pageRequest.pageSize!) {
      this.end = true;
    }
  }
}

