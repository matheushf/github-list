import React from 'react';
import { StarOutlined, ForkOutlined } from '@ant-design/icons';
import { GraphQLFetchReposQuery } from 'services/apollo-client/types';

export const REPO_TABLE_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Stars',
    dataIndex: 'stars',
    key: 'stars',
    render: (text: string) => (
      <>
        <StarOutlined style={{ marginRight: '10px' }} />
        {text}
      </>
    ),
  },
  {
    title: 'Forks',
    dataIndex: 'forks',
    key: 'forks',
    render: (text: string) => (
      <>
        <ForkOutlined style={{ marginRight: '10px' }} />
        {text}
      </>
    ),
  },
];

function getRepoNameText(repo: { url: string; name: string }): JSX.Element {
  return (
    <a href={repo.url} target="_blank" rel="noreferrer">
      {repo.name}
    </a>
  );
}

export function mapRepos(
  repos?: GraphQLFetchReposQuery,
): { [key: string]: string | JSX.Element | number }[] {
  return (
    repos?.search?.nodes?.map((repo) => ({
      ...repo,
      name: getRepoNameText(repo as any),
    })) ?? []
  );
}
