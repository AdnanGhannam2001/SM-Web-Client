import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: "profiles",
    component: ProfileComponent,
  },
  {
    path: "profiles/:id",
    component: ProfileComponent,
    // children: [
    //   { path: "", component: ProfileTimelineComponent },
    //   { path: "info", component: InformationComponent },
    //   { path: "friends", component: FriendsComponent },
    //   { path: "groups", component: ProfileGroupsComponent }
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
