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
import { GroupsComponent } from './profile/groups/groups.component';
import { InformationComponent } from './profile/information/information.component';
import { PostsComponent } from './profile/posts/posts.component';



@NgModule({
  declarations: [
    ProfileComponent,
    FriendsComponent,
    GroupsComponent,
    InformationComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    UiComponentsModule,
    AppRoutingModule,
    SharedComponentsModule,
    DataViewModule,
    ButtonModule,
    DividerModule
  ]
})
export class PagesModule { }
