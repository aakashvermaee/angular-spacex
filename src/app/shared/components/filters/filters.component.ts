import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import * as _ from 'lodash';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  private _subscription$: Subscription;

  years: number[];
  limit: number = environment.limit;
  launchYear: string;
  launchSuccess: string;
  landSuccess: string;

  updateLaunchYear$: Subject<string>;
  updateLaunchSuccess$: Subject<string>;
  updateLandSuccess$: Subject<string>;

  constructor(private _router: Router) {
    this.launchYear = this.getCurrentYear();
    this._subscription$ = new Subscription();
    this.updateLaunchYear$ = new Subject<string>();
    this.updateLaunchSuccess$ = new Subject<string>();
    this.updateLandSuccess$ = new Subject<string>();
    this.years = [];
  }

  ngOnInit(): void {
    this.generateYearRange();
    this.registerListeners();
  }

  private generateYearRange() {
    let currentYear = Number.parseInt(this.getCurrentYear());
    let startYear = 2006;

    while (startYear <= currentYear) {
      this.years.push(currentYear--);
    }
    this.years.reverse();
  }

  getSpaceXPrograms(launchYear?: string, launchSuccess?: string, landSuccess?: string, limit?: number) {
    this.launchYear = launchYear || this.launchYear;
    this.launchSuccess = launchSuccess || this.launchSuccess || '';
    this.landSuccess = landSuccess || this.landSuccess || '';
    this.limit = limit || this.limit;

    this._router.navigate([''], {
      queryParams: {
        launchYear: this.launchYear,
        launchSuccessful: this.launchSuccess,
        landSuccessful: this.landSuccess,
        limit: this.limit,
      },
    });
  }

  private registerListeners() {
    // launch year
    this._subscription$.add(
      this.updateLaunchYear$.pipe(debounceTime(600), distinctUntilChanged()).subscribe((value) => {
        if (value === '') {
          this.launchYear = new Date().getFullYear().toString();
        } else if (!this.years.includes(Number.parseInt(value))) {
          return;
        } else {
          this.launchYear = _.trim(value);
        }

        this.getSpaceXPrograms();
      }),
    );

    // launch success
    this._subscription$.add(
      this.updateLaunchSuccess$.pipe(debounceTime(600), distinctUntilChanged()).subscribe((value) => {
        if (!_.includes(['true', 'false', ''], value)) return;

        this.launchSuccess = _.trim(value);
        this.getSpaceXPrograms();
      }),
    );

    // land success
    this._subscription$.add(
      this.updateLandSuccess$.pipe(debounceTime(600), distinctUntilChanged()).subscribe((value) => {
        if (!_.includes(['true', 'false', ''], value)) return;

        this.landSuccess = _.trim(value);
        this.getSpaceXPrograms();
      }),
    );
  }

  onReset() {
    this.launchYear = this.getCurrentYear();
    this.landSuccess = '';
    this.launchSuccess = '';
    this.limit = environment.limit;

    this.getSpaceXPrograms();
  }

  onLimitChange($event: number) {
    this.limit = $event;
    this.getSpaceXPrograms();
  }

  private getCurrentYear() {
    return new Date().getFullYear().toString();
  }

  ngOnDestroy() {
    this._subscription$.unsubscribe();
  }
}
