const path = require('path');
const lwc = require('@lwc/rollup-plugin');
const replace = require('@rollup/plugin-replace');
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const alias = require('@rollup/plugin-alias');

const __ENV__ = process.env.NODE_ENV ?? 'development';

module.exports = (args) => {
    return {
        input: 'src/index.js',

        output: {
            file: 'dist/index.js',
            format: 'esm',
        },

        plugins: [
            alias({
                entries: [
                    {
                        find: "@salesforce/apex/TodoAppService.todoWireAdapter",
                        replacement: path.resolve(__dirname, 'mocks/todoWireAdapter.js')
                    },
                ]
            }),
            nodeResolve(),
            replace({
                'process.env.NODE_ENV': JSON.stringify(__ENV__),
                preventAssignment: true,
            }),
            lwc(),
            commonjs(),
            args.watch &&
                serve({
                    open: false,
                    port: 3000,
                }),
            args.watch && livereload(),
        ],
    };
};
