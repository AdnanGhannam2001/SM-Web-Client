import { IDiscussion, IInvite, IJoinRequest, IKicked, IMember } from "./group.interface";
import { IComment, IPost, IReaction } from "./post.interface";

export interface IProfile {
  id          : string;
  createdAtUtc: Date;
  updatedAtUtc: Date;

  firstName       : string;
  lastName        : string;
  phoneNumber    ?: IPhoneNumber;
  isActive        : boolean;
  dateOfBirth     : Date;
  gender          : Gender;
  bio            ?: string;
  image          ?: string;
  coverImage     ?: string;
  jobInformations : IJobInformations;
  socials         : ISocials;
  settings        : ISettings;

  Blocked            : Array<IBlock>;
  BlockedBy          : Array<IBlock>;
  SentRequests       : Array<IFriendshipRequest>;
  ReceivedRequests   : Array<IFriendshipRequest>;
  Following          : Array<IFollow>;
  FollowedBy         : Array<IFollow>;
  Friends            : Array<IFriendship>;
  FriendTo           : Array<IFriendship>;
  Posts              : Array<IPost>;
  Hidden             : Array<IPost>;
  Reactions          : Array<IReaction>;
  Comments           : Array<IComment>;
  MemberOf           : Array<IMember>;
  Kicked             : Array<IKicked>;
  KickedFrom         : Array<IKicked>;
  JoinRequests       : Array<IJoinRequest>;
  SentInvites        : Array<IInvite>;
  ReceivedInvites    : Array<IInvite>;
  Discussions        : Array<IDiscussion>;
  FavoriteDiscussions: Array<IFavoriteDiscussion>;
};

export interface IPhoneNumber {
  value: string;
};

export enum Gender {
  Male,
  Female
};

export interface IJobInformations {
  jobTitle ?: string;
  company  ?: string;
  startDate?: Date;
};

export interface ISocials {
  facebook?: string;
  youtube ?: string;
  twitter ?: string;
};

export interface ISettings {
  lastName   : InformationVisibility;
  dateOfBirth: InformationVisibility;
  gender     : InformationVisibility;
  phone      : InformationVisibility;
  jobTitle   : InformationVisibility;
  company    : InformationVisibility;
  startDate  : InformationVisibility;
  socials    : InformationVisibility;
  bio        : InformationVisibility;
};

export enum InformationVisibility {
  Public,
  Friends,
  Private
};

export interface IBlock {
  blockerId    : string;
  blocker     ?: IProfile;
  blockedId    : string;
  blocked     ?: IProfile;
  reason       : string;
  blockedAtUtc : Date;
};

export interface IFriendshipRequest {
  senderId   : string;
  sender    ?: IProfile;
  receiverId : string;
  receiver  ?: IProfile;
  sentAtUtc  : Date;
};

export interface IFollow {
  followerId    : string;
  follower     ?: IProfile;
  followedId    : string;
  followed     ?: IProfile;
  followedAtUtc : Date;
};

export interface IFriendship {
  profileId    : string;
  profile     ?: IProfile;
  friendId     : string;
  friend      ?: IProfile;
  startedAtUtc : Date;
};

export interface IFavoriteDiscussion {
  profileId    : string;
  profile     ?: IProfile;
  discussionId : string;
  discussion  ?: IDiscussion;
  addedAtUtc   : Date;
};
