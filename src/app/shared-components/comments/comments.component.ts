import { Component, Input } from '@angular/core';
import { IComment } from '../../interfaces/post.interface';

@Component({
  selector: 'social-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  @Input() comments: Array<IComment> = [];
}
