import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IPost } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'social-post[post]',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post!: IPost;

  commentsCount = -1;
  currentCommentsPage = -1;
  end = false;

  // Add Comment
  private _opened = false;
  get opened() { return this._opened; }
  set opened(val: boolean) {
    this._opened = val;
    if (val && this.currentCommentsPage == -1) {
      this.currentCommentsPage = 0;
      this.getCommentsPage().then();
    }
  }

  comment = "";
  sendingComment = false;

  constructor(private readonly postService: PostService) { }

  async getCommentsPage() {
    const page = await this.postService.getComments(this.post.id, { pageSize: 5, pageNumber: this.currentCommentsPage });
    this.post.comments.push(...page.items);
    this.commentsCount = page.total;

    if (page.items.length == 0 || this.post.comments.length == page.total) {
      this.end = true;
      return;
    }

    this.currentCommentsPage++;
  }

  items: MenuItem[] = [
    {
      label: "Edit",
      icon: "pi pi-pencil",
      url: "#"
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      url: "#"
    }
  ];

  get createdAtUtc() {
    return (new Date(this.post.createdAtUtc)).toLocaleDateString();
  }

  async addComment() {
    this.sendingComment = true;
    const comment = await this.postService.createComment(this.post.id, this.comment);
    this.post.comments.unshift(comment);
    this.sendingComment = false;
  }
}
