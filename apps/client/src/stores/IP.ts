import { browser } from '$app/env'
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/types/runtime/store'
import { env } from '../networking/env'
import { LocalStorageKeys } from '../types/LocalStorageKeys'

export type IPState =
  | 'LOADING'
  | 'ERROR'
  | {
      ip: string
      geo: {
        geoplugin_status: 200
        geoplugin_city: string
        geoplugin_region: string
        geoplugin_countryCode: string
        geoplugin_latitude: string
        geoplugin_longitude: string
        geoplugin_locationAccuracyRadius: string
      }
      browsingFromNewIP: boolean
      didConfirmBrowsingWithVPN: boolean
    }

const { set, subscribe, update }: Writable<IPState> = writable('LOADING')

const getIP = async (): Promise<void> => {
  if (!browser) return

  let browsingFromNewIP = false

  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json')
    const { ip } = await ipResponse.json()

    const cachedIpInfo = localStorage.getItem(LocalStorageKeys.IP)
    if (cachedIpInfo) {
      const parsed = JSON.parse(cachedIpInfo)

      if (parsed.ip === ip) {
        return set({ ...parsed, ip, geo: parsed.geo, browsingFromNewIP })
      } else {
        browsingFromNewIP = true
      }
    }

    const geoResponse = await fetch(`${env.viteSveltekitHost}/proxy/ip-geolocation?ip=${ip}`)
    const deserializedGeoResponse = await geoResponse.json()

    if (deserializedGeoResponse?.geoplugin_status === 200) {
      set({ didConfirmBrowsingWithVPN: false, ip, geo: deserializedGeoResponse, browsingFromNewIP })

      localStorage.setItem(
        LocalStorageKeys.IP,
        JSON.stringify({
          didConfirmBrowsingWithVPN: false,
          ip,
          geo: deserializedGeoResponse,
          browsingFromNewIP,
        }),
      )
    } else {
      set('ERROR')
    }
  } catch (error) {
    console.error(error)
  }
}

getIP()
if (browser) setInterval(getIP, 30000)

export const ip = {
  subscribe,
  set,
  getIP,
  refreshIP: async (): Promise<void> => {
    if (!browser) return

    localStorage.removeItem(LocalStorageKeys.IP)
    return await getIP()
  },
  confirmIP: (): Promise<void> => {
    if (!browser) return

    update((state: IPState) => {
      if (typeof state !== 'object') return state

      localStorage.setItem(
        LocalStorageKeys.IP,
        JSON.stringify({ ...state, didConfirmBrowsingWithVPN: true }),
      )

      return { ...state, browsingFromNewIP: false, didConfirmBrowsingWithVPN: true }
    })
  },
}
