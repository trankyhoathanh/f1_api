import { Between } from 'typeorm';

export interface RaceFilterOptions {
  grand_prix?: string;
  year?: string;
  date?: any;
}
