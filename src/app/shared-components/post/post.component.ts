import { Component, Input, input } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { IPost } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'social-post[post]',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post!: IPost;
  @Input() hidable = false;
  @Input() updatable = false;
  @Input() deletable = false;
  @Input() hidden = false;

  editing = false;

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

  items: MenuItem[] = [];

  constructor(private readonly postService: PostService,
              private readonly messageService: MessageService
  ) { }

  ngOnInit() {
    if (this.hidable) {
      this.items.push({
        label: 'Hide',
        icon: 'pi pi-eye-slash',
        command: async () => await this.hide()
      });
    }

    if (this.updatable) {
      this.items.push({
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: async () => await this.startUpdating()
      });
    }

    if (this.deletable) {
      this.items.push({
        label: "Delete",
        icon: "pi pi-trash",
        command: async () => await this.delete()
      });
    }
  }

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

  get createdAtUtc() {
    return (new Date(this.post.createdAtUtc)).toLocaleDateString();
  }

  async addComment() {
    this.sendingComment = true;
    const comment = await this.postService.createComment(this.post.id, this.comment);
    this.post.comments.unshift(comment);
    this.sendingComment = false;
  }

  async hide() {
    await this.postService.hide(this.post.id);
    this.hidden = true;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Post is hidden',
    });
  }

  startUpdating() {
    this.editing = true;
  }

  async delete() {
    await this.postService.deletePost(this.post.id);
    this.hidden = true;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Post is deleted',
    });
  }
}
