import express from 'express';
import { Request } from 'express'
import methodOverride from 'method-override';
import compression from 'compression';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

import { QueryRaceResults }  from './services/query-race-results';
import { QueryRankingResults }  from './services/query-ranking-results';
import { QueryRaceMultipleResults }  from './services/query-race-multiple';

import { TypeQuery } from './constant/query_multiple';

import { RaceValidator } from './validators/joi_validate';
import { raceSchema } from './validators/race_schema';
import { grandprixSchema } from './validators/grand_prix';
import { winnerSchema } from './validators/winner';
import { carSchema } from './validators/car';
import { lapsSchema } from './validators/laps';
import { yearSchema } from './validators/year';
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
  res.json({ list: response })
})

app.get('/race/grand_prix/:id', raceValidator.validateParams(grandprixSchema), async (req: Request, res) => {
  const { params, query } = req;
  const response = await QueryRaceMultipleResults(TypeQuery.GrandPrix, params.id, query);
  res.json({ list: response });
})

app.get('/race/winner/:id', raceValidator.validateParams(winnerSchema), async (req: Request, res) => {
  const { params, query } = req;
  const response = await QueryRaceMultipleResults(TypeQuery.Winner, params.id, query);
  res.json({ list: response });
})

app.get('/race/car/:id', raceValidator.validateParams(carSchema), async (req: Request, res) => {
  const { params, query } = req;
  const response = await QueryRaceMultipleResults(TypeQuery.Car, params.id, query);
  res.json({ list: response });
})

app.get('/race/laps/:id', raceValidator.validateParams(lapsSchema), async (req: Request, res) => {
  const { params, query } = req;
  const response = await QueryRaceMultipleResults(TypeQuery.Laps, params.id, query);
  res.json({ list: response });
})

app.get('/race/year/:id', raceValidator.validateParams(yearSchema), async (req: Request, res) => {
  const { params, query } = req;
  const response = await QueryRaceMultipleResults(TypeQuery.Year, params.id, query);
  res.json({ list: response });
})

app.get('/race', raceValidator.validateQuery(raceSchema), async (req: Request, res) => {
  const { query } = req;
  const response = await QueryRaceResults(query);
  res.json({ list: response })
})

app.get( '/', ( req, res ) => {
  res.json({ text: 'Hearth beat' })
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
