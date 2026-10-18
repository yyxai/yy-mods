import { test, expect } from 'claude-code/testing'

test('sets the status line and a toast on an interactive session start', async ($, on) => {
  const status: Array<string | undefined> = []
  const toasts: string[] = []
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('ui.status', ($, e, next) => (status.push(e.text), next(e)))
  on('ui.toast', ($, e, next) => (toasts.push(e.text), next(e)))

  await $.session.start({ cwd: '/tmp', surface: 'terminal', isInteractive: true })

  expect(status).toEqual(['hello: loaded'])
  expect(toasts).toEqual(['hello mod is active'])
})

test('stays quiet in a non-interactive session', async ($, on) => {
  const seen: string[] = []
  on('session.start', ($, e) => ({ cwd: e.cwd }))
  on('ui.status', ($, e, next) => (seen.push('status'), next(e)))
  on('ui.toast', ($, e, next) => (seen.push('toast'), next(e)))

  await $.session.start({ cwd: '/tmp', surface: null, isInteractive: false })

  expect(seen).toEqual([])
})
