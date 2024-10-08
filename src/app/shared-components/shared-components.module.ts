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
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
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
import { CreateUpdatePostComponent } from './create-update-post/create-update-post.component';
import { CommentsComponent } from './comments/comments.component';
import { MessageService } from 'primeng/api';
import { CreatePostComponent } from './create-post/create-post.component';
import { CommentComponent } from './comment/comment.component';
import { ChatComponent } from './chat/chat.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { NotificationsComponent } from './notifications/notifications.component';

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
    CreateUpdatePostComponent,
    CommentsComponent,
    CreatePostComponent,
    CommentComponent,
    ChatComponent,
    ChatMessageComponent,
    NotificationsComponent,
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
    BadgeModule,
    FileUploadModule,
    DialogModule,
    DropdownModule,
    ToastModule,
    SplitButtonModule
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
    GroupHeaderComponent,
    CreatePostComponent,
    CreateUpdatePostComponent,
    ChatComponent,
  ],
  providers: [MessageService]
})
export class SharedComponentsModule { }
