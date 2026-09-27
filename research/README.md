# Anonymous lecture usage logging (STA2002)

## What is collected

From interactive lecture sites only (when `VITE_USAGE_LOG_URL` is set at build time):

| Event | Fields |
|---|---|
| `session_start` | course, lecture, anonymous sessionId, timestamp |
| `scene_view` | + page, sceneId, chapter, label, isGame |
| `game_interact` | + coarse detail (`button` / `change`), debounced ≥1.5s |

**Not collected:** student name, student ID, seat, IP (beyond whatever Google logs), quiz answers, free text.

## One-time setup (Google Apps Script → Sheet)

1. Create a Google Sheet named e.g. `STA2002-DOTE2011-usage-log`.
2. Extensions → Apps Script. Paste `apps-script-usage-log.js`.
3. Deploy → New deployment → **Web app**
   - Execute as: Me
   - Who has access: **Anyone** (anonymous beacons cannot use campus SSO)
4. Copy the web app URL.
5. In each lecture app (or monorepo root before build), set:

```bash
# example: sta2002/confidence-intervals/.env.production
VITE_USAGE_LOG_URL=https://script.google.com/macros/s/XXXX/exec
```

Use the **same URL** for STA2002 and DOTE2011 builds; the `course` field separates rows.

6. Rebuild and deploy lecture sites so production bundles include the URL.

## Tutor question themes (manual, free)

Create a Google Form (share to both classes):

1. Course (STA2002 / DOTE2011)
2. Date
3. Lecture name
4. Page number (if known)
5. Paste your question to the AI tutor
6. Was the answer useful? (1–5)
7. Optional: paste the tutor’s first locator line (`Lecture: … · Page: …`)

Ask students to submit after tutor use (optional + light incentive).

Re-paste the updated `agent-prompt-copypaste.txt` into the Copilot agent so answers always start with the locator line.
