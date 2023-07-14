import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { RaceFilterOptions } from './interfaces/filters';
import { RaceResult } from './race.entity';
import { DateUtils } from 'src/utils/date_utils';

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(RaceResult)
    private raceRepository: Repository<RaceResult>,
  ) {}

  findAll(filters: RaceFilterOptions): Promise<RaceResult[]> {
    if (filters.year) {
      const date_range = DateUtils.getStartEndYear(filters.year);
      filters.date = Between(date_range.from, date_range.to);
      delete filters.year;
    }

    return this.raceRepository.find({
      where: filters,
    });
  }
}
