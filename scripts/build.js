'use strict';

const esbuild = require('esbuild');

// Bundles the compiled output (dist/js/server.js) for the single-executable
// build. `app/...` specifiers are resolved against dist/js via nodePaths,
// replacing the old node_modules/app symlink hack. Run `tsc` first.
//
// `define` inlines NODE_ENV at bundle time so env branches are constant-folded
// and dead-code-eliminated, and the dynamic environment require resolves to a
// single static module -- locking the binary to one environment without ever
// mutating the source files.
const NODE_ENV = process.env.NODE_ENV || 'production';

const build = async () => {
  await esbuild.build({
    entryPoints: ['./dist/js/server.js'],
    bundle: true,
    platform: 'node',
    outfile: '.server.js',
    nodePaths: ['dist/js'],
    define: {
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    },
    external: ['better-sqlite3', 'mysql2', 'oracledb', 'pg', 'pg-query-stream', 'sqlite3', 'tedious']
  });
};

build();
