import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';

import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { FollowedBoxComponent } from './followed-box/followed-box.component';
import { SideboxComponent } from './sidebox/sidebox.component';
import { GroupsBoxComponent } from './groups-box/groups-box.component';
import { ItemShowcaseComponent } from './item-showcase/item-showcase.component';

@NgModule({
  declarations: [
    ProfileHeaderComponent,
    FollowedBoxComponent,
    SideboxComponent,
    GroupsBoxComponent,
    ItemShowcaseComponent,
  ],
  imports: [
    CommonModule,
    UiComponentsModule,
    TooltipModule,
    MenuModule,
    AvatarModule
  ],
  exports: [
    ProfileHeaderComponent,
    FollowedBoxComponent,
    SideboxComponent,
    GroupsBoxComponent,
    ItemShowcaseComponent,
  ],
})
export class SharedComponentsModule { }
