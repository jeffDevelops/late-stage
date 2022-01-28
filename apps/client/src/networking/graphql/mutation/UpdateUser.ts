export const UPDATE_USER = `#graphql
  mutation UpdateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      username
      email
      emailConfirmed
    }
  }
`
