import React from 'react';
import { ApolloProvider } from '@apollo/react-common';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { client } from 'services/apollo-client/client';
import { graphqlMockServer } from '../../../server-mock';
import GithubReposPage from '../GithubReposPage';

function renderPage(): React.ReactNode {
  return render(
    <ApolloProvider client={client}>
      <GithubReposPage />
    </ApolloProvider>,
  );
}

describe('GithubRepos Page', () => {
  beforeAll(() => {
    graphqlMockServer.listen();
  });

  afterAll(() => {
    graphqlMockServer.close();
  });

  it('should render the right elements', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Github Repos')).toBeInTheDocument();
      expect(screen.getAllByText('repo-name')).toHaveLength(10);
    });
  });

  it('should change page when clicked on next', async () => {
    renderPage();

    userEvent.click(screen.getAllByRole('button')[1]);

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('2');
      expect(screen.getAllByText('page-two-repo-name')).toHaveLength(10);
    });
  });

  it('should change page when clicked on previous', async () => {
    renderPage();

    const previousButton = screen.getAllByRole('button')[0];
    const nextButton = screen.getAllByRole('button')[1];

    userEvent.click(nextButton);

    await waitFor(() => expect(screen.getByRole('textbox')).toHaveValue('2'));

    userEvent.click(previousButton);

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('1');
      expect(screen.getAllByText('repo-name')).toHaveLength(10);
    });
  });
});
