import * as React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
