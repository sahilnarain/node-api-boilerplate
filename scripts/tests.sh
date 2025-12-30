#!/bin/bash

NODE_ENV=test
node --test --test-concurrency=1 --experimental-test-coverage --test-force-exit --test-timeout 30000 tests/api/*.test.js
