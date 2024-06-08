import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from "primeng/dataview";
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { FileUploadModule } from "primeng/fileupload";
import { TableModule } from "primeng/table";
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
import { PostsComponent } from './posts/posts.component';
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



@NgModule({
  declarations: [
    ProfileComponent,
    FriendsComponent,
    ProfileGroupsComponent,
    InformationComponent,
    ProfilePostsComponent,
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
    PrivacyComponent
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
    TableModule
  ]
})
export class PagesModule { }
