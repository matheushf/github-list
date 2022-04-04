import faker from '@faker-js/faker';
import { addMocksToSchema } from '@graphql-tools/mock';
import { buildClientSchema, execute } from 'graphql';
import { gql } from 'graphql-tag';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import introspection from './services/apollo-client/schema.json';

const schema = buildClientSchema(introspection as any);

const mockedSchema = addMocksToSchema({
  schema,
  mocks: {
    Int: () => faker.datatype.number({ min: 0, max: 100 }),
    Float: () => faker.datatype.float({ min: 0, max: 100 }),
    SearchResultItemConnection: () => ({
      nodes: [
        ...[...Array(10)].map(() => ({
          __typename: 'Repository',
          nameWithOwner: 'repo-name',
        })),
        ...[...Array(10)].map(() => ({
          __typename: 'Repository',
          nameWithOwner: 'page-two-repo-name',
        })),
      ],
    }),
  },
});

const graphqlMockServer = setupServer(
  rest.post<{ query: string; variables: any }>(
    process.env.REACT_APP_GITHUB_GRAPHQL || '',
    async (req, res, ctx) => {
      const result = await execute({
        document: gql`
          ${req.body.query}
        `,
        schema: mockedSchema,
        variableValues: req.body.variables,
      });

      return res(ctx.json(result));
    },
  ),
);

export { graphqlMockServer };
