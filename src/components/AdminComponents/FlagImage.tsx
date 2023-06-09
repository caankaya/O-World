import React from 'react';

type FlagImageProps = {
  src: string,
};

export const FlagImage: React.FC<FlagImageProps> = ({ src }) => {
  return <img className="w-8 h-8 mr-4 object-cover rounded-md" src={src} alt="" />;
};
