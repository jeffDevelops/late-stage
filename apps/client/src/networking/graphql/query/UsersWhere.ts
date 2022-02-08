export const USERS_WHERE = `#graphql
  query UsersWhere($where: UserWhereInput!) {
    users(where: $where) {
      id
    }
  }
`
