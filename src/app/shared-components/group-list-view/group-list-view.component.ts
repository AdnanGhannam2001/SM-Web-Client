import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GroupService } from '../../services/group.service';
import { GroupBaseComponent } from '../../bases/group-base-component';

@Component({
  selector: 'social-group-list-view[group]',
  templateUrl: './group-list-view.component.html',
  styleUrl: './group-list-view.component.scss'
})
export class GroupListViewComponent extends GroupBaseComponent {
  constructor(groupService: GroupService,
              router: Router,
              messageService: MessageService
  ) { super(groupService, router, messageService); }
}
