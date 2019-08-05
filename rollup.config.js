import { readdirSync } from 'fs';
import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json'];
const CODES = [
  'THIS_IS_UNDEFINED',
  'MISSING_GLOBAL_NAME',
  'CIRCULAR_DEPENDENCY',
];

const getChunks = URI => readdirSync(path.resolve(URI))
  .filter(x => x.includes('.js'))
  .reduce((a, c) => ({ ...a, [c.replace('.js', '')]: `src/${c}` }), {});

const discardWarning = (warning) => {
  if (CODES.includes(warning.code)) {
    return;
  }

  console.error(warning);
};

const env = process.env.NODE_ENV;

const commonPlugins = () => [
  external({
    includeDependencies: true,
  }),
  babel({
    babelrc: false,
    presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
    plugins: ['@babel/plugin-proposal-class-properties', 'babel-plugin-styled-components'],
    extensions: EXTENSIONS,
    exclude: 'node_modules/**',
  }),
  commonjs({
    include: /node_modules/,
  }),
  replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
  resolve({
    alias: {
      react: require.resolve('react'),
    },
    extensions: EXTENSIONS,
    preferBuiltins: false,
  }),
];

export default [
  {
    onwarn: discardWarning,
    input: 'src/index.js',
    output: {
      esModule: false,
      file: pkg.unpkg,
      format: 'umd',
      name: 'sms-sdk-toolbox-ui',
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'styled-components': 'styled',
      },
    },
    plugins: [...commonPlugins(), env === 'production' && terser()],
  },
  {
    onwarn: discardWarning,
    input: getChunks('src'),
    output: [
      {
        dir: 'dist/esm', format: 'esm', exports: 'named', sourcemap: true,
      },
      {
        dir: 'dist/cs', format: 'cjs', exports: 'named', sourcemap: true,
      },
    ],
    plugins: commonPlugins(),
  },
];
