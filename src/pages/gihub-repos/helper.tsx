import React from 'react';
import { StarOutlined, ForkOutlined } from '@ant-design/icons';

export const REPO_TABLE_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <span>{text}</span>,
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
