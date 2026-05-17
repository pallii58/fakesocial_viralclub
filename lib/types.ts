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
  /** Spunta blu accanto al nome in chat di gruppo (IG) */
  verified?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  likes: number;
  timestamp: string;
  verified?: boolean;
  /** Riga sotto il commento: tempo, Mi piace, Rispondi (default visibile) */
  showCommentMeta?: boolean;
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
  /** Spunta blu in header chat privata (Instagram, Messenger) */
  contactVerified?: boolean;
  messages: Message[];
  chatBackground?: ChatBackground;
}

export type WhatsAppDMState = DMChatState;

export type WhatsAppChatType = "dm" | "group";

/** Chat WhatsApp unificata: privata o gruppo */
export interface WhatsAppChatState {
  chatType: WhatsAppChatType;
  contactName: string;
  contactAvatar?: string;
  contactStatus?: string;
  groupName: string;
  groupAvatar?: string;
  members: GroupMember[];
  messages: Message[];
  chatBackground?: ChatBackground;
}

export interface WhatsAppGroupState {
  groupName: string;
  groupAvatar?: string;
  members: GroupMember[];
  messages: Message[];
  chatBackground?: ChatBackground;
}

export type InstagramChatType = "dm" | "group";

/** Chat Instagram Direct unificata: privata o gruppo */
export interface InstagramChatState {
  chatType: InstagramChatType;
  contactName: string;
  contactAvatar?: string;
  contactStatus?: string;
  /** Spunta blu sul contatto in chat privata */
  contactVerified?: boolean;
  /** La tua immagine profilo (sincronizzata con il membro «Tu» in gruppo) */
  myAvatar?: string;
  groupName: string;
  groupAvatar?: string;
  /** Spunta blu sul nome gruppo in header */
  groupVerified?: boolean;
  members: GroupMember[];
  messages: Message[];
  chatBackground?: ChatBackground;
}

export interface InstagramGroupState {
  groupName: string;
  groupAvatar?: string;
  groupVerified?: boolean;
  members: GroupMember[];
  messages: Message[];
  chatBackground?: ChatBackground;
}

export type MessengerChatType = "dm" | "group";

/** Chat Facebook Messenger unificata: privata o gruppo */
export interface MessengerChatState {
  chatType: MessengerChatType;
  contactName: string;
  contactAvatar?: string;
  contactStatus?: string;
  contactVerified?: boolean;
  groupName: string;
  groupAvatar?: string;
  groupVerified?: boolean;
  members: GroupMember[];
  messages: Message[];
  chatBackground?: ChatBackground;
}

export interface MessengerGroupState {
  groupName: string;
  groupAvatar?: string;
  groupVerified?: boolean;
  members: GroupMember[];
  messages: Message[];
  chatBackground?: ChatBackground;
}

export type TikTokChatType = "dm" | "group";

/** Chat TikTok Direct unificata: privata o gruppo */
export interface TikTokChatState {
  chatType: TikTokChatType;
  contactName: string;
  contactAvatar?: string;
  contactStatus?: string;
  contactVerified?: boolean;
  myAvatar?: string;
  groupName: string;
  groupAvatar?: string;
  groupVerified?: boolean;
  members: GroupMember[];
  messages: Message[];
  chatBackground?: ChatBackground;
}

export interface TikTokGroupState {
  groupName: string;
  groupAvatar?: string;
  groupVerified?: boolean;
  members: GroupMember[];
  messages: Message[];
  chatBackground?: ChatBackground;
}

export type YouTubeChatType = "dm" | "group";

/** Chat YouTube Inbox unificata: privata o gruppo */
export interface YouTubeChatState {
  chatType: YouTubeChatType;
  contactName: string;
  contactAvatar?: string;
  contactStatus?: string;
  contactVerified?: boolean;
  groupName: string;
  groupAvatar?: string;
  groupVerified?: boolean;
  members: GroupMember[];
  messages: Message[];
  chatBackground?: ChatBackground;
}

export interface YouTubeGroupState {
  groupName: string;
  groupAvatar?: string;
  groupVerified?: boolean;
  members: GroupMember[];
  messages: Message[];
  chatBackground?: ChatBackground;
}

export interface PushNotificationState {
  contactName: string;
  contactAvatar?: string;
  contactVerified?: boolean;
  message: string;
  time: string;
  isGroup?: boolean;
  groupName?: string;
}

/** @deprecated Use PushNotificationState */
export type WhatsAppNotificationState = PushNotificationState;

export type ViewsBackgroundMode = "default" | "solid" | "gradient" | "image";

export interface ViewsCounterBackground {
  mode: ViewsBackgroundMode;
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  image?: string;
}

export interface ViewsCounterState {
  views: number;
  /** Testo mostrato (se vuoto → formato automatico da views) */
  label?: string;
  background: ViewsCounterBackground;
}

export interface SocialEditorState {
  viewMode: ViewMode;
  post: PostContext;
  comments: Comment[];
}
