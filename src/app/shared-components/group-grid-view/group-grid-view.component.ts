import { Component, Input } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GroupBaseComponent } from '../../bases/group-base-component';

@Component({
  selector: 'social-group-grid-view[group]',
  templateUrl: './group-grid-view.component.html',
  styleUrl: './group-grid-view.component.scss'
})
export class GroupGridViewComponent extends GroupBaseComponent {
  constructor(groupService: GroupService,
              router: Router,
              messageService: MessageService
  ) { super(groupService, router, messageService); }
}

