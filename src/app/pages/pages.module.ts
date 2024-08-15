import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from "primeng/dataview";
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { FileUploadModule } from "primeng/fileupload";
import { TableModule } from "primeng/table";
import { PaginatorModule } from "primeng/paginator";
import { InputTextModule } from "primeng/inputtext";
import { StepperModule } from "primeng/stepper";
import { InputGroupModule } from "primeng/inputgroup";
import { ButtonGroupModule } from "primeng/buttongroup";
import { ToastModule } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import { ProfileComponent } from './profile/profile.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { AppRoutingModule } from '../app-routing.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { FriendsComponent } from './profile/friends/friends.component';
import { GroupsComponent as ProfileGroupsComponent } from './profile/groups/groups.component';
import { GroupsComponent } from './groups/groups.component';
import { InformationComponent } from './profile/information/information.component';
import { InformationComponent as SettingsInformationComponent } from './settings/information/information.component';
import { PostsComponent as ProfilePostsComponent } from './profile/posts/posts.component';
import { PostsComponent as GroupPostsComponent } from './group/posts/posts.component';
import { PostsComponent } from './posts/posts.component';
import { FollowedComponent as  FollowedPostsComponent } from './posts/followed/followed.component';
import { FriendsComponent as  FriendsPostsComponent } from './posts/friends/friends.component';
import { FormsModule } from '@angular/forms';
import { ProfilesComponent } from './profiles/profiles.component';
import { GroupComponent } from './group/group.component';
import { MembersComponent } from './group/members/members.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { ImageComponent } from './settings/image/image.component';
import { CoverImageComponent } from './settings/cover-image/cover-image.component';
import { BlockedListComponent } from './settings/blocked-list/blocked-list.component';
import { PrivacyComponent } from './settings/privacy/privacy.component';
import { FollowingComponent } from './profile/following/following.component';
import { FollowedComponent } from './profile/followed/followed.component';
import { SentFriendshipRequestsComponent } from './settings/sent-friendship-requests/sent-friendship-requests.component';
import { ReceivedFriendshipRequestsComponent } from './settings/received-friendship-requests/received-friendship-requests.component';
import { HiddenComponent } from './posts/hidden/hidden.component';
import { FavoritesComponent } from './posts/favorites/favorites.component';
import { JoinRequestsComponent } from './group/join-requests/join-requests.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ChatsComponent } from './chats/chats.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    ProfileComponent,
    FriendsComponent,
    ProfileGroupsComponent,
    InformationComponent,
    ProfilePostsComponent,
    GroupPostsComponent,
    PostsComponent,
    GroupsComponent,
    ProfilesComponent,
    GroupComponent,
    MembersComponent,
    NotFoundComponent,
    SettingsComponent,
    SettingsInformationComponent,
    ImageComponent,
    CoverImageComponent,
    BlockedListComponent,
    PrivacyComponent,
    FollowingComponent,
    FollowedComponent,
    SentFriendshipRequestsComponent,
    ReceivedFriendshipRequestsComponent,
    FollowedPostsComponent,
    FriendsPostsComponent,
    HiddenComponent,
    FavoritesComponent,
    JoinRequestsComponent,
    CreateGroupComponent,
    ChatsComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    UiComponentsModule,
    FormsModule,
    AppRoutingModule,
    SharedComponentsModule,
    DataViewModule,
    ButtonModule,
    DividerModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule,
    TableModule,
    InputTextModule,
    PaginatorModule,
    InputGroupModule,
    ToastModule,
    ButtonGroupModule,
    StepperModule,
    DialogModule
  ],
})
export class PagesModule {}
