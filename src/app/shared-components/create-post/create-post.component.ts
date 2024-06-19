import { Component } from '@angular/core';

@Component({
  selector: 'social-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  image;
  visible = false;

  constructor() {
    this.image = localStorage.getItem("image") ?? "";
  }
}
