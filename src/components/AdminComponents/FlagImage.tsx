import React from 'react';

export const FlagImage = ({ src }: { src: string }) => {
  return (
    <img className="w-8 h-8 mr-4 object-cover rounded-md" src={src} alt="" />
  );
};
