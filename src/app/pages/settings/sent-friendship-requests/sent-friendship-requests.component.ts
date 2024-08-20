import { Component } from '@angular/core';
import { Pagination } from '../../../bases/pagination';
import { IFriendshipRequest } from '../../../interfaces/profile.interface';
import { ProfileService } from '../../../services/profile.service';
import { MessageService } from 'primeng/api';
import { getProfileImage } from '../../../helpers/file-helper';

@Component({
  selector: 'app-sent-friendship-requests',
  templateUrl: './sent-friendship-requests.component.html',
  styleUrl: './sent-friendship-requests.component.scss'
})
export class SentFriendshipRequestsComponent extends Pagination<IFriendshipRequest> {
  constructor(private readonly profileService: ProfileService,
              private readonly messageService: MessageService
  ) { super(); }

  image(id: string) { return getProfileImage(id); }

  override async requestPage() {
    this.page = await this.profileService.getSentRequests(this.pageRequest);
  }

  async ngOnInit() {
    await this.requestPage();
  }

  async cancel(id: string) {
    await this.profileService.cancelRequest(id);
    this.page.items = this.page.items.filter(x => x.receiverId != id);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Requests has been cancelled',
    });
  }
}
