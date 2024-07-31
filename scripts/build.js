'use strict';

const esbuild = require('esbuild');
const fs = require('fs');

!fs.existsSync(`${__dirname}/../node_modules/app`) ? fs.symlinkSync(`${__dirname}/../app`, `${__dirname}/../node_modules/app`) : null;

const build = async () => {
  await esbuild.build({
    entryPoints: ['./server.js'],
    bundle: true,
    platform: 'node',
    outfile: '.server.js',
    external: ['better-sqlite3', 'mysql2', 'oracledb', 'pg', 'pg-query-stream', 'sqlite3', 'tedious']
  });
};

build();
