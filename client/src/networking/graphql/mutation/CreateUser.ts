export const CREATE_USER = `#graphql
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      username
      email
      emailConfirmed
    }
  }
`
