import { Component, Input } from '@angular/core';
import { IGroup } from '../../interfaces/group.interface';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'social-group-grid-view[group]',
  templateUrl: './group-grid-view.component.html',
  styleUrl: './group-grid-view.component.scss'
})
export class GroupGridViewComponent {
  @Input() group!: IGroup;

  constructor(private readonly groupService: GroupService) { }

  get visibility() {
    return this.groupService.getVisibilities().find(x => Number(x[0]) == this.group.visibility)?.[1];
  }
}
