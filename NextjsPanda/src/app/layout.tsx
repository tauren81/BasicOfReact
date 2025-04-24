import './styles/index.css';
import React from 'react';

import StyledJsxRegistry from './registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <div>{children}</div>
        <div>
          <StyledJsxRegistry>{children}</StyledJsxRegistry>
        </div>
      </body>
    </html>
  );
}
