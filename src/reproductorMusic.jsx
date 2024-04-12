import React from 'react';

const reproductorMusic = () => {
  return (
    <div className="audio-container">
      <iframe 
        width="0" 
        height="0" 
        src="https://www.youtube.com/embed/-7VE3UoafmE?autoplay=1&loop=1&playlist=-7VE3UoafmE"
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      ></iframe>
    </div>
  );
};

export default reproductorMusic;
