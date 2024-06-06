import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';

import { TooltipModule } from 'primeng/tooltip';
import { DataViewModule } from 'primeng/dataview';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FollowedBoxComponent } from './followed-box/followed-box.component';
import { SideboxComponent } from './sidebox/sidebox.component';
import { GroupsBoxComponent } from './groups-box/groups-box.component';
import { ItemShowcaseComponent } from './item-showcase/item-showcase.component';
import { ProfileGridViewComponent } from './profile-grid-view/profile-grid-view.component';
import { ProfileListViewComponent } from './profile-list-view/profile-list-view.component';
import { GroupListViewComponent } from './group-list-view/group-list-view.component';
import { GroupGridViewComponent } from './group-grid-view/group-grid-view.component';
import { PostsViewComponent } from './posts-view/posts-view.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    ProfileHeaderComponent,
    FollowedBoxComponent,
    SideboxComponent,
    GroupsBoxComponent,
    ItemShowcaseComponent,
    ProfileGridViewComponent,
    ProfileListViewComponent,
    GroupListViewComponent,
    GroupGridViewComponent,
    PostsViewComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    UiComponentsModule,
    TooltipModule,
    MenuModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    DataViewModule
  ],
  exports: [
    ProfileHeaderComponent,
    FollowedBoxComponent,
    SideboxComponent,
    GroupsBoxComponent,
    ItemShowcaseComponent,
    ProfileGridViewComponent,
    ProfileListViewComponent,
    GroupListViewComponent,
    GroupGridViewComponent,
    PostsViewComponent
  ],
})
export class SharedComponentsModule { }
