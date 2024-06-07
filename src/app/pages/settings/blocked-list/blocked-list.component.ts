import { Component } from '@angular/core';
import { IBlock } from '../../../interfaces/profile.interface';
import { IPage } from '../../../interfaces/page.interface';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'social-blocked-list',
  templateUrl: './blocked-list.component.html',
  styleUrl: './blocked-list.component.scss'
})
export class BlockedListComponent {
  blocked: IPage<IBlock> = { items: [], total: 0 };

  constructor(private readonly profileService: ProfileService) { }

  async ngOnInit() {
    // TODO add page request
    this.blocked = await this.profileService.getBlocked({ });
  }
}
