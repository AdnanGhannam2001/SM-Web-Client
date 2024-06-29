import { Component, Input } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { ProfileService } from '../../services/profile.service';
import { MessageService } from 'primeng/api';
import { ProfileBaseComponent } from '../../bases/profile-base-component';

@Component({
  selector: 'social-profile-grid-view',
  templateUrl: './profile-grid-view.component.html',
  styleUrl: './profile-grid-view.component.scss'
})
export class ProfileGridViewComponent extends ProfileBaseComponent {
  constructor(
    messageService: MessageService,
    profileService: ProfileService,
    groupService: GroupService
  ) { super(messageService, profileService, groupService); }
}
