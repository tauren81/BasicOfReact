import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

createRoot(root).render(
  <React.StrictMode>
    <App />
    <Meta />
    <Links />
    <Outlet />
    <Scripts />
  </React.StrictMode>,
);
