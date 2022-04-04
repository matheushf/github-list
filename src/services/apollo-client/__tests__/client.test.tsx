import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { cache, addAuthTokenToRequest } from '../config';

jest.mock('apollo-client');
jest.mock('apollo-link');
jest.mock('apollo-link-http');
jest.mock('../config');

describe('Graphql client', () => {
  it('should instantiate the client with the right args', () => {
    // eslint-disable-next-line global-require
    require('../client');

    expect(ApolloClient).toHaveBeenCalledWith({
      cache,
      link: ApolloLink.from([
        addAuthTokenToRequest,
        new HttpLink({
          uri: process.env.REACT_APP_GITHUB_GRAPHQL,
        }),
      ]),
    });
  });
});
