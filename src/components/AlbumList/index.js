import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { useEventEmitter } from '../../context';

const getAlbumList = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const data = await response.json();
  return data.slice(0, 10);
};

const Album = ({ data }) => {
  return (
    <div className="album">
      <img src={data.thumbnailUrl} alt={data.title} />
      <p>{data.title}</p>
    </div>
  );
};

const AlbumList = () => {
  const query = useQuery({
    queryKey: ['albumList'],
    queryFn: getAlbumList,
  });
  const ee = useEventEmitter();
  if (ee && query.data) {
    ee.emit('updateState');
  }

  return (
    <div className="album-list">
      {query.data.map((item, index) => (
        <Album key={index} data={item} />
      ))}
    </div>
  );
};

export default AlbumList;
