import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { InformationComponent } from './pages/profile/information/information.component';
import { FriendsComponent } from './pages/profile/friends/friends.component';
import { GroupsComponent as ProfileGroupsComponent } from './pages/profile/groups/groups.component';
import { PostsComponent as ProfilePostsComponent } from './pages/profile/posts/posts.component';

const routes: Routes = [
  {
    path: "profiles",
    redirectTo: "profiles/profile"
  },
  {
    path: "profiles/:id",
    component: ProfileComponent,
    children: [
      { path: "", component: ProfilePostsComponent },
      { path: "info", component: InformationComponent },
      { path: "friends", component: FriendsComponent },
      { path: "groups", component: ProfileGroupsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
