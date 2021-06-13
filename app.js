import 'regenerator-runtime/runtime.js';
import express from 'express';
import axios from'axios';


const BASE_URL = 'https://www.nbrb.by/api/exrates/currencies';

const app = express();
// const port = process.env.PORT;
const port = 4076;

app.set('view engine', 'pug');
app.set('views', './src/views');

app.get('/', async (_req, res) => {
  try {
    const query = await axios.get(`${BASE_URL}`);
    const exchangeRate = query.data;
    console.log(`GET: Here's the list of exchange rate`, Array.isArray(exchangeRate));
    res.render('index', exchangeRate);
  } catch (errors) {
    console.error(errors);
  }
});

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})
