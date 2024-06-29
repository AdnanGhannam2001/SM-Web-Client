import { Component } from '@angular/core';
import { IProfile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { Pagination } from '../../bases/pagination';

@Component({
  selector: 'social-profiles',
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss'
})
export class ProfilesComponent extends Pagination<IProfile> {
  layout: 'list' | 'grid' = "list";
  loading = true;

  constructor(private profileService: ProfileService) { super(); }

  override async requestPage() {
    this.page = await this.profileService.getProfiles(this.pageRequest);
  }

  async ngOnInit() {
    await this.requestPage();
    this.loading = false;
  }

  async onSearch() {
    await this.requestPage();
  }
}
