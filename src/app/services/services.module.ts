import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './profile.service';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './post.service';
import { GroupService } from './group.service';



@NgModule({
  declarations: [],
  providers: [
    ProfileService,
    PostService,
    GroupService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServicesModule { }
