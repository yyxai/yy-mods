import type { Register } from 'claude-code'

// The smallest useful mod: on session start, put a line in the status bar and
// show a toast. Copy this folder to start a new mod.
export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    if (e.isInteractive) {
      $.ui.status(`${$.plugin.name}: loaded`)
      $.ui.toast(`${$.plugin.name} mod is active`)
    }
    return result
  })
}
