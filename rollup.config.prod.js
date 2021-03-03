import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import { DEFAULT_CONFIG, DEFAULT_OUTPUT } from './rollup.config';

export default {
  ...DEFAULT_CONFIG,
  output: {
    ...DEFAULT_OUTPUT,
    file: pkg.browser.replace('.js', '.min.js'),
    format: 'umd',
  },
  plugins: [
    ...DEFAULT_CONFIG.plugins,
    terser({
      compress: { passes: 3 },
    }),
  ],
};
