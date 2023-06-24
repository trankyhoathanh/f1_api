import express from 'express';
import methodOverride from 'method-override';
import compression from 'compression';
import bodyParser from 'body-parser';

import { createConnection } from 'typeorm';
import { autoGetRaceResults }  from './services/auto-race-results';

const app = express();
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

app.get('/race-result', async (req, res) => {
  await autoGetRaceResults();
  res.json(
    {
      status: 200,
      data: 'Get data from race result succeed !'
    }
  );
})

app.get( '/', ( req, res ) => {
  res.json({
    status: 200,
    data: {
      text: 'OK'
    }
  })
});

app.listen(3000, async () => {
  try {
    await createConnection();
    console.log('Connect database success !');
  } catch (error) {
    console.log(`Connect database error !`);
    console.log(error);
  }
  
  console.log('Server is listening on port 3000');
})
