import { Component } from '@angular/core';
import { Pagination } from '../../../bases/pagination';
import { IPost } from '../../../interfaces/post.interface';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent extends Pagination<IPost> {
  loading = true;
  end = false;

  constructor(private readonly postService: PostService) { super(); }

  async ngOnInit() {
    await this.requestPage();
  }

  override async requestPage() {
    const postPage = await this.postService.getFriendsPosts(this.pageRequest);
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
