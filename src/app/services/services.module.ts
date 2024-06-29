import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './profile.service';
import { PostService } from './post.service';
import { GroupService } from './group.service';
import { httpClientInterceptor } from '../interceptors/http.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
@NgModule({
  declarations: [],
  providers: [
    ProfileService,
    PostService,
    GroupService,
    provideHttpClient(withInterceptors([httpClientInterceptor])),
  ],
  imports: [
    CommonModule,
  ],
})
export class ServicesModule { }
