import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  years: number[] = [];
  limit: number = environment.limit;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.generateYearRange();
  }

  private generateYearRange() {
    let endYear = new Date().getFullYear();
    let startYear = 2006;

    while (startYear <= endYear) {
      this.years.push(endYear--);
    }
    this.years.reverse();
  }

  getSpaceXPrograms(
    launchYear: number,
    launchSuccess?: boolean,
    landSuccess?: boolean,
    limit?: number,
  ) {
    this._router.navigate([''], {
      queryParams: {
        launchYear,
        launchSuccessful: launchSuccess || '',
        landSuccessful: landSuccess || '',
        limit: limit || this.limit,
      },
    });
  }
}
