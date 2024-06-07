import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from "primeng/dataview";
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { ProfileComponent } from './profile/profile.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { AppRoutingModule } from '../app-routing.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { FriendsComponent } from './profile/friends/friends.component';
import { GroupsComponent as ProfileGroupsComponent } from './profile/groups/groups.component';
import { GroupsComponent } from './groups/groups.component';
import { InformationComponent } from './profile/information/information.component';
import { PostsComponent } from './profile/posts/posts.component';
import { FormsModule } from '@angular/forms';
import { ProfilesComponent } from './profiles/profiles.component';
import { GroupComponent } from './group/group.component';
import { MembersComponent } from './group/members/members.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    ProfileComponent,
    FriendsComponent,
    ProfileGroupsComponent,
    InformationComponent,
    PostsComponent,
    GroupsComponent,
    ProfilesComponent,
    GroupComponent,
    MembersComponent,
    NotFoundComponent
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
  ]
})
export class PagesModule { }
