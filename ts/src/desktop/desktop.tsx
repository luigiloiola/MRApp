import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppWindow } from '../AppWindow';
import { kWindowNames } from '../consts';

const Desktop = () => {
  return (
    <div>
      <h1>Desktop Window</h1>
      <p>jkashjashdka.</p>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Desktop />);
}

new AppWindow(kWindowNames.desktop);