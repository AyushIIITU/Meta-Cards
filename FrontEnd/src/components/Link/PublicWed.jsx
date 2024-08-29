import React from 'react';
import PublicShare from './PublicShare';
import WeddingDisplay from './WeddingDisplay';

function PublicWed({ data, height, key }) {
  return (
    <PublicShare data={data} ind={key}>
      <WeddingDisplay data={data} height={height} />
    </PublicShare>
  );
}

export default PublicWed;
