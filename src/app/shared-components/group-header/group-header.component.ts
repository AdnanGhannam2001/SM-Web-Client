import { Component, Input } from '@angular/core';
import { GroupVisibilities, IGroup } from '../../interfaces/group.interface';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'social-group-header[group]',
  templateUrl: './group-header.component.html',
  styleUrl: './group-header.component.scss'
})
export class GroupHeaderComponent {
  @Input() group!: IGroup;
  visibility?: any;

  constructor(private readonly groupService: GroupService) {
  }

  ngOnInit() {
    this.visibility = this.groupService.getVisibilities().find(x => Number(x[0]) == this.group.visibility)?.[1];
  }
}
