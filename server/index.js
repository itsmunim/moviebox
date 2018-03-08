const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

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
  res.status(500).send({
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
  console.log('Server started on port ' + port);
});

let connections = [];
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

server.on('connection', (connection) => {
  connections.push(connection);
  console.log('%s connections currently open', connections.length);
  connection.on('close', function () {
    connections = connections.filter((curr) => { return curr !== connection; });
  });
});

function shutDown() {
  console.log('Received kill signal, shutting down gracefully');

  server.close(() => {
    console.log('Closed out remaining connections');
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
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

