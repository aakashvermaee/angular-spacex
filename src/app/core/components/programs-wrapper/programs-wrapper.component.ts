import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SpacexService } from 'src/app/shared/services/spacex.service';

@Component({
  selector: 'app-programs-wrapper',
  templateUrl: './programs-wrapper.component.html',
  styleUrls: ['./programs-wrapper.component.scss'],
})
export class ProgramsWrapperComponent implements OnInit {
  spacexPrograms = undefined;

  constructor(private _spacexService: SpacexService) {
    this.spacexPrograms = this._spacexService.SpacexProgramsObservable;
  }

  ngOnInit(): void {}
}
