import babel from '@rollup/plugin-babel';
import pkg from './package.json';

const EXTERNALS = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export const DEFAULT_OUTPUT = {
  exports: 'named',
  globals: {
    'billboard.js': 'billboard',
    'prop-types': 'PropTypes',
    react: 'React',
  },
  name: pkg.name,
  sourcemap: true,
};

export const DEFAULT_CONFIG = {
  external: EXTERNALS,
  input: 'src/index.js',
  output: [
    { ...DEFAULT_OUTPUT, file: pkg.browser, format: 'umd' },
    { ...DEFAULT_OUTPUT, file: pkg.main, format: 'cjs' },
    { ...DEFAULT_OUTPUT, file: pkg.module, format: 'es' },
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      include: ['src/*'],
    }),
  ],
};

export default DEFAULT_CONFIG;
