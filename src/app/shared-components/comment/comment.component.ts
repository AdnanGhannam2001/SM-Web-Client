import { Component, Input } from '@angular/core';
import { IComment } from '../../interfaces/post.interface';
import { MenuItem } from 'primeng/api';
import { PostService } from '../../services/post.service';
import { getProfileImage } from '../../helpers/file-helper';

@Component({
  selector: 'social-comment[comment]',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment!: IComment;
  @Input() deletable = false;
  updatable = false;

  sending = false;
  content = "";
  items: MenuItem[] = [];
  editing: boolean = false;
  deleted = false;

  image(id: string) { return getProfileImage(id); }

  constructor(private readonly postService: PostService) { }

  ngOnInit() {
    const id = localStorage.getItem('id');
    if (this.comment.profileId == id) {
      this.items.push({
        label: 'Update',
        icon: 'pi pi-trash',
        command: () => this.startEditing(),
      });
    }

    if (this.deletable || this.comment.profileId == id) {
      this.items.push({
        label: 'Delete',
        icon: 'pi pi-pencil',
      });
    }
  }

  startEditing() {
    this.editing = true;
    this.content = this.comment.content;
  }

  async update() {
    this.sending = true;

    this.comment = await this.postService.updateComment((this.comment.postId ?? this.comment.parentId)!, this.comment.id, this.comment.content);

    this.editing = false;
    this.sending = false;
  }

  async delete() {
    await this.postService.deleteComment(this.comment.postId!, this.comment.id, this.comment.parentId!);
    this.deleted = true;
  }
}
