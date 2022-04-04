import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from 'apollo-cache-inmemory';

import introspectionQueryResultData from '../types';

export const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export const cache = new InMemoryCache({ fragmentMatcher });
