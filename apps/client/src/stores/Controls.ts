import { writable } from 'svelte/store'

export const shouldDisplayControls = writable<boolean>(true)
