import { Component } from '@angular/core';
import { IBlock } from '../../../interfaces/profile.interface';
import { ProfileService } from '../../../services/profile.service';
import { Pagination } from '../../../bases/pagination';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'social-blocked-list',
  templateUrl: './blocked-list.component.html',
  styleUrl: './blocked-list.component.scss'
})
export class BlockedListComponent extends Pagination<IBlock> {
  constructor(private readonly profileService: ProfileService,
              private readonly messageService: MessageService
  ) { super(); }

  override async requestPage() {
    this.page = await this.profileService.getBlocked(this.pageRequest);
  }

  async ngOnInit() {
    await this.requestPage();
  }

  async unblock(id: string) {
    await this.profileService.unblock(id);
    this.page.items = this.page.items.filter(x => x.blockedId != id);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'User was removed from the blocked list',
    });
  }
}
