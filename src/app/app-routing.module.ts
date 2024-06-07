import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { InformationComponent } from './pages/profile/information/information.component';
import { FriendsComponent } from './pages/profile/friends/friends.component';
import { GroupsComponent, GroupsComponent as ProfileGroupsComponent } from './pages/profile/groups/groups.component';
import { PostsComponent as ProfilePostsComponent } from './pages/profile/posts/posts.component';
import { GroupComponent } from './pages/group/group.component';
import { MembersComponent } from './pages/group/members/members.component';

const routes: Routes = [
  {
    path: 'profiles',
    redirectTo: 'profiles/profile',
  },
  {
    path: 'profiles/:id',
    component: ProfileComponent,
    children: [
      { path: '', component: ProfilePostsComponent },
      { path: 'info', component: InformationComponent },
      { path: 'friends', component: FriendsComponent },
      { path: 'groups', component: ProfileGroupsComponent },
    ],
  },
  { path: 'groups', component: GroupsComponent },
  {
    path: 'groups/:id',
    component: GroupComponent,
    children: [
      { path: 'members', component: MembersComponent },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
