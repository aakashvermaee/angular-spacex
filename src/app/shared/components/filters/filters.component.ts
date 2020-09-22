import { Component, OnInit } from '@angular/core';
import { SpacexService } from '../../services/spacex.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  years: number[] = [];
  limit: number = environment.limit;

  constructor(private _spacexService: SpacexService) {}

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
    this._spacexService.getSpaceXPrograms(launchYear, launchSuccess, landSuccess, this.limit);
  }
}
