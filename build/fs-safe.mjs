/* Deleting is not always allowed where the build runs (a sandboxed agent
   shell, a synced folder that is mid-upload). Every build step that must
   remove a stale output goes through here: delete if possible, otherwise
   move it out of the tree into .transfer/stale/ (ignored by git), so the
   build output is identical either way. */
import { rmSync, renameSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { ROOT } from './tokens-lib.mjs';

export function removeOrStash(path) {
  if (!existsSync(path)) return 'absent';
  try { rmSync(path, { recursive: true, force: true }); if (!existsSync(path)) return 'removed'; } catch { /* fall through */ }
  const dest = join(ROOT, '.transfer', 'stale', String(Date.now()), relative(ROOT, path));
  mkdirSync(dirname(dest), { recursive: true });
  renameSync(path, dest);
  return 'stashed';
}
