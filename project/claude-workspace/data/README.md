# data/

This folder holds your Waypoint data file, the one JSON document the web app and Claude Code share.

| File | What it is |
|---|---|
| `waypoint-data.json` | **Your real data.** You put it here: export it from the web app (Data & Settings, then **Export for Claude Code**), or let `/start` create it. Claude reads and updates it. |
| `waypoint-data.backup.json` | A safety copy Claude makes before large changes. You can restore it by renaming it. |
| `waypoint-data.example.json` | A small, fictional example ("Alex Rivera"). Use it to see the format, or copy it to `waypoint-data.json` to try the commands without your own data. It's flagged `"demo": true`. |

The format is described in `../../docs/DATA-SCHEMA.md` (and summarized in `../CLAUDE.md`).

## Getting your data here

1. Open the Waypoint web app, go to **Data & Settings**, and click **Export for Claude Code**.
2. Move or copy the downloaded `waypoint-data.json` into this folder. If your browser named it `waypoint-data (1).json`, rename it.
3. In a terminal in `claude-workspace/`, run `claude`, then `/start`.

## Sending it back

After Claude has made changes, open the web app, go to **Data & Settings**, click **Import from Claude Code**, and pick this folder's `waypoint-data.json`. The import merges by id: the newer `updatedAt` wins, and new pending actions show up in the **Approval Queue**. Run `/sync` first to validate the file.

## Keep it private

- `waypoint-data.json` contains your contact details, salary and job search history. **Never commit it to git or share it publicly.**
- `claude-workspace/.gitignore` already ignores every `.json` in this folder except the example. Check with `git status` before any commit.
- If you use a cloud-synced folder (OneDrive, Dropbox, iCloud), remember this file syncs too.
- The Anthropic API key you may use in the web app is **never** stored in this file.
