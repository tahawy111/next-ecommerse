const getError = (err: any): string =>
  err.response &&
  err.response.data &&
  (err.response.data.msg || err.response.data.message)
    ? err.response.data.msg || err.response.data.message
    : err.message;

export { getError };
