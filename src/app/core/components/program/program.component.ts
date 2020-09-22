import { Component, Input, OnInit } from '@angular/core';
import { SpacexProgram } from 'src/app/shared/models/spacex-program.model';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {
  @Input('program')
  program: SpacexProgram;

  constructor() {}

  ngOnInit(): void {}
}
