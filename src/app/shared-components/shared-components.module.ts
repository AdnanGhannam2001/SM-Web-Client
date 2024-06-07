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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
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
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListItemComponent } from './list-item/list-item.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { GroupHeaderComponent } from './group-header/group-header.component';

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
    NavbarComponent,
    SidebarComponent,
    ListItemComponent,
    PageTitleComponent,
    GroupHeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiComponentsModule,
    TooltipModule,
    MenuModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    DataViewModule,
    OverlayPanelModule,
    DividerModule,
    InputTextModule,
    BadgeModule
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
    PostsViewComponent,
    PostComponent,
    NavbarComponent,
    SidebarComponent,
    ListItemComponent,
    PageTitleComponent,
    GroupHeaderComponent
  ],
})
export class SharedComponentsModule { }
