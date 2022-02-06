require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const API_KEY = process.env.API_KEY;
const axios = require('axios');

const app = express();
const url = 'https://project.trumedianetworks.com/api/token';

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/mlb/token', (req, res, next) => {
  axios.get(url, {
    headers: {
      accept: 'application/json',
      apiKey: API_KEY
    }
  })
    .then(results => {
      res.status(200).json(results.data);
    })
    .catch(err => {
      res.status(500).send('Something went wrong');
      console.error(err);
    });
}
);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
