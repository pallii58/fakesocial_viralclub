# Fake Social

Tool web per creare **mock di social network** (WhatsApp, Instagram, Facebook, TikTok, YouTube) pronti da esportare in PNG. Progetto **ViralClub** — interfaccia in italiano, tema scuro con accenti viola.

**Repository:** [pallii58/fakesocial_viralclub](https://github.com/pallii58/fakesocial_viralclub.git)  
**Deploy:** Vercel (branch `main`)

> Per agenti AI: leggi e segui [`AI.md`](./AI.md). Dopo ogni modifica rilevante, **aggiorna questo README** con tutte le funzionalità implementate.

**Ultimo aggiornamento:** 2026-05-17

---

## Stack

| Tecnologia | Versione / note |
|------------|-----------------|
| Next.js (App Router) | 16.x |
| React | 19.x |
| TypeScript | 5.x |
| Tailwind CSS | v4 (`app/globals.css`) |
| Export immagini | `html-to-image` |

## Avvio rapido

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

---

## Funzionalità implementate (elenco completo)

### Navigazione e shell

| Funzionalità | Dettaglio |
|--------------|-----------|
| Home | Griglia 5 piattaforme con card neon (`GradientCard`), titolo «Mock social / pronti in un click» |
| Hub piattaforma | Pagina intermedia per ogni social (`PlatformHub`) con logo neon e link ai mock |
| Header home | Logo ViralClub + titolo **Fake Social** (gradiente); link alla home |
| Header editor | Senza logo duplicato; link **Indietro** verso hub o home |
| Sfondo app | `#050508` con blob viola sfumati (`PageShell`) |
| Layout responsive | Griglia editor/anteprima 1 colonna mobile, 2 colonne desktop (`lg:grid-cols-2`) |

### Layout editor comune (`EditorLayout`)

| Funzionalità | Dettaglio |
|--------------|-----------|
| Due colonne | **Editor** (sinistra) + **Anteprima** (destra) |
| Frame telefono | Mock in `PhoneFrame` (bordo scuro, notch, 375×812, sfondo interno **trasparente**) |
| Toolbar | **Scarica** (PNG) + **Reset** (stato demo predefinito) |
| Titolo pagina | Formato `Piattaforma · Tipo mock` (es. `WhatsApp · Chat DM`) |
| Pillole anteprima | **Sfondo** / **Senza sfondo** (solo editor con lista messaggi) |
| Anteprima Sfondo | Telefono completo con header + chat/notifica/post |
| Anteprima Senza sfondo | Solo bolle messaggi su **scacchiera viola** (checkerboard) |

### Export immagini

| Funzionalità | Dettaglio |
|--------------|-----------|
| PNG schermo | Export area `#mock-export-root` dentro il telefono |
| PNG trasparente | Sfondo trasparente su export (no riempimento bianco generale) |
| Suffisso file | `-messaggi` quando si esporta solo le bolle (modalità Senza sfondo) |
| Nome file | `fake-social-{platform}[-suffisso]-{timestamp}.png` |
| Singola bolla | Pulsante dedicato su WhatsApp singolo messaggio (`exportSingleBubble`) |
| Libreria | `lib/export-image.ts` — `captureElement`, `exportMock`, `exportTransparentPng` |

### Editor messaggi (`MessageListEditor`)

| Funzionalità | Dettaglio |
|--------------|-----------|
| Lista messaggi | Card per ogni messaggio con titolo «Messaggio N» |
| Mittente | Select custom: **Tu** / **Contatto** (o membri gruppo personalizzati) |
| Testo | Textarea multilinea |
| Orario | Campo testo libero (es. `10:24`) |
| Spunte lettura | Select **Inviato / Ricevuto / Letto** (solo messaggi «Tu», solo WhatsApp) |
| Riordino | Pulsanti **↑** **↓** per spostare messaggi |
| Elimina | Rimuove singolo messaggio |
| Aggiungi | Pulsante tratteggiato **+ Aggiungi messaggio** |
| Spaziatura uniforme | `editor-block-fields` con `gap` fisso tra i campi |

### Chat DM (tutte le piattaforme con `DMEditorClient`)

| Funzionalità | Dettaglio |
|--------------|-----------|
| Piattaforme | WhatsApp, Instagram DM, Facebook Messenger, TikTok DM, YouTube Inbox |
| Contatto | Nome, stato (es. «online»), avatar (upload immagine) |
| Sfondo chat | Vedi sezione dedicata sotto |
| Messaggi | `MessageListEditor` completo |
| Anteprima bolle | `BubblesStack` con tema bolle per piattaforma |
| Header chat | Avatar, nome, stato, freccia indietro, menu `⋯` |
| Temi bolle | Colori/forme diversi per piattaforma (`lib/chat-themes.ts`) |
| Shell conmotione | `DMChatShell` — header + area messaggi scrollabile |

### Sfondo chat personalizzabile (`ChatBackgroundEditor`)

| Funzionalità | Dettaglio |
|--------------|-----------|
| Dove | DM (tutte), gruppo WhatsApp, singolo messaggio WhatsApp |
| Predefinito | Colore tinta piattaforma (es. WhatsApp beige `#efeae2`, senza pattern) |
| Tinta unita | `ColorPicker` 100% custom (vedi sotto) |
| Immagine | Upload file (data URL) come sfondo chat |
| Per piattaforma | Default diversi: bianco IG/FB, nero TikTok, `#0f0f0f` YouTube |

### Color picker custom (`ColorPicker`)

| Funzionalità | Dettaglio |
|--------------|-----------|
| Trigger | Swatch colore + hex + chevron (stile editor) |
| Area saturazione/valore | Drag 2D con cursore |
| Slider tonalità | Arcobaleno HSV 0–360° |
| Input hex | Campo testo `#rrggbb` sincronizzato |
| Preset | Swatch rapidi (colori chat + palette comune) |
| Utility | `lib/color-utils.ts` (hex ↔ HSV) |
| Stili | Classi `.color-picker-*` in `globals.css` |

### WhatsApp — funzionalità specifiche

| Funzionalità | Dettaglio |
|--------------|-----------|
| Chat DM | Header verde `#008069`, sfondo chat beige, spunte lettura |
| Gruppo | Nome gruppo, lista membri, avatar per membro, nome colore su messaggi altrui |
| Membri gruppo | Aggiungi/rimuovi (eccetto «Tu»), upload avatar (`GroupMembersEditor`) |
| Mittenti gruppo | Select con ogni membro + Tu |
| Singolo messaggio | Un messaggio su sfondo chat; mittente Tu/Contatto; spunte se Tu |
| Spunte SVG | `ReadTicks` — 1 grigia (inviato), 2 grigie (ricevuto), 2 blu `#53C2EC` (letto) |
| Notifica push | Stile lock screen; opzione gruppo + nome gruppo |
| Export bolla singola | Pulsante «Esporta PNG messaggio trasparente» |

### Notifiche push (`NotificationEditorClient`)

| Funzionalità | Dettaglio |
|--------------|-----------|
| Piattaforme | WhatsApp, Instagram, Facebook (Messenger), TikTok, YouTube |
| Campi | Nome contatto, avatar, testo messaggio, orario |
| Gruppo | Checkbox «Notifica di gruppo» + nome gruppo (WA e Messenger) |
| Stile per brand | Colori, label app, avatar fallback (`lib/notification-config.ts`) |
| Mock | `PushNotification` — card su sfondo scuro gradient |

### Post, video e commenti (`SocialEditorClient`)

| Funzionalità | Dettaglio |
|--------------|-----------|
| Piattaforme | Instagram post, Facebook post, TikTok video, YouTube video |
| Modalità vista | Toggle **Post + commenti** / **Solo commenti** (`ViewModeToggle`) |
| Campi post | Autore, immagine/thumbnail, didascalia, like/views, timestamp, avatar autore |
| Badge verificato | Checkbox account verificato sul post |
| Commenti | Lista editabile con tutti i campi sotto |
| Mock | `InstagramMock`, `FacebookMock`, `TikTokMock`, `YouTubeMock` |

### Editor commenti (`CommentListEditor`)

| Funzionalità | Dettaglio |
|--------------|-----------|
| Per commento | Username, avatar, testo, like (numero), timestamp |
| Badge verificato | Checkbox per commento |
| Risposte | Thread annidati: **+ Aggiungi risposta** sotto ogni commento |
| Riordino / elimina | Come i messaggi (su commenti principali) |
| Aggiungi | **+ Aggiungi commento** |
| Thread mock | `CommentThread` in anteprima |

### Componenti UI condivisi

| Componente | Funzionalità |
|------------|--------------|
| `Select` | Dropdown custom (no `<select>` nativo), stile viola, chiusura click esterno / Esc |
| `ImageUploadField` | Upload immagine → data URL; anteprima rotonda; **Rimuovi** a destra |
| `MoveButtons` | ↑ ↓ con disabilitazione ai bordi lista |
| `BackLink` | Link indietro con freccia animata |
| `GradientCard` | Card piattaforma con glow neon al hover |
| `NeonBrandLogo` | Logo SVG neon per brand (home + hub) |
| `MockAvatar` | Avatar con iniziale o immagine caricata |
| `ChatBubble` | Bolla messaggio tematizzata per piattaforma |
| `BubblesStack` | Stack bolle per export Senza sfondo |
| `BackgroundPills` | Toggle Sfondo / Senza sfondo |
| `ExportToolbar` | Scarica + Reset |
| `PhoneFrame` | Cornice telefono export |

### Design system (`app/globals.css`)

| Elemento | Descrizione |
|----------|-------------|
| `.editor-panel` | Pannello editor/anteprima con bordo e gradient scuro |
| `.editor-input` | Input/textarea scuri con focus viola |
| `.editor-label` | Label sezione maiuscola viola |
| `.editor-block` | Card interna con `flex flex-col gap-3` |
| `.editor-block-fields` | Stack campi con gap uniforme |
| `.editor-fields` | Stack sezioni editor |
| `.editor-dashed-btn` | Pulsante azione secondaria tratteggiato |
| `.editor-select-*` | Trigger, menu e opzioni dropdown |
| `.btn-primary` | Scarica (gradient viola) |
| `.btn-secondary` / `.btn-ghost` / `.btn-accent` | Varianti pulsanti |
| `.color-picker-*` | Pannello picker colore |
| `.platform-card` | Hover glow per card home |
| Scrollbar | Custom viola su sfondo scuro |
| Cursore | `pointer` su controlli cliccabili; `not-allowed` su disabilitati |

### Stati demo predefiniti

| File | Contenuto |
|------|-----------|
| `lib/defaults.ts` | Messaggi, gruppi, commenti, post, notifiche demo in italiano |
| Reset editor | Ripristina gli default di ogni pagina |

---

## Route complete

### Home

| Route | Descrizione |
|-------|-------------|
| `/` | Selezione piattaforma |

### WhatsApp

| Route | Editor | Export bubble |
|-------|--------|---------------|
| `/whatsapp` | Hub | — |
| `/whatsapp/chat` | Chat privata o gruppo (toggle in editor) | Sì |
| `/whatsapp/dm`, `/whatsapp/group` | Reindirizzano a `/whatsapp/chat` | — |
| `/whatsapp/single` | Singolo messaggio | Sì (+ export bolla dedicato) |
| `/whatsapp/notification` | Notifica push | No |

### Instagram

| Route | Editor | Export bubble |
|-------|--------|---------------|
| `/instagram` | Hub | — |
| `/instagram/chat` | Direct privata o gruppo (toggle in editor) | Sì |
| `/instagram/dm` | Reindirizza a `/instagram/chat` | — |
| `/instagram/comment` | Commento singolo (sticker video) | Sì (PNG trasparente) |
| `/instagram/post` | Redirect → `/instagram/comment` | — |
| `/instagram/notification` | Notifica | No |

### Facebook

| Route | Editor | Export bubble |
|-------|--------|---------------|
| `/facebook` | Hub | — |
| `/facebook/messenger` | Messenger | Sì |
| `/facebook/post` | Post + commenti | No |
| `/facebook/notification` | Notifica | No |

### TikTok

| Route | Editor | Export bubble |
|-------|--------|---------------|
| `/tiktok` | Hub | — |
| `/tiktok/dm` | DM | Sì |
| `/tiktok/video` | Video + commenti | No |
| `/tiktok/notification` | Notifica | No |

### YouTube

| Route | Editor | Export bubble |
|-------|--------|---------------|
| `/youtube` | Hub | — |
| `/youtube/dm` | Inbox | Sì |
| `/youtube/video` | Video + commenti | No |
| `/youtube/notification` | Notifica | No |

---

## Struttura progetto

```
app/
  page.tsx                 # Home
  layout.tsx               # Layout root, font Geist
  globals.css              # Tema, editor, color picker, scrollbar
  whatsapp/ instagram/ …   # Hub + editor per piattaforma

components/
  brand/NeonBrandLogo.tsx
  editor/
    DMEditorClient.tsx       # Editor chat unificato
    SocialEditorClient.tsx   # Post/video + commenti
    NotificationEditorClient.tsx
    MessageListEditor.tsx
    ChatBackgroundEditor.tsx
    CommentListEditor.tsx
    PostFieldsEditor.tsx
    GroupMembersEditor.tsx
    ViewModeToggle.tsx
  mockups/
    dm/                      # Shell + DM per piattaforma
    bubbles/                 # ChatBubble, BubblesStack
    ReadTicks.tsx
    PushNotification.tsx
    WhatsAppGroup.tsx
    WhatsAppSingleMessage.tsx
    InstagramMock.tsx FacebookMock.tsx TikTokMock.tsx YouTubeMock.tsx
    CommentThread.tsx MockAvatar.tsx
  shared/
    EditorLayout.tsx PhoneFrame.tsx ExportToolbar.tsx
    ColorPicker.tsx Select.tsx ImageUploadField.tsx
    BackgroundPills.tsx PageShell.tsx PlatformHub.tsx GradientCard.tsx …

lib/
  types.ts                   # Message, DMChatState, ChatBackground, Comment, Post…
  defaults.ts
  chat-background.ts chat-themes.ts color-utils.ts
  export-image.ts export-bubble.tsx
  platforms.ts brand.ts notification-config.ts
```

---

## Documentazione per sviluppatori

| File | Scopo |
|------|--------|
| [`README.md`](./README.md) | Questo file — funzionalità e route |
| [`AI.md`](./AI.md) | Regole per agenti AI + convenzioni codice |

### Manutenzione

Quando implementi una nuova funzionalità:

1. Aggiungila alla sezione **Funzionalità implementate** (tabella appropriata).
2. Aggiorna **Route complete** se aggiungi pagine.
3. Aggiorna **Struttura progetto** se aggiungi file rilevanti.
4. Aggiorna **Ultimo aggiornamento** in cima.
5. Estendi [`AI.md`](./AI.md) se ci sono nuove regole persistenti.

---

## Licenza / uso

Solo per **demo autorizzate**. Non usare per ingannare utenti reali.
