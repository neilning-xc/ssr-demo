import React, { useState } from 'react';

import Layout from '../Layout';

import './Home.css';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <div>
        <h1>My React SSR App-Home</h1>
        <div>
          <button onClick={() => setCount(count - 1)}>-1</button>
          <input value={count} onChange={(event) => setCount(parseInt(event.target.value))} />
          <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
