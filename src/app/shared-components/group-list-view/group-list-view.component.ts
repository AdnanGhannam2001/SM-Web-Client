import { Component, Input } from '@angular/core';
import { GroupVisibilities, IGroup } from '../../interfaces/group.interface';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'social-group-list-view[group]',
  templateUrl: './group-list-view.component.html',
  styleUrl: './group-list-view.component.scss'
})
export class GroupListViewComponent {
  @Input() group!: IGroup;

  constructor(private readonly groupService: GroupService) { }

  get visibility() {
    return this.groupService.getVisibilities().find(x => Number(x[0]) == this.group.visibility)?.[1].toString();
  }

  get color() {
    return this.group.visibility == GroupVisibilities.Public
      ? "var(--green-300)"
      : "var(--red-300)";
  }
}
