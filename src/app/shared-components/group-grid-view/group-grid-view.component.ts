import { Component, Input } from '@angular/core';
import { IGroup } from '../../interfaces/group.interface';

@Component({
  selector: 'social-group-grid-view[group]',
  templateUrl: './group-grid-view.component.html',
  styleUrl: './group-grid-view.component.scss'
})
export class GroupGridViewComponent {
  @Input() group!: IGroup;
}
