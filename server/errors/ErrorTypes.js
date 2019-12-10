export default {
  MISSING_USER_CREDENTIALS: {
    type: 'MISSING_USER_CREDENTIALS',
    statusText: 'Missing or Invalid user credentials.',
    status: 401,
  },
  NO_USER_FOUND: {
    type: 'NO_USER_FOUND',
    statusText:
      "No user was found with those credentials. Please make sure you've entered everything correctly.",
    status: 401,
  },
};
