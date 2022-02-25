import fetch from 'isomorphic-fetch'
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint'
import type { RequestEvent } from '@sveltejs/kit/types/hooks'
import { env } from '../../networking/env'

export const get = async (requestEvent: RequestEvent): Promise<EndpointOutput> => {
  const { request: endpointRequest } = requestEvent
  const { url } = endpointRequest

  const ip = new URLSearchParams(new URL(url).searchParams).get('ip')

  try {
    const response = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`)
    const deserializedResponse = await response.json()

    return {
      status: response.status,
      body: deserializedResponse,
      headers: {
        'Access-Control-Allow-Origin': env.viteSveltekitHost,
      },
    }
  } catch (error) {
    console.error({ error })
  }
}
