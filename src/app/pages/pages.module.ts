import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from "primeng/dataview";
import { ProfileComponent } from './profile/profile.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { AppRoutingModule } from '../app-routing.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { FriendsComponent } from './profile/friends/friends.component';



@NgModule({
  declarations: [
    ProfileComponent,
    FriendsComponent
  ],
  imports: [
    CommonModule,
    UiComponentsModule,
    AppRoutingModule,
    SharedComponentsModule,
    DataViewModule
  ]
})
export class PagesModule { }
