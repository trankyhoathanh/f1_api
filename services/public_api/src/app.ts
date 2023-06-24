import express from 'express';
import { Request } from 'express'
import methodOverride from 'method-override';
import compression from 'compression';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

import { QueryRaceResults }  from './services/query-race-results';
import { QueryRankingResults }  from './services/query-ranking-results';

import { RaceValidator } from './validators/joi_validate';
import { raceSchema } from './validators/race_schema';
import { rankingSchema } from './validators/ranking_schema';

const raceValidator = new RaceValidator();

const app = express();
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

app.get('/race/ranking/', raceValidator.validateQuery(rankingSchema), async (req: Request, res) => {
  const { query } = req;
  const response = await QueryRankingResults(query);
  res.json(
    {
      status: 200,
      data: response
    }
  )
})

app.get('/race', raceValidator.validateQuery(raceSchema), async (req: Request, res) => {
  const { query } = req;
  const response = await QueryRaceResults(query);
  res.json(
    {
      status: 200,
      data: response
    }
  )
})

app.get( '/', ( req, res ) => {
  res.json({
    status: 200,
    data: {
      text: 'Hearth beat'
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
