import { writable } from 'svelte/store'
import type { Writable } from 'svelte/types/runtime/store'
import type { User } from '../types/User'
import { LocalStorageKeys } from '../types/LocalStorageKeys'

const { subscribe, set }: Writable<User | null> = writable<User | null>(null)

export const currentUser = {
  subscribe,
  set,
  setUser: (user: User): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LocalStorageKeys.CurrentUser, JSON.stringify(user))
      window.dispatchEvent(new StorageEvent('storage'))
    }

    return set(user)
  },
}
