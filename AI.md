# Istruzioni per agenti AI — Fake Social

Questo file raccoglie **tutte le regole** del proprietario del progetto e le convenzioni di sviluppo.  
Leggilo all’inizio di ogni sessione. Quando l’utente aggiunge una nuova regola in chat, **aggiorna questo file** nella sezione appropriata (o in «Regole dal proprietario»).

**Ultimo aggiornamento:** 2026-05-17

---

## Obbligo di manutenzione documentazione

1. Dopo modifiche rilevanti al codice, **aggiorna [`README.md`](./README.md)** con **tutte** le funzionalità implementate (tabelle per area), route complete, struttura, data «Ultimo aggiornamento».
2. Se l’utente esprime una nuova preferenza/regola persistente, **aggiungila qui** in `AI.md`.
3. Non creare altri file markdown non richiesti (piani in `.cursor/plans/`, doc spurie).

---

## Regole dal proprietario (progetto)

### Git e deploy

- **Dopo ogni modifica** (o batch di modifiche coerente): `git add`, **commit** e **push su `main`** su `pallii58/fakesocial_viralclub`.
- Messaggio commit: 1–2 frasi sul *perché*; usa HEREDOC.
- Mai `git config` globale/repo; mai force push su `main`; mai `--no-verify` salvo richiesta.
- Messaggi commit: 1–2 frasi sul *perché*; usa HEREDOC per il body.
- PR: usare `gh`; seguire il workflow in user rules (status, diff, log, push -u, `gh pr create`).

### Codice

- Modifiche **minime e mirate** — niente refactor non richiesti, niente pulizie drive-by.
- Leggere il codice circostante; **stesso stile** del file (naming, tipi, import).
- Riutilizzare funzioni/componenti esistenti invece di duplicare.
- **Non usare tag `motion`** per HTML — è un errore ricorrente; usare sempre `motion` → **`div`** (elementi React normali).
- Non modificare `.cursor/plans/` se presenti.
- UI in **italiano**; tema scuro `#050508`, accenti viola; risultati curati e coerenti.

### Comunicazione con l’utente

- Risposte chiare, in italiano se l’utente scrive in italiano.
- Citare codice esistente con il formato `` `startLine:endLine:path` `` (fence su riga propria).
- Link completi (GitHub, URL) senza abbreviare.
- Proporzionare la lunghezza della risposta al compito.

### Ambiente

- Ambiente reale: **eseguire comandi** e verificare (`npm run build`, ecc.), non arrendersi al primo errore.

---

## Convenzioni Fake Social

### Anteprima ed export

| Pillola | Anteprima | Export |
|---------|-----------|--------|
| **Sfondo** | Telefono completo (`PhoneFrame` + mock) | PNG trasparente; sfondo chat/header del mock visibili |
| **Senza sfondo** | Solo messaggi su scacchiera | PNG trasparente; suffisso `-messaggi` |

- `PhoneFrame` → `mock-export-root`: sfondo **trasparente** (`bg-transparent`), non bianco.
- `ExportToolbar`: `transparentExport` per editor con bolle; `exportSuffix` per `-messaggi`.

### Sfondo chat

- Tipi: `ChatBackground` in `lib/types.ts` — `default` | `solid` | `image`.
- Resolver: `lib/chat-background.ts` → `resolveChatBackground`.
- Editor: `ChatBackgroundEditor` nei DM, gruppo WhatsApp, singolo messaggio.

### Spunte WhatsApp (`ReadTicks`)

- **Inviato**: una spunta stroke (stessa scala delle doppie).
- **Ricevuto / Letto**: due spunte stroke, compatte, stessa altezza, distanza regolata dall’utente.
- Colori: grigio `#8696A0`, blu letto `#53C2EC`.

### Editor UI

- **ColorPicker** (`components/shared/ColorPicker.tsx`): picker 100% custom, no `<input type="color">`. Stili in `.color-picker-*` su `globals.css`. Utility colori: `lib/color-utils.ts`.
- Spaziatura uniforme: `.editor-fields` (tra sezioni), `.editor-block` (dentro le card).
- Cursore:pointer su controlli cliccabili (vedi `globals.css`).
- Label sezioni: `.editor-label` (es. «Messaggi», «Sfondo chat»).

### File chiave

| Area | Path |
|------|------|
| Layout editor | `components/shared/EditorLayout.tsx` |
| Frame telefono | `components/shared/PhoneFrame.tsx` |
| Export | `components/shared/ExportToolbar.tsx`, `lib/export-image.ts` |
| DM generico | `components/editor/DMEditorClient.tsx` |
| Shell chat | `components/mockups/dm/DMChatShell.tsx` |
| Temi bolle | `lib/chat-themes.ts` |
| Stili globali | `app/globals.css` |

### Nuova piattaforma / route

1. Hub in `app/<platform>/page.tsx` + `PlatformHub`.
2. Mock in `components/mockups/`.
3. Voce in `lib/platforms.ts` se serve in home.
4. **Aggiornare `README.md`** (tabella route).
5. Default in `lib/defaults.ts` se serve.

---

## Regole Cursor / utente (generali)

> Sezione da allineare alle user rules di Cursor; estendere quando l’utente ne aggiunge di nuove.

### Git safety (riepilogo)

- No amend salvo condizioni strette (commit proprio, non pushato, utente lo chiede).
- No commit file segreti (`.env`, credenziali).
- No `git -i` (interattivo non supportato).

### Pull request

- Usare `gh` per GitHub.
- Prima: `git status`, `git diff`, log vs base branch.
- Body PR con Summary + Test plan (HEREDOC).

### Codice (generali)

- Ogni riga del diff deve servire la richiesta.
- Evitare commenti ovvi, docstring ridondanti, try/catch difensivi inutili.
- Non cancellare codice non correlato al task.

### Skills Cursor

- Se esiste uno skill pertinente in `~/.cursor/skills-cursor/`, **leggerlo e applicarlo** prima di improvvisare.

---

## Come aggiungere una nuova regola

Quando l’utente dice qualcosa del tipo *«da ora in poi…»*, *«non fare mai…»*, *«usa sempre…»*:

1. Copia la regola in **«Regole dal proprietario»** o **«Convenzioni Fake Social»** (la sezione più adatta).
2. Aggiorna **Ultimo aggiornamento** in questo file e, se serve, nel README.
3. Conferma brevemente all’utente che la regola è stata salvata in `AI.md`.

### Template nuova regola

```markdown
### [Titolo breve] (YYYY-MM-DD)

- [regola 1]
- [regola 2]
```

---

## Checklist fine task

- [ ] `npm run build` ok
- [ ] Nessun tag `motion` spurio introdotto
- [ ] `README.md` aggiornato se comportamento/route pubblici cambiano
- [ ] `AI.md` aggiornato se nuove regole persistenti
- [ ] Commit + push su `main` completati
