import { nodeResolve } from '@rollup/plugin-node-resolve';

import { terser } from "rollup-plugin-terser";
import compiler from '@ampproject/rollup-plugin-closure-compiler';

export default [{
  treeshake: true,
  input: 'src/mapshaper.simplify.js',
  output: [{
    format: 'esm',
    file: 'mapshaper.simplify.mjs',
    intro: 'var global = {}'
  }],
  plugins: [
    
    nodeResolve(), 
    compiler({}),
    terser({
      module:true, 
      keep_fnames: true,
      keep_classnames: true,
      mangle: false,
      compress: {
        hoist_funs: true,
        hoist_props: false,
          passes: 3
        }
      }),
    ] 
}];
