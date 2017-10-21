import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue2';
import commonJS from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import globals from 'rollup-plugin-node-globals';
import path from 'path';

export default {
  input: path.resolve(__dirname, 'src/index.js'),
  output: {
    file: path.resolve(__dirname, '../../public/form.js'),
    format: 'iife'
  },
  plugins: [
    vue(),
    resolve(),
    commonJS(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify(),
    globals()
  ]
};
