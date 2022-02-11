import fetch from 'isomorphic-fetch'
import type { EndpointOutput } from '@sveltejs/kit/types/endpoint'
import type { RequestEvent } from '@sveltejs/kit/types/hooks'

export const get = async (requestEvent: RequestEvent): Promise<EndpointOutput> => {
  const { request: endpointRequest } = requestEvent
  const { url } = endpointRequest

  const ip = new URLSearchParams(new URL(url).searchParams).get('ip')

  try {
    const response = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`)
    const deserializedResponse = await response.json()

    console.log({ response, deserializedResponse })
    return {
      status: response.status,
      body: deserializedResponse,
    }
  } catch (error) {
    console.log({ error })
  }
}
