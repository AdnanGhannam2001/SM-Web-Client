import { Component } from '@angular/core';
import { IPage } from '../../../interfaces/page.interface';
import { IPost } from '../../../interfaces/post.interface';

@Component({
  selector: 'social-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  posts: IPage<IPost> = { items: [], total: 0 };
  loading = true;

  async ngOnInit() {
    // TODO: Fetch posts
  }
}
