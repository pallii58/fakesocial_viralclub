export type MessageSender = "me" | "other" | string;

export type ReadStatus = "sent" | "delivered" | "read";

export type ChatBackgroundMode = "default" | "solid" | "image";

export interface ChatBackground {
  mode: ChatBackgroundMode;
  color?: string;
  image?: string;
}

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

/** Stato chat DM / Messenger (tutte le piattaforme) */
export interface DMChatState {
  contactName: string;
  contactAvatar?: string;
  contactStatus?: string;
  messages: Message[];
  chatBackground?: ChatBackground;
}

export type WhatsAppDMState = DMChatState;

export interface WhatsAppGroupState {
  groupName: string;
  members: GroupMember[];
  messages: Message[];
  chatBackground?: ChatBackground;
}

export interface PushNotificationState {
  contactName: string;
  contactAvatar?: string;
  message: string;
  time: string;
  isGroup?: boolean;
  groupName?: string;
}

/** @deprecated Use PushNotificationState */
export type WhatsAppNotificationState = PushNotificationState;

export interface SocialEditorState {
  viewMode: ViewMode;
  post: PostContext;
  comments: Comment[];
}
