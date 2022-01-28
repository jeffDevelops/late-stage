export const req = {
  id: 'req-1',
  context: {},
  params: {},
  raw: {
    socket: {
      remoteAddress: '127.0.0.1',
    },
    url: '/graphql',
    method: 'POST',
  },
  body: {
    query: `mutation TestMutation ($test: Test!) {
  testMutation (test: $test) {
    id
  }
}`,
    variables: {
      test: 'test',
    },
    operationName: 'TestMutation',
  },
}
