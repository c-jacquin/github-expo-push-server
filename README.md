[![Build Status](https://travis-ci.org/charjac/github-expo-push-server.svg?branch=staging)](https://travis-ci.org/charjac/github-expo-push-server)
[![Coverage Status](https://coveralls.io/repos/github/charjac/github-expo-push-server/badge.svg?branch=staging)](https://coveralls.io/github/charjac/github-expo-push-server?branch=master)
[![Dependency Status](https://david-dm.org/charjac/github-expo-push-server.svg)](https://david-dm.org/charjac/github-expo-push-server) [![devDependency Status](https://david-dm.org/charjac/github-expo-push-server/dev-status.svg)](https://david-dm.org/charjac/github-expo-push-server#info=devDependencies)

# Github expo push notifications server

## Quick Start

This starter works with `npm` or [`yarn`](http://yarnpkg.com).

Install:

```sh
yarn # or npm install
```

Run in dev mode, restarting the server on file changes:

```sh
yarn dev
```

Run unit tests:

```sh
yarn test
```

Run in prod mode, not daemonized, with staging config (suitable for Heroku):

```sh
yarn build
yarn start
```

Start/stop in prod mode, daemonized, with local config:

```sh
yarn build
yarn local:start
yarn local:stop
```

Start/stop in prod mode, daemonized mode, with staging config:

```sh
yarn build
yarn staging:start
yarn staging:stop
```

Build (or update) the API documentation to `api.html` in the root:

```sh
yarn raml
```

