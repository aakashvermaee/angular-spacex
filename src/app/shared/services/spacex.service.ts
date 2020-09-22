import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import * as _ from 'lodash';
import { environment } from '../../../environments/environment';

import { SpacexProgram } from '../models/spacex-program.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpacexService {
  private _baseUrl = environment.spacex_base_uri;
  private _defaultLimit = environment.limit;
  private _spacexPrograms = new BehaviorSubject<SpacexProgram[]>(undefined);

  constructor(private _http: HttpClient) {}

  getSpaceXPrograms(
    launchYear?: number,
    launchSuccess?: boolean,
    landSuccess?: boolean,
    limit?: number,
  ) {
    this._http
      .get(
        `${this._baseUrl}?launch_year=${launchYear}&limit=${
          limit || this._defaultLimit
        }&launch_success=${launchSuccess || ''}&land_success=${landSuccess || ''}`,
      )
      .pipe(
        map((programs: SpacexProgram[]) => {
          return programs.map((program: SpacexProgram) => new SpacexProgram().deserialize(program));
        }),
      )
      .subscribe((programs: SpacexProgram[]) => {
        this._spacexPrograms.next(programs);
      });
  }

  get SpacexProgramsObservable() {
    return this._spacexPrograms.asObservable();
  }
}
