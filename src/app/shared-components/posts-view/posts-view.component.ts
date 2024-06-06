import { Component, Input } from '@angular/core';
import { IPost } from '../../interfaces/post.interface';
import { IPage } from '../../interfaces/page.interface';

@Component({
  selector: 'social-posts-view[posts]',
  templateUrl: './posts-view.component.html',
  styleUrl: './posts-view.component.scss'
})
export class PostsViewComponent {
  @Input() posts!: IPage<IPost>;
  @Input() loading: boolean = true;
}
