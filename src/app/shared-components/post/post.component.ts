import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IPost } from '../../interfaces/post.interface';

@Component({
  selector: 'social-post[post]',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post!: IPost;

  // Add Comment
  opened = false;
  comment = "";

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
}
