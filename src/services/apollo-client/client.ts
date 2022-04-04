import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { cache, addAuthTokenToRequest } from './config';

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    addAuthTokenToRequest,
    new HttpLink({
      uri: process.env.REACT_APP_GITHUB_GRAPHQL,
    }),
  ]),
});

export { client };
