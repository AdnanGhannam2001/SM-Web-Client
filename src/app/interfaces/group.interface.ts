import { IComment, IPost } from "./post.interface";
import { IFavoriteDiscussion, IProfile } from "./profile.interface";

export interface IGroup {
  id          : string;
  createdAtUtc: Date;
  updatedAtUtc: Date;

  name        : string;
  description : string;
  image      ?: boolean;
  coverImage ?: boolean;
  visibility  : GroupVisibilities;
  settings    : IGroupSettings;

  members     : Array<IMember>;
  kicked      : Array<IKicked>;
  joinRequests: Array<IJoinRequest>;
  invites     : Array<IInvite>;
  discussions : Array<IDiscussion>;
  posts       : Array<IPost>;
};

export interface IGroupRequest {
  name       ?: string;
  description?: string;
  visibility  : GroupVisibilities;
  settings    : IGroupSettings;
}

export enum GroupVisibilities {
  Public,
  Private,
  Hidden
};

export interface IGroupSettings {
  inviterRole    : MemberRoleType;
  postingRole    : MemberRoleType;
  editDetailsRole: MemberRoleType;
}

export enum MemberRoleType {
  Admin,
  Organizer,
  Normal
};

export interface IMember {
  groupId    : string;
  group     ?: IGroup;
  profileId  : string;
  profile   ?: IProfile;
  role       : MemberRoleType;
  jointAtUtc : Date;
};

export interface IKicked {
  groupId     : string;
  group      ?: IGroup;
  profileId   : string;
  profile    ?: IProfile;
  kickedById  : string;
  kickedBy   ?: IProfile;
  reason      : string;
  kickedAtUtc : Date;
};

export interface IJoinRequest {
  groupId   : string;
  group    ?: IGroup;
  profileId : string;
  profile  ?: IProfile;
  content  ?: string;
  sentAtUtc : Date;
};

export interface IInvite {
  groupId   : string;
  group    ?: IGroup;
  profileId : string;
  profile  ?: IProfile;
  senderId  : string;
  sender   ?: IProfile;
  content  ?: string;
  sentAtUtc : Date;
};

export interface IDiscussion {
  id          : string;
  createdAtUtc: Date;
  updatedAtUtc: Date;

  title     : string;
  content   : string;
  profileId : string;
  profile  ?: IProfile;
  groupId   : string;
  group    ?: IGroup;

  tags     : Array<ITag>;
  favorites: Array<IFavoriteDiscussion>;
  comments : Array<IComment>;
};

export interface ITag {
  id          : string;
  createdAtUtc: Date;
  updatedAtUtc: Date;

  label: string;
};
