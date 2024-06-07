import { Component, Input } from '@angular/core';
import { IGroup } from '../../interfaces/group.interface';

@Component({
  selector: 'social-group-header[group]',
  templateUrl: './group-header.component.html',
  styleUrl: './group-header.component.scss'
})
export class GroupHeaderComponent {
  @Input() group!: IGroup;
}
