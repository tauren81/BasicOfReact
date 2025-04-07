import { resolve } from 'path';

export const entry = './assets/js/index.js';
export const output = {
  filename: 'bundle.js',
  path: resolve(__dirname, 'dist'),
};
