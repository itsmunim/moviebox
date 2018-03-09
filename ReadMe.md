[![Build Status](https://travis-ci.org/dibosh/moviebox.svg?branch=master)](https://travis-ci.org/dibosh/moviebox)

### Moviebox

#### Setup

- `brew install yarn`- in macOSX
- `npm install -g yarn`- in Linux
- `cd moviebox && yarn`

#### Commands
- `yarn start::server`- builds & runs the server on `localhost:8080/api/`
- `yarn watch::server`- runs server in dev mode, any changes will restart the server
- `yarn build::client`- builds client in dist
- `yarn watch::client`- runs webpack build in watch mode, any changes will rebuild the client
- `yarn start:dev`- starts the server with compiled client and the client is available at 
`localhost:8080/`


**For more clarity please check out the package.json scripts section**
