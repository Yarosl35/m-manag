import {
  ApolloLink, HttpLink,
} from '@apollo/client';
import { readEnv } from './readEnv';

const httpLink = new HttpLink({ uri: readEnv('REACT_APP_APOLLO_URL') });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${readEnv('REACT_APP_APOLLO_TOKEN')}`,
    },
  }));

  return forward(operation);
});

export { httpLink, authMiddleware };
