export type MessageSender = "me" | "other" | string;

export type ReadStatus = "sent" | "delivered" | "read";

export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: string;
  readStatus?: ReadStatus;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  likes: number;
  timestamp: string;
  verified?: boolean;
  replies?: Comment[];
}

export interface PostContext {
  image?: string;
  caption: string;
  likes: number;
  author: string;
  avatar?: string;
  verified?: boolean;
  timestamp?: string;
}

export type ViewMode = "comments-only" | "full";

export interface WhatsAppDMState {
  contactName: string;
  contactAvatar?: string;
  contactStatus?: string;
  messages: Message[];
}

export interface WhatsAppGroupState {
  groupName: string;
  members: GroupMember[];
  messages: Message[];
}

export interface SocialEditorState {
  viewMode: ViewMode;
  post: PostContext;
  comments: Comment[];
}
