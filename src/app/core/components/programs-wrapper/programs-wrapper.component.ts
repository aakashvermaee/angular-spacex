import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import * as _ from 'lodash';

import { SpacexService } from 'src/app/shared/services/spacex.service';
import { environment } from 'src/environments/environment';
import { SpacexProgram } from 'src/app/shared/models/spacex-program.model';

@Component({
  selector: 'app-programs-wrapper',
  templateUrl: './programs-wrapper.component.html',
  styleUrls: ['./programs-wrapper.component.scss'],
})
export class ProgramsWrapperComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  private _currentYear: number;
  private _defaultLimit: number;

  spacexPrograms: Observable<SpacexProgram[]> = undefined;

  constructor(private _spacexService: SpacexService, private _router: Router, private _route: ActivatedRoute) {
    this._currentYear = new Date().getFullYear();
    this._defaultLimit = environment.limit;
    this._subscription = new Subscription();
    this.spacexPrograms = this._spacexService.SpacexProgramsObservable;
    this.registerListeners();
  }

  ngOnInit(): void {
    this._router.navigate([''], {
      queryParams: {
        launchYear: this._currentYear,
        launchSuccessful: '',
        landSuccessful: '',
        limit: this._defaultLimit,
      },
    });
  }

  private registerListeners() {
    this._subscription.add(
      this._route.queryParams.subscribe((params) => {
        this._spacexService.getSpaceXPrograms(
          _.get(params, 'launchYear', this._currentYear),
          _.get(params, 'launchSuccessful', ''),
          _.get(params, 'landSuccessful', ''),
          _.get(params, 'limit', this._defaultLimit),
        );
      }),
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
