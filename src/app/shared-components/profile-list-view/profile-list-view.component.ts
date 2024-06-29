import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProfileService } from '../../services/profile.service';
import { GroupService } from '../../services/group.service';
import { ProfileBaseComponent } from '../../bases/profile-base-component';

@Component({
  selector: 'social-profile-list-view[profile]',
  templateUrl: './profile-list-view.component.html',
  styleUrl: './profile-list-view.component.scss',
})
export class ProfileListViewComponent extends ProfileBaseComponent {
  constructor(
    messageService: MessageService,
    profileService: ProfileService,
    groupService: GroupService
  ) { super(messageService, profileService, groupService); }
}
