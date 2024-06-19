import { Component } from '@angular/core';
import { TabMenuItem } from '../../ui-components/tab-menu/tab-menu.component';

@Component({
  selector: 'social-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  tabs: TabMenuItem[] = [
    {
      text: "Followed",
      url: "/"
    },
    {
      text: "Friends",
      url: "friends-posts"
    },
    {
      text: "Saved",
      url: "saved-posts"
    },
    {
      text: "Hidden",
      url: "hidden-posts"
    },
  ];
}
