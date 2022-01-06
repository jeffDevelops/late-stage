export const gqlRequest = <T>(data?: T): RequestInit => {
  return {
    mode: 'cors' as RequestMode,
    credentials: 'include' as RequestCredentials,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: data ? JSON.stringify(data) : JSON.stringify({}),
  }
}
