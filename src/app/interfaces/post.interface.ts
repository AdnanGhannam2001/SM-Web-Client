import { IGroup } from "./group.interface";
import { IProfile } from "./profile.interface";

export interface IPost {
  id          : string;
  createdAtUtc: Date;
  updatedAtUtc: Date;

  content    : string;
  visibility : PostVisibilities;
  media     ?: IMedia;

  profileId: string;
  profile  : IProfile;

  groupId?: string;
  group  ?: IGroup;

  hiddenBy : Array<IProfile>;
  reactions: Array<IReaction>;
  comments : Array<IComment>;
};

export interface IPostRequest {
  content: string;
  visibility: number;
};

export enum PostVisibilities {
  Public,
  Members,
  Friends,
  Private
};

export interface IMedia {
  type: MediaType;
};

export enum MediaType {
  Image,
  Video,
  File
};

export interface IReaction {
  id          : string;
  createdAtUtc: Date;
  updatedAtUtc: Date;

  postId       : string;
  post        ?: IPost;
  profileId    : string;
  profile     ?: IProfile;
  type         : ReactionType;
  reactedAtUtc : Date;
};

export enum ReactionType {
  Like,
  Dislike,
  Angry,
  Happy,
  Sad
};

export interface IComment {
  id          : string;
  createdAtUtc: Date;
  updatedAtUtc: Date;

  postId   ?: string;
  post     ?: IPost;
  parentId ?: string;
  parent   ?: IComment;
  profileId : string;
  profile  ?: IProfile;
  content   : string;
};
