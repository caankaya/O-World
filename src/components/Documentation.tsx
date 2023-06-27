import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="/docs/index.html"
        title="Documentation"
        style={{ border: 'none', height: '100%', width: '100%' }}
      />
    </div>
  );
};

export default Documentation;
