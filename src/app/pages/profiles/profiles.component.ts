import { Component } from '@angular/core';
import { IPage } from '../../interfaces/page.interface';
import { IProfile } from '../../interfaces/profile.interface';
import { TabMenuItem } from '../../ui-components/tab-menu/tab-menu.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'social-profiles',
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss'
})
export class ProfilesComponent {
  profiles: IPage<IProfile> = { items: [], total: 0 };
  layout: 'list' | 'grid' = "list";
  search = "";

  constructor(private profileService: ProfileService) { }

  async ngOnInit() {
    // TODO Add Page Request
    this.profiles = await this.profileService.getProfiles({ });
  }

  // TODO
  onSearch() { }
}
