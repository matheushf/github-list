import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GithubReposPage from 'pages/gihub-repos/GithubReposPage';

function AppRouter(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/github-repos" element={<GithubReposPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
