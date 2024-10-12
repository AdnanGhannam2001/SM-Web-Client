import { Component, Input, input } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { IPost, ReactionType } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { getMedia, getProfileImage } from '../../helpers/file-helper';

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
  @Input() hiddenPost = false;
  @Input() shouldHide = true;

  reactionsVisible = false;
  editing = false;

  reactionsCount = 0;
  currentReactionsPage = 0;
  reactionsEnd = false;

  commentsCount = -1;
  currentCommentsPage = -1;
  commentsEnd = false;

  // Add Comment
  comment = "";
  sendingComment = false;

  private _opened = false;
  get opened() { return this._opened; }
  set opened(val: boolean) {
    this._opened = val;
    if (val && this.currentCommentsPage == -1) {
      this.currentCommentsPage = 0;
      this.getCommentsPage().then();
    }
  }

  items: MenuItem[] = [];

  personalImage() { return getProfileImage(localStorage.getItem('id')!); }
  profileImage(id: string) { return getProfileImage(id); }
  image(id: string) { return getMedia(id); }

  constructor(private readonly postService: PostService,
              private readonly messageService: MessageService
  ) { }

  ngOnInit() {
    this.items.push({
      label: 'Show Reactions',
      icon: 'pi pi-thumbs-up',
      command: async () => { await this.getReactionsPage(); this.reactionsVisible = true; }
    });

    if (this.hidable) {
      if (!this.hiddenPost) {
        this.items.push({
          label: 'Hide',
          icon: 'pi pi-eye-slash',
          command: async () => await this.hide()
        });
      }
      else {
        this.items.push({
          label: 'Unhide',
          icon: 'pi pi-eye',
          command: async () => await this.unhide()
        });
      }
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
      this.commentsEnd = true;
      return;
    }

    this.currentCommentsPage++;
  }

  async getReactionsPage() {
    const page = await this.postService.getReactions(this.post.id, { pageSize: 5, pageNumber: this.currentReactionsPage });
    this.post.reactions.push(...page.items);
    this.reactionsCount = page.total;

    if (page.items.length == 0 || this.post.reactions.length == page.total) {
      this.reactionsEnd = true;
      return;
    }

    this.currentReactionsPage++;
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
    this.hiddenPost = true;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Post is hidden',
    });
  }

  async unhide() {
    await this.postService.unhide(this.post.id);
    this.hiddenPost = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Post is not hidden any more',
    });
  }

  startUpdating() {
    this.editing = true;
  }

  async delete() {
    await this.postService.deletePost(this.post.id);
    this.hiddenPost = true;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Post is deleted',
    });
  }

  async react(type: ReactionType) {
    if (this.post.reactions.length == 0 || this.post.reactions[0].type != type) {
      this.post.reactions[0] = await this.postService.react(this.post.id, type);
    } else {
      await this.postService.unreact(this.post.id);
      this.post.reactions.pop();
    }
  }
}
