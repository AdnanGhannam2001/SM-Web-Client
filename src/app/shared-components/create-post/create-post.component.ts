import { Component } from '@angular/core';
import { getProfileImage } from '../../helpers/file-helper';

@Component({
  selector: 'social-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  image;
  visible = false;

  constructor() {
    const id = localStorage.getItem('id');
    const image = localStorage.getItem('image');
    if (id && image === 'true') {
      this.image = getProfileImage(id);
    }
  }
}
