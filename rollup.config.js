import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/router.js',
    format: 'umd',
    name: 'router',
    exports: 'named',
    sourcemap: true,
    globals: {
      hyperapp: 'hyperapp',
    },
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
  external: ['hyperapp'],
}
