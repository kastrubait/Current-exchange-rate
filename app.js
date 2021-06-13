import 'regenerator-runtime/runtime.js';
import express from 'express';
import axios from'axios';

import { BASE_URL } from './src/utilitis/constants.js';

const app = express();
const port = 4076;

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use('/', async (_req, res) => {
  try {
    const query = await axios.get(`${BASE_URL}/currencies`);
    const currencyAll = query.data;
    await Promise.all(currencyAll.map(async (rate) => {
      try{
        const result = await axios.get(`${BASE_URL}/rates/${rate.Cur_Abbreviation}?parammode=2`);
        if (result.data) {
          const { Date, Cur_OfficialRate } = result.data;
          Object.assign(rate, { Date: Date, Cur_OfficialRate: Cur_OfficialRate });
        }
      } catch (errors) {
        console.error(errors.message);
      }})
    );
    res.render('index', { exchangeRate: currencyAll } );
  } catch (errors) {
    console.error(errors.message);
  }
});

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})
