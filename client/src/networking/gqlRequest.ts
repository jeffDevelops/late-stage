export const gqlRequest = <T>(data?: T, headers: Record<string, unknown> = {}): RequestInit => {
  return {
    mode: 'cors' as RequestMode,
    credentials: 'include' as RequestCredentials,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    body: data ? JSON.stringify(data) : JSON.stringify({}),
  }
}
