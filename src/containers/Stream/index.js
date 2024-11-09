import React, { Suspense, lazy } from 'react';

import Layout from '../../Layout';
import Loading from '../../components/Loading';

import './index.css';

const AlbumList = lazy(() => import('../../components/AlbumList'));

function Stream() {
  return (
    <Layout>
      <div>
        <Suspense fallback={<Loading />}>
          <AlbumList />
        </Suspense>
      </div>
    </Layout>
  );
}

export default Stream;
