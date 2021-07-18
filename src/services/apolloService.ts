import {
  ApolloClient, concat, InMemoryCache,
} from '@apollo/client';
import { authMiddleware, httpLink } from '../config/configApollo';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
export default client;
