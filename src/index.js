const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('combined'));

let port = process.env.PORT || 8080;

let server = app.listen(port, function () {
  console.log('Server started on port ' + port);
});

let connections = [];
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

server.on('connection', function (connection) {
  connections.push(connection);
  console.log('%s connections currently open', connections.length);
  connection.on('close', function () {
    connections = connections.filter(function (curr) {
      return curr !== connection;
    });
  });
});

function shutDown() {
  console.log('Received kill signal, shutting down gracefully');

  server.close(function () {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  connections.forEach(function (curr) {
    curr.end();
  });

  setTimeout(function () {
    connections.forEach(function (curr) {
      curr.destroy();
    });
  }, 5000);

  setTimeout(function () {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

