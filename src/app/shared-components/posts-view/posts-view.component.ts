import { Component, Input } from '@angular/core';
import { IPost } from '../../interfaces/post.interface';
import { IPage } from '../../interfaces/page.interface';
import { MemberRoleType } from '../../interfaces/group.interface';

@Component({
  selector: 'social-posts-view[posts]',
  templateUrl: './posts-view.component.html',
  styleUrl: './posts-view.component.scss'
})
export class PostsViewComponent {
  @Input() posts!: IPage<IPost>;
  @Input() loading: boolean = true;
  @Input() role?: MemberRoleType;
  @Input() hidable = false;

  isUpdatable(profileId: string) {
    return profileId == localStorage.getItem("id");
  }

  isDeletable(profileId: string) {
    return (this.role && this.role != MemberRoleType.Normal) || profileId == localStorage.getItem("id");
  }
}
