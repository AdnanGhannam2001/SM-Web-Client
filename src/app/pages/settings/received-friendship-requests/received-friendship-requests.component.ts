import { Component } from '@angular/core';
import { Pagination } from '../../../bases/pagination';
import { IFriendshipRequest } from '../../../interfaces/profile.interface';
import { ProfileService } from '../../../services/profile.service';
import { MenuItem, MessageService } from 'primeng/api';
import { getProfileImage } from '../../../helpers/file-helper';

@Component({
  selector: 'app-received-friendship-requests',
  templateUrl: './received-friendship-requests.component.html',
  styleUrl: './received-friendship-requests.component.scss'
})
export class ReceivedFriendshipRequestsComponent extends Pagination<IFriendshipRequest> {
  constructor(private readonly profileService: ProfileService,
              private readonly messageService: MessageService
  ) { super(); }

  image(id: string) { return getProfileImage(id); }

  override async requestPage() {
    this.page = await this.profileService.getReceivedRequests(this.pageRequest);
  }

  async ngOnInit() {
    await this.requestPage();
  }

  async respond(id: string, accept: boolean) {
    await this.profileService.respond(id, accept);
    this.page.items = this.page.items.filter(x => x.senderId != id);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
    });
  }
}
