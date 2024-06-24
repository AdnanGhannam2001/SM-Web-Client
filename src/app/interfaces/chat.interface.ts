import { IGroup, MemberRoleType } from "./group.interface";
import { IProfileResponse } from "./profile.interface";

export interface IChat {
  id           : string;
  isGroup      : boolean;
  isActive     : boolean;
  lastMessageAt: Date;

  group?: IGroup;
  user ?: IProfileResponse;

  messages?: Array<IMessage>
  members ?: Array<IChatMember>
}

export interface IMessage {
  id          : string;
  senderId    : string;
  chatId      : string;
  sentAt      : Date;
  content     : string;
  lastUpdateAt: Date;
}

export interface IChatMember {
  chatId: string;
  userId: string;
  role  : MemberRoleType;
}
