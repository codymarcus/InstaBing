import React from 'react';

import ImageCardList from './image_card_list';

export default function Home() {
  return (
    <div className="home">
      <h2>Feed</h2>
      <ImageCardList />
    </div>
  );
}
