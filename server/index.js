const express = require('express');

const path = require('path');

const app = express();

const bodyParser = require('body-parser');

var cors = require('cors');

const publicPath = path.join(__dirname, '../build');
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// Directorio Público
app.use(express.static(publicPath));

// Rutas
const routes = require('./routes');
app.use('/api', routes);

app.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});
