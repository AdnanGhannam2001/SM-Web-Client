import { Component, Input } from '@angular/core';
import { GroupVisibilities, IGroup } from '../../interfaces/group.interface';

@Component({
  selector: 'social-group-list-view[group]',
  templateUrl: './group-list-view.component.html',
  styleUrl: './group-list-view.component.scss'
})
export class GroupListViewComponent {
  @Input() group!: IGroup;

  get color() {
    return this.group.visibility == GroupVisibilities.Public
      ? "var(--green-300)"
      : "var(--red-300)";
  }
}
