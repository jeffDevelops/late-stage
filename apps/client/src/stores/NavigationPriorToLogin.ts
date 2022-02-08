import { writable } from 'svelte/store'
import type { Writable } from 'svelte/types/runtime/store'

interface NavigationStatePriorToLogin {
  url: string
  isExternal: boolean
}

const { subscribe, set }: Writable<NavigationStatePriorToLogin | null> =
  writable<NavigationStatePriorToLogin | null>(null)

/**
 * @description
 *
 * A window.location.href string or null
 *
 * Maintain the navigation state before the user is
 * prompted to log in.
 *
 * When a user tries to do something only a registered
 * user is authorized to do, remember where they were
 * before prompting them to sign up.
 */
export const navigationStatePriorToLogin = {
  subscribe,
  set,
}
