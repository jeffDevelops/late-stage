import { writable } from 'svelte/store'
import type { Writable } from 'svelte/types/runtime/store'
import { SessionStorageKeys } from '../types/SessionStorageKeys'

export type PrefersColorScheme = 'light' | 'dark'

const isBrowser = typeof window !== 'undefined'

export const computeInitialColorScheme = (): PrefersColorScheme => {
  if (!isBrowser) return 'dark'

  /** Prioritize session storage */
  if (window.sessionStorage.getItem(SessionStorageKeys.PrefersColorScheme)) {
    const storageValue = window.sessionStorage.getItem(SessionStorageKeys.PrefersColorScheme)

    /** Prioritize sessionStorage value only if valid */
    if (storageValue === 'dark' || storageValue === 'light') {
      return storageValue as PrefersColorScheme
    }
  }

  /** Otherwise, use the user's OS preference */
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ('dark' as const)
    : ('light' as const)
}

const theme = computeInitialColorScheme()

// With the theme computed, update the styles
const updateRootStyles = (prefersColorScheme: PrefersColorScheme) => {
  if (isBrowser) {
    document.firstElementChild.classList.add(
      prefersColorScheme === 'dark' ? 'dark-theme' : 'light-theme',
    )
    document.firstElementChild.classList.remove(
      prefersColorScheme === 'dark' ? 'light-theme' : 'dark-theme',
    )
  }
}

updateRootStyles(theme)

const { set, subscribe }: Writable<PrefersColorScheme> = writable<PrefersColorScheme>(theme)

export const prefersColorScheme = {
  subscribe,
  setToLight: (): void => {
    sessionStorage.setItem(SessionStorageKeys.PrefersColorScheme, 'light')
    updateRootStyles('light')
    set('light')
  },
  setToDark: (): void => {
    sessionStorage.setItem(SessionStorageKeys.PrefersColorScheme, 'dark')
    updateRootStyles('dark')
    set('dark')
  },
}
