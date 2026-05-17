import type {
  Comment,
  DMChatState,
  GroupMember,
  Message,
  PostContext,
  SocialEditorState,
  InstagramChatState,
  InstagramChatType,
  InstagramGroupState,
  MessengerChatState,
  MessengerChatType,
  MessengerGroupState,
  TikTokChatState,
  TikTokChatType,
  TikTokGroupState,
  YouTubeChatState,
  YouTubeChatType,
  YouTubeGroupState,
  ViewsCounterState,
  WhatsAppChatState,
  WhatsAppChatType,
  WhatsAppGroupState,
  PushNotificationState,
} from "./types";
import type { BrandId } from "@/components/brand/NeonBrandLogo";
import { getNotificationConfig } from "./notification-config";

let idCounter = 0;
export function genId(): string {
  idCounter += 1;
  return `id-${Date.now()}-${idCounter}`;
}

const defaultMessages: Message[] = [
  {
    id: "m1",
    text: "Ciao! Hai visto il nuovo progetto?",
    sender: "other",
    timestamp: "10:24",
    readStatus: "read",
  },
  {
    id: "m2",
    text: "Sì, è fantastico! Lo presentiamo domani?",
    sender: "me",
    timestamp: "10:25",
    readStatus: "read",
  },
  {
    id: "m3",
    text: "Perfetto, ci sentiamo alle 15:00 👍",
    sender: "other",
    timestamp: "10:26",
    readStatus: "delivered",
  },
];

const defaultMembers: GroupMember[] = [
  { id: "mem1", name: "Marco" },
  { id: "mem2", name: "Laura" },
  { id: "me", name: "Tu" },
];

const defaultGroupMessages: Message[] = [
  {
    id: "gm1",
    text: "Ragazzi, il cliente ha approvato!",
    sender: "mem1",
    timestamp: "09:15",
  },
  {
    id: "gm2",
    text: "Ottimo lavoro team 🎉",
    sender: "mem2",
    timestamp: "09:16",
  },
  {
    id: "gm3",
    text: "Preparo i materiali per domani",
    sender: "me",
    timestamp: "09:18",
    readStatus: "read",
  },
];

const defaultComments: Comment[] = [
  {
    id: "c1",
    author: "sara_rossi",
    text: "Bellissimo! Quando esce?",
    likes: 24,
    timestamp: "2h",
    verified: false,
  },
  {
    id: "c2",
    author: "marco_bianchi",
    text: "Finalmente! Non vedo l'ora 🔥",
    likes: 12,
    timestamp: "1h",
    replies: [
      {
        id: "c2r1",
        author: "brand_official",
        text: "Grazie! Stay tuned 😉",
        likes: 45,
        timestamp: "45m",
        verified: true,
      },
    ],
  },
  {
    id: "c3",
    author: "luca_verdi",
    text: "Spettacolare, complimenti al team!",
    likes: 8,
    timestamp: "30m",
  },
];

const defaultPost: PostContext = {
  author: "brand_official",
  caption: "Nuovo lancio in arrivo! Restate sintonizzati ✨ #marketing #launch",
  likes: 1247,
  timestamp: "3 ore fa",
  verified: true,
};

export function defaultDM(overrides?: Partial<DMChatState>): DMChatState {
  return {
    contactName: "Cliente Demo",
    contactStatus: "online",
    messages: defaultMessages.map((m) => ({ ...m })),
    ...overrides,
  };
}

export function defaultWhatsAppDM(): DMChatState {
  return defaultDM({ contactStatus: "online" });
}

export function defaultInstagramDM(): DMChatState {
  return defaultDM({
    contactName: "influencer_demo",
    contactStatus: "Attivo ora",
    contactVerified: true,
    messages: defaultInstagramDMMessages.map((m) => ({ ...m })),
  });
}

const defaultInstagramDMMessages: Message[] = [
  {
    id: "ig1",
    text: "Ciao! Ti va una collab? ✨",
    sender: "other",
    timestamp: "14:02",
  },
  {
    id: "ig2",
    text: "Certo, mandami il brief!",
    sender: "me",
    timestamp: "14:05",
  },
];

const defaultInstagramGroupMessages: Message[] = [
  {
    id: "igg1",
    text: "Ragazzi, brief approvato! 🎉",
    sender: "mem1",
    timestamp: "14:10",
  },
  {
    id: "igg2",
    text: "Perfetto, posto storie domani",
    sender: "mem2",
    timestamp: "14:11",
  },
  {
    id: "igg3",
    text: "Io preparo il reel ✨",
    sender: "me",
    timestamp: "14:12",
  },
];

export function defaultInstagramGroup(): InstagramGroupState {
  return {
    groupName: "Collab Creators",
    groupVerified: false,
    members: defaultMembers.map((m) =>
      m.id === "mem1" ? { ...m, verified: true } : { ...m }
    ),
    messages: defaultInstagramGroupMessages.map((m) => ({ ...m })),
  };
}

export function defaultInstagramChat(
  chatType: InstagramChatType = "dm"
): InstagramChatState {
  const dm = defaultInstagramDM();
  const group = defaultInstagramGroup();
  if (chatType === "group") {
    return {
      chatType: "group",
      contactName: dm.contactName,
      contactAvatar: dm.contactAvatar,
      contactStatus: dm.contactStatus,
      contactVerified: dm.contactVerified,
      myAvatar: group.members.find((m) => m.id === "me")?.avatar,
      groupName: group.groupName,
      groupAvatar: group.groupAvatar,
      groupVerified: group.groupVerified,
      members: group.members,
      messages: group.messages,
      chatBackground: group.chatBackground,
    };
  }
  return {
    chatType: "dm",
    contactName: dm.contactName,
    contactAvatar: dm.contactAvatar,
    contactStatus: dm.contactStatus,
    contactVerified: dm.contactVerified,
    myAvatar: undefined,
    groupName: group.groupName,
    groupAvatar: group.groupAvatar,
    groupVerified: group.groupVerified,
    members: group.members,
    messages: dm.messages,
    chatBackground: dm.chatBackground,
  };
}

export function switchInstagramChatType(
  state: InstagramChatState,
  chatType: InstagramChatType
): InstagramChatState {
  if (state.chatType === chatType) return state;
  const base = defaultInstagramChat(chatType);
  const firstOther =
    state.members.find((m) => m.id !== "me")?.id ??
    base.members.find((m) => m.id !== "me")?.id ??
    "mem1";

  const messages =
    chatType === "group"
      ? state.messages.map((m) =>
          m.sender === "me" ? m : { ...m, sender: firstOther }
        )
      : state.messages.map((m) =>
          m.sender === "me" ? m : { ...m, sender: "other" }
        );

  const myAvatar =
    state.myAvatar ?? state.members.find((m) => m.id === "me")?.avatar;

  return {
    ...base,
    messages,
    chatBackground: state.chatBackground,
    contactName: state.contactName || state.groupName || base.contactName,
    contactAvatar: state.contactAvatar,
    contactStatus: state.contactStatus ?? base.contactStatus,
    contactVerified: state.contactVerified,
    myAvatar,
    groupName: state.groupName || state.contactName || base.groupName,
    groupAvatar: state.groupAvatar,
    groupVerified: state.groupVerified,
    members:
      state.members.length > 0
        ? state.members.map((m) =>
            m.id === "me" ? { ...m, avatar: myAvatar ?? m.avatar } : { ...m }
          )
        : base.members.map((m) =>
            m.id === "me" ? { ...m, avatar: myAvatar ?? m.avatar } : m
          ),
  };
}

const defaultMessengerDMMessages: Message[] = [
  {
    id: "fb1",
    text: "Ehi, hai visto il post di oggi?",
    sender: "other",
    timestamp: "11:30",
  },
  {
    id: "fb2",
    text: "Sì! Possiamo boostarlo?",
    sender: "me",
    timestamp: "11:32",
  },
];

const defaultMessengerGroupMessages: Message[] = [
  {
    id: "fbg1",
    text: "Ragazzi, campagna live domani 🚀",
    sender: "mem1",
    timestamp: "10:15",
  },
  {
    id: "fbg2",
    text: "Perfetto, preparo i creativi",
    sender: "mem2",
    timestamp: "10:16",
  },
  {
    id: "fbg3",
    text: "Io gestisco i boost 💪",
    sender: "me",
    timestamp: "10:18",
  },
];

export function defaultMessengerDM(): DMChatState {
  return defaultDM({
    contactName: "Marco Bianchi",
    contactStatus: "Attivo ora",
    contactVerified: true,
    messages: defaultMessengerDMMessages.map((m) => ({ ...m })),
  });
}

export function defaultMessengerGroup(): MessengerGroupState {
  return {
    groupName: "Team Marketing",
    groupVerified: false,
    members: defaultMembers.map((m) =>
      m.id === "mem1" ? { ...m, verified: true } : { ...m }
    ),
    messages: defaultMessengerGroupMessages.map((m) => ({ ...m })),
  };
}

export function defaultMessengerChat(
  chatType: MessengerChatType = "dm"
): MessengerChatState {
  const dm = defaultMessengerDM();
  const group = defaultMessengerGroup();
  if (chatType === "group") {
    return {
      chatType: "group",
      contactName: dm.contactName,
      contactAvatar: dm.contactAvatar,
      contactStatus: dm.contactStatus,
      contactVerified: dm.contactVerified,
      groupName: group.groupName,
      groupAvatar: group.groupAvatar,
      groupVerified: group.groupVerified,
      members: group.members,
      messages: group.messages,
      chatBackground: group.chatBackground,
    };
  }
  return {
    chatType: "dm",
    contactName: dm.contactName,
    contactAvatar: dm.contactAvatar,
    contactStatus: dm.contactStatus,
    contactVerified: dm.contactVerified,
    groupName: group.groupName,
    groupAvatar: group.groupAvatar,
    groupVerified: group.groupVerified,
    members: group.members,
    messages: dm.messages,
    chatBackground: dm.chatBackground,
  };
}

export function switchMessengerChatType(
  state: MessengerChatState,
  chatType: MessengerChatType
): MessengerChatState {
  if (state.chatType === chatType) return state;
  const base = defaultMessengerChat(chatType);
  const firstOther =
    state.members.find((m) => m.id !== "me")?.id ??
    base.members.find((m) => m.id !== "me")?.id ??
    "mem1";

  const messages =
    chatType === "group"
      ? state.messages.map((m) =>
          m.sender === "me" ? m : { ...m, sender: firstOther }
        )
      : state.messages.map((m) =>
          m.sender === "me" ? m : { ...m, sender: "other" }
        );

  return {
    ...base,
    messages,
    chatBackground: state.chatBackground,
    contactName: state.contactName || state.groupName || base.contactName,
    contactAvatar: state.contactAvatar,
    contactStatus: state.contactStatus ?? base.contactStatus,
    contactVerified: state.contactVerified,
    groupName: state.groupName || state.contactName || base.groupName,
    groupAvatar: state.groupAvatar,
    groupVerified: state.groupVerified,
    members:
      state.members.length > 0
        ? state.members.map((m) => ({ ...m }))
        : base.members,
  };
}

const defaultTikTokDMMessages: Message[] = [
  {
    id: "tt1",
    text: "bro questo trend è perfetto per il brand 🔥",
    sender: "other",
    timestamp: "18:44",
  },
  {
    id: "tt2",
    text: "lo giramo domani!",
    sender: "me",
    timestamp: "18:45",
  },
];

const defaultTikTokGroupMessages: Message[] = [
  {
    id: "ttg1",
    text: "chi è down per il trend di oggi?",
    sender: "mem1",
    timestamp: "19:02",
  },
  {
    id: "ttg2",
    text: "io! alle 18",
    sender: "mem2",
    timestamp: "19:03",
  },
  {
    id: "ttg3",
    text: "perfetto ci sto 🔥",
    sender: "me",
    timestamp: "19:04",
  },
];

export function defaultTikTokDM(): DMChatState {
  return defaultDM({
    contactName: "creator_viral",
    contactStatus: "Online",
    contactVerified: true,
    messages: defaultTikTokDMMessages.map((m) => ({ ...m })),
  });
}

export function defaultTikTokGroup(): TikTokGroupState {
  return {
    groupName: "Creator Squad",
    groupVerified: false,
    members: defaultMembers.map((m) =>
      m.id === "mem1" ? { ...m, verified: true } : { ...m }
    ),
    messages: defaultTikTokGroupMessages.map((m) => ({ ...m })),
  };
}

export function defaultTikTokChat(
  chatType: TikTokChatType = "dm"
): TikTokChatState {
  const dm = defaultTikTokDM();
  const group = defaultTikTokGroup();
  if (chatType === "group") {
    return {
      chatType: "group",
      contactName: dm.contactName,
      contactAvatar: dm.contactAvatar,
      contactStatus: dm.contactStatus,
      contactVerified: dm.contactVerified,
      myAvatar: group.members.find((m) => m.id === "me")?.avatar,
      groupName: group.groupName,
      groupAvatar: group.groupAvatar,
      groupVerified: group.groupVerified,
      members: group.members,
      messages: group.messages,
      chatBackground: group.chatBackground,
    };
  }
  return {
    chatType: "dm",
    contactName: dm.contactName,
    contactAvatar: dm.contactAvatar,
    contactStatus: dm.contactStatus,
    contactVerified: dm.contactVerified,
    myAvatar: undefined,
    groupName: group.groupName,
    groupAvatar: group.groupAvatar,
    groupVerified: group.groupVerified,
    members: group.members,
    messages: dm.messages,
    chatBackground: dm.chatBackground,
  };
}

export function switchTikTokChatType(
  state: TikTokChatState,
  chatType: TikTokChatType
): TikTokChatState {
  if (state.chatType === chatType) return state;
  const base = defaultTikTokChat(chatType);
  const firstOther =
    state.members.find((m) => m.id !== "me")?.id ??
    base.members.find((m) => m.id !== "me")?.id ??
    "mem1";
  const myAvatar =
    state.myAvatar ?? state.members.find((m) => m.id === "me")?.avatar;

  const messages =
    chatType === "group"
      ? state.messages.map((m) =>
          m.sender === "me" ? m : { ...m, sender: firstOther }
        )
      : state.messages.map((m) =>
          m.sender === "me" ? m : { ...m, sender: "other" }
        );

  return {
    ...base,
    messages,
    chatBackground: state.chatBackground,
    contactName: state.contactName || state.groupName || base.contactName,
    contactAvatar: state.contactAvatar,
    contactStatus: state.contactStatus ?? base.contactStatus,
    contactVerified: state.contactVerified,
    myAvatar,
    groupName: state.groupName || state.contactName || base.groupName,
    groupAvatar: state.groupAvatar,
    groupVerified: state.groupVerified,
    members:
      state.members.length > 0
        ? state.members.map((m) =>
            m.id === "me" ? { ...m, avatar: myAvatar ?? m.avatar } : { ...m }
          )
        : base.members.map((m) =>
            m.id === "me" ? { ...m, avatar: myAvatar ?? m.avatar } : m
          ),
  };
}

const defaultYouTubeDMMessages: Message[] = [
  {
    id: "yt1",
    text: "Ciao! Possiamo parlare della sponsorizzazione?",
    sender: "other",
    timestamp: "09:10",
  },
  {
    id: "yt2",
    text: "Certo, ti mando i dettagli via email.",
    sender: "me",
    timestamp: "09:15",
  },
];

const defaultYouTubeGroupMessages: Message[] = [
  {
    id: "ytg1",
    text: "Team, il video è in review",
    sender: "mem1",
    timestamp: "10:00",
  },
  {
    id: "ytg2",
    text: "Ottimo, pubblico domani",
    sender: "mem2",
    timestamp: "10:02",
  },
  {
    id: "ytg3",
    text: "Perfetto 👍",
    sender: "me",
    timestamp: "10:05",
  },
];

export function defaultYouTubeDM(): DMChatState {
  return defaultDM({
    contactName: "Partner Brand",
    contactStatus: "Di solito risponde entro 1 h",
    contactVerified: true,
    messages: defaultYouTubeDMMessages.map((m) => ({ ...m })),
  });
}

export function defaultYouTubeGroup(): YouTubeGroupState {
  return {
    groupName: "Creator Partners",
    groupVerified: false,
    members: defaultMembers.map((m) =>
      m.id === "mem1" ? { ...m, verified: true } : { ...m }
    ),
    messages: defaultYouTubeGroupMessages.map((m) => ({ ...m })),
  };
}

export function defaultYouTubeChat(
  chatType: YouTubeChatType = "dm"
): YouTubeChatState {
  const dm = defaultYouTubeDM();
  const group = defaultYouTubeGroup();
  if (chatType === "group") {
    return {
      chatType: "group",
      contactName: dm.contactName,
      contactAvatar: dm.contactAvatar,
      contactStatus: dm.contactStatus,
      contactVerified: dm.contactVerified,
      groupName: group.groupName,
      groupAvatar: group.groupAvatar,
      groupVerified: group.groupVerified,
      members: group.members,
      messages: group.messages,
      chatBackground: group.chatBackground,
    };
  }
  return {
    chatType: "dm",
    contactName: dm.contactName,
    contactAvatar: dm.contactAvatar,
    contactStatus: dm.contactStatus,
    contactVerified: dm.contactVerified,
    groupName: group.groupName,
    groupAvatar: group.groupAvatar,
    groupVerified: group.groupVerified,
    members: group.members,
    messages: dm.messages,
    chatBackground: dm.chatBackground,
  };
}

export function switchYouTubeChatType(
  state: YouTubeChatState,
  chatType: YouTubeChatType
): YouTubeChatState {
  if (state.chatType === chatType) return state;
  const base = defaultYouTubeChat(chatType);
  const firstOther =
    state.members.find((m) => m.id !== "me")?.id ??
    base.members.find((m) => m.id !== "me")?.id ??
    "mem1";

  const messages =
    chatType === "group"
      ? state.messages.map((m) =>
          m.sender === "me" ? m : { ...m, sender: firstOther }
        )
      : state.messages.map((m) =>
          m.sender === "me" ? m : { ...m, sender: "other" }
        );

  return {
    ...base,
    messages,
    chatBackground: state.chatBackground,
    contactName: state.contactName || state.groupName || base.contactName,
    contactAvatar: state.contactAvatar,
    contactStatus: state.contactStatus ?? base.contactStatus,
    contactVerified: state.contactVerified,
    groupName: state.groupName || state.contactName || base.groupName,
    groupAvatar: state.groupAvatar,
    groupVerified: state.groupVerified,
    members:
      state.members.length > 0
        ? state.members.map((m) => ({ ...m }))
        : base.members,
  };
}

export function defaultWhatsAppGroup(): WhatsAppGroupState {
  return {
    groupName: "Team Progetto Alpha",
    members: defaultMembers.map((m) => ({ ...m })),
    messages: defaultGroupMessages.map((m) => ({ ...m })),
  };
}

export function defaultWhatsAppChat(
  chatType: WhatsAppChatType = "dm"
): WhatsAppChatState {
  const dm = defaultWhatsAppDM();
  const group = defaultWhatsAppGroup();
  if (chatType === "group") {
    return {
      chatType: "group",
      contactName: dm.contactName,
      contactAvatar: dm.contactAvatar,
      contactStatus: dm.contactStatus,
      groupName: group.groupName,
      groupAvatar: group.groupAvatar,
      members: group.members,
      messages: group.messages,
      chatBackground: group.chatBackground,
    };
  }
  return {
    chatType: "dm",
    contactName: dm.contactName,
    contactAvatar: dm.contactAvatar,
    contactStatus: dm.contactStatus,
    groupName: group.groupName,
    groupAvatar: group.groupAvatar,
    members: group.members,
    messages: dm.messages,
    chatBackground: dm.chatBackground,
  };
}

export function switchWhatsAppChatType(
  state: WhatsAppChatState,
  chatType: WhatsAppChatType
): WhatsAppChatState {
  if (state.chatType === chatType) return state;
  const base = defaultWhatsAppChat(chatType);
  const firstOther =
    state.members.find((m) => m.id !== "me")?.id ??
    base.members.find((m) => m.id !== "me")?.id ??
    "mem1";

  const messages =
    chatType === "group"
      ? state.messages.map((m) =>
          m.sender === "me"
            ? m
            : { ...m, sender: firstOther }
        )
      : state.messages.map((m) =>
          m.sender === "me" ? m : { ...m, sender: "other" }
        );

  return {
    ...base,
    messages,
    chatBackground: state.chatBackground,
    contactName: state.contactName || state.groupName || base.contactName,
    contactAvatar: state.contactAvatar,
    contactStatus: state.contactStatus ?? base.contactStatus,
    groupName: state.groupName || state.contactName || base.groupName,
    groupAvatar: state.groupAvatar,
    members:
      state.members.length > 0
        ? state.members.map((m) => ({ ...m }))
        : base.members,
  };
}

export function defaultWhatsAppSingleMessage(): Message {
  return {
    id: "single-1",
    text: "Ciao! Ti mando il preventivo tra poco 👍",
    sender: "other",
    timestamp: "10:42",
    readStatus: undefined,
  };
}

export function defaultInstagramViewsCounter(): ViewsCounterState {
  return {
    views: 17900,
    background: { mode: "default" },
  };
}

export function defaultInstagramSingleComment(): Comment {
  return {
    id: "ig-comment-1",
    author: "influencer_demo",
    text: "Questo reel è pazzesco! 🔥",
    likes: 124,
    timestamp: "2h",
    verified: true,
  };
}

export function defaultTikTokSingleComment(): Comment {
  return {
    id: "tt-comment-1",
    author: "creator_viral",
    text: "questo è il trend dell'anno 🔥",
    likes: 892,
    timestamp: "1h",
    verified: true,
  };
}

export function defaultPushNotification(brand: BrandId): PushNotificationState {
  return getNotificationConfig(brand).defaultState();
}

export function defaultWhatsAppNotification(): PushNotificationState {
  return defaultPushNotification("whatsapp");
}

export function defaultSocialState(
  overrides?: Partial<PostContext>
): SocialEditorState {
  return {
    viewMode: "full",
    post: { ...defaultPost, ...overrides },
    comments: defaultComments.map((c) => ({
      ...c,
      replies: c.replies ? [...c.replies] : undefined,
    })),
  };
}

export function newMessage(
  sender: Message["sender"] = "me",
  text = ""
): Message {
  return {
    id: genId(),
    text,
    sender,
    timestamp: new Date().toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    readStatus: sender === "me" ? "read" : undefined,
  };
}

export function newComment(author = "utente"): Comment {
  return {
    id: genId(),
    author,
    text: "",
    likes: 0,
    timestamp: "ora",
  };
}
