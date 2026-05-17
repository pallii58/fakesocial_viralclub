import type {
  Comment,
  GroupMember,
  Message,
  PostContext,
  SocialEditorState,
  WhatsAppDMState,
  WhatsAppGroupState,
} from "./types";

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

export function defaultWhatsAppDM(): WhatsAppDMState {
  return {
    contactName: "Cliente Demo",
    contactStatus: "online",
    messages: [...defaultMessages],
  };
}

export function defaultWhatsAppGroup(): WhatsAppGroupState {
  return {
    groupName: "Team Progetto Alpha",
    members: [...defaultMembers],
    messages: [...defaultGroupMessages],
  };
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
