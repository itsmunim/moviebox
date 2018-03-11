const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const statusCodes = require('http-status-codes');
const debug = require('./debugger').getDebugger('app');

let app = express();
let routes = require('./routes/index');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use('/api/', routes);

// error handling
app.use(function (err, req, res, next) {
  if (!err) {
    next();
  }

  console.error(err.stack);
  res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
    'message': 'Internal Server Error'
  });
});

// serve client
app.use(express.static(path.resolve('./dist/client')));
app.get('/*', function (req, res) {
  res.sendFile(path.resolve('./index.html'));
});

let port = process.env.PORT || 8080;

let server = app.listen(port, function () {
  debug('Server started on port ' + port);
});

let connections = [];
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

server.on('connection', (connection) => {
  connections.push(connection);
  debug('%s connections currently open', connections.length);
  connection.on('close', function () {
    connections = connections.filter((curr) => { return curr !== connection; });
  });
});

function shutDown() {
  debug('Received kill signal, shutting down gracefully');

  server.close(() => {
    debug('Closed out remaining connections');
    process.exit(0);
  });

  connections.forEach((curr) => {
    curr.end();
  });

  setTimeout(() => {
    connections.forEach((curr) => {
      curr.destroy();
    });
  }, 5000);

  setTimeout(() => {
    debug('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

