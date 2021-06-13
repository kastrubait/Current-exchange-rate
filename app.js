import 'regenerator-runtime/runtime.js';
import express from 'express';

const app = express();
// const port = process.env.PORT;
const port = 4076;

app.set('view engine', 'pug');
app.set('views', './src/views');

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})
