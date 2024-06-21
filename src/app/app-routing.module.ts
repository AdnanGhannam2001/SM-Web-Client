import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { InformationComponent } from './pages/profile/information/information.component';
import { FriendsComponent } from './pages/profile/friends/friends.component';
import { GroupsComponent as ProfileGroupsComponent } from './pages/profile/groups/groups.component';
import { PostsComponent as ProfilePostsComponent } from './pages/profile/posts/posts.component';
import { GroupComponent } from './pages/group/group.component';
import { MembersComponent } from './pages/group/members/members.component';
import { PostsComponent as GroupPostsCompoent } from './pages/group/posts/posts.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { InformationComponent as InformationSettingsComponent } from './pages/settings/information/information.component';
import { PrivacyComponent } from './pages/settings/privacy/privacy.component';
import { ImageComponent } from './pages/settings/image/image.component';
import { CoverImageComponent } from './pages/settings/cover-image/cover-image.component';
import { BlockedListComponent } from './pages/settings/blocked-list/blocked-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PostsComponent } from './pages/posts/posts.component';
import { FollowedComponent as  FollowedPostsComponent } from './pages/posts/followed/followed.component';
import { FriendsComponent as  FriendsPostsComponent } from './pages/posts/friends/friends.component';
import { HiddenComponent as HiddenPostsComponent } from './pages/posts/hidden/hidden.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { FollowingComponent } from './pages/profile/following/following.component';
import { FollowedComponent } from './pages/profile/followed/followed.component';
import { SentFriendshipRequestsComponent } from './pages/settings/sent-friendship-requests/sent-friendship-requests.component';
import { ReceivedFriendshipRequestsComponent } from './pages/settings/received-friendship-requests/received-friendship-requests.component';
import { JoinRequestsComponent } from './pages/group/join-requests/join-requests.component';

const routes: Routes = [
  {
    path: "",
    component: PostsComponent,
    children: [
      { path: "", component: FollowedPostsComponent },
      { path: "friends-posts", component: FriendsPostsComponent },
      { path: "hidden-posts", component: HiddenPostsComponent }
    ]
  },
  {
    path: 'profiles',
    component: ProfilesComponent,
  },
  {
    path: 'profiles/:id',
    component: ProfileComponent,
    children: [
      { path: '', component: ProfilePostsComponent },
      { path: 'info', component: InformationComponent },
      { path: 'friends', component: FriendsComponent },
      { path: 'groups', component: ProfileGroupsComponent },
      { path: 'following', component: FollowingComponent },
      { path: 'followed', component: FollowedComponent },
    ],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      { path: '', component: InformationSettingsComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'image', component: ImageComponent },
      { path: 'cover-image', component: CoverImageComponent },
      { path: 'blocked', component: BlockedListComponent },
      { path: 'sent-friendship-requests', component: SentFriendshipRequestsComponent },
      { path: 'recevied-friendship-requests', component: ReceivedFriendshipRequestsComponent },
    ],
  },
  { path: 'groups', component: GroupsComponent },
  {
    path: 'groups/:id',
    component: GroupComponent,
    children: [
      { path: '', component: GroupPostsCompoent },
      { path: 'members', component: MembersComponent },
      { path: 'join-requests', component: JoinRequestsComponent },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
