const gqlRequest = (data, headers = {}) => {
  return {
    mode: "cors",
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers
    },
    body: data ? JSON.stringify(data) : JSON.stringify({})
  };
};
export { gqlRequest as g };
