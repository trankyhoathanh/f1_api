import express from 'express';
import { Request } from 'express'
import methodOverride from 'method-override';
import compression from 'compression';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
dotenv.config();

import { QueryRaceResults }  from './services/query-race-results';
import { QueryRankingResults }  from './services/query-ranking-results';
import { QueryRaceMultipleResults }  from './services/query-race-multiple';
import { QueryRankingMultipleResults }  from './services/query-ranking-multiple';

import { TypeQuery, TypeQueryRanking } from './constant/query_multiple';

import { RaceValidator } from './validators/joi_validate';
import { raceSchema } from './validators/race_schema';
import { grandprixSchema } from './validators/grand_prix';
import { winnerSchema } from './validators/winner';
import { carSchema } from './validators/car';
import { lapsSchema } from './validators/laps';
import { yearSchema } from './validators/year';
import { rankingSchema } from './validators/ranking_schema';
import { rankingMultipleSchema } from './validators/ranking_multiple_schema';
import { RateLimitRule, rateLimitSchema } from './system/rate_limit';
import { AppDataSource } from './db/data-source';

const raceValidator = new RaceValidator();
const rate = new rateLimitSchema();

const app = express();
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

const HEART_RATE_LIMIT_RULE: RateLimitRule = {
  endpoint: '/',
  rate_limit: {
    time: 1,
    limit: 1
  }
}

app.get('/ranking/car/:id', raceValidator.validateQuery(rankingMultipleSchema), async (req: Request, res) => {
  const { params, query } = req;
  const response = await QueryRankingMultipleResults(TypeQueryRanking.Car, params.id, query);
  res.json({ list: response })
})

app.get('/ranking/winner/:id', raceValidator.validateQuery(rankingMultipleSchema), async (req: Request, res) => {
  const { params, query } = req;
  const response = await QueryRankingMultipleResults(TypeQueryRanking.Winner, params.id, query);
  res.json({ list: response })
})

app.get('/ranking/', raceValidator.validateQuery(rankingSchema), async (req: Request, res) => {
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

app.get( '/', rate.limit(HEART_RATE_LIMIT_RULE), async (req, res) => {
  res.json({ text: 'Hearth beat' })
});

app.listen(3000, async () => {
  try {
    await AppDataSource.initialize();
    console.log('Connect database success !');
  } catch (error) {
    console.log(`Connect database error !`);
    console.log(error);
  }
  
  console.log('Server is listening on port 3000');
})
