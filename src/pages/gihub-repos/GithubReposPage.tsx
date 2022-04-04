import React, { useState } from 'react';
import { Table, Typography, Row, Col } from 'antd';
import { useFetchReposQuery } from 'services/apollo-client/types';
import { REPO_TABLE_COLUMNS } from './helper';

function GithubReposPage(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const {
    data: repos,
    refetch,
    loading,
  } = useFetchReposQuery({
    variables: { pageSize, after: null, before: null },
  });

  function onPageChange(page: number, newPageSize: number): void {
    setCurrentPage(page);
    setPageSize(newPageSize);
    refetch({
      pageSize: newPageSize,
      after: page > currentPage ? repos?.search.pageInfo.endCursor ?? '' : null,
      before:
        page < currentPage ? repos?.search.pageInfo.endCursor ?? '' : null,
    });
  }

  return (
    <>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={23}>
          <Typography.Title>Github Repos</Typography.Title>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={23}>
          <Table
            loading={loading}
            columns={REPO_TABLE_COLUMNS}
            dataSource={(repos?.search?.nodes as any) ?? []}
            pagination={{
              total: (currentPage + 1) * pageSize,
              current: currentPage,
              defaultCurrent: 1,
              simple: true,
              onChange: onPageChange,
            }}
          />
        </Col>
      </Row>
    </>
  );
}

export default GithubReposPage;
